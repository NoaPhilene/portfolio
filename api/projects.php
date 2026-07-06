<?php
require __DIR__ . '/_helpers.php';
require __DIR__ . '/config.php';

function slugify(string $name): string {
    $slug = strtolower(trim($name));
    $slug = preg_replace('/[^a-z0-9]+/', '-', $slug);
    $slug = trim($slug, '-');
    return $slug !== '' ? $slug : 'project';
}

function unique_slug(PDO $pdo, string $base, ?int $excludeId = null): string {
    $slug = $base;
    $n = 2;
    while (true) {
        $stmt = $pdo->prepare('SELECT id FROM projects WHERE slug = ?' . ($excludeId ? ' AND id != ?' : ''));
        $params = $excludeId ? [$slug, $excludeId] : [$slug];
        $stmt->execute($params);
        if (!$stmt->fetch()) return $slug;
        $slug = $base . '-' . $n;
        $n++;
    }
}

function fetch_projects(PDO $pdo, ?int $onlyId = null): array {
    $sql = 'SELECT * FROM projects' . ($onlyId ? ' WHERE id = ?' : '') . ' ORDER BY sort_order ASC, id ASC';
    $stmt = $pdo->prepare($sql);
    $stmt->execute($onlyId ? [$onlyId] : []);
    $rows = $stmt->fetchAll();

    $imgStmt = $pdo->prepare('SELECT url FROM project_images WHERE project_id = ? ORDER BY sort_order ASC, id ASC');

    $out = [];
    foreach ($rows as $r) {
        $imgStmt->execute([$r['id']]);
        $images = array_column($imgStmt->fetchAll(), 'url');
        $out[] = [
            'id' => (int) $r['id'],
            'slug' => $r['slug'],
            'name' => $r['name'],
            'year' => $r['year'],
            'url' => $r['url'],
            'cat' => ['en' => $r['cat_en'], 'nl' => $r['cat_nl']],
            'role' => ['en' => $r['role_en'], 'nl' => $r['role_nl']],
            'desc' => ['en' => $r['desc_en'], 'nl' => $r['desc_nl']],
            'tags' => json_decode($r['tags'], true) ?: [],
            'images' => $images,
        ];
    }
    return $out;
}

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';
$id = isset($_GET['id']) ? (int) $_GET['id'] : null;

if ($method === 'GET') {
    json_out(fetch_projects($pdo));
}

if ($action === 'addImage' && $method === 'POST') {
    require_login();
    if (!$id) json_out(['error' => 'Missing id'], 400);
    $body = read_json_body();
    $url = trim($body['url'] ?? '');
    if ($url === '') json_out(['error' => 'Missing url'], 400);

    $next = $pdo->prepare('SELECT COALESCE(MAX(sort_order), -1) + 1 AS n FROM project_images WHERE project_id = ?');
    $next->execute([$id]);
    $sortOrder = (int) $next->fetch()['n'];

    $pdo->prepare('INSERT INTO project_images (project_id, url, sort_order) VALUES (?, ?, ?)')
        ->execute([$id, $url, $sortOrder]);
    $projects = fetch_projects($pdo, $id);
    if (!$projects) json_out(['error' => 'Not found'], 404);
    json_out($projects[0]);
}

if ($action === 'removeImage' && $method === 'POST') {
    require_login();
    if (!$id) json_out(['error' => 'Missing id'], 400);
    $body = read_json_body();
    $url = trim($body['url'] ?? '');
    $pdo->prepare('DELETE FROM project_images WHERE project_id = ? AND url = ?')->execute([$id, $url]);
    $projects = fetch_projects($pdo, $id);
    if (!$projects) json_out(['error' => 'Not found'], 404);
    json_out($projects[0]);
}

if ($action === 'reorder' && $method === 'POST') {
    require_login();
    $body = read_json_body();
    $ids = $body['ids'] ?? [];
    if (!is_array($ids) || !$ids) json_out(['error' => 'Missing ids'], 400);

    $stmt = $pdo->prepare('UPDATE projects SET sort_order = ? WHERE id = ?');
    foreach (array_values($ids) as $index => $pid) {
        $stmt->execute([$index, (int) $pid]);
    }
    json_out(fetch_projects($pdo));
}

if ($method === 'POST' && $action === '') {
    require_login();
    $body = read_json_body();
    $name = trim($body['name'] ?? 'New project');
    $slug = unique_slug($pdo, slugify($name));

    $next = $pdo->query('SELECT COALESCE(MAX(sort_order), -1) + 1 AS n FROM projects')->fetch();
    $sortOrder = (int) $next['n'];

    $stmt = $pdo->prepare(
        'INSERT INTO projects (slug, name, year, url, cat_en, cat_nl, role_en, role_nl, desc_en, desc_nl, tags, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute([
        $slug,
        $name,
        $body['year'] ?? '',
        $body['url'] ?? '',
        $body['cat']['en'] ?? '',
        $body['cat']['nl'] ?? '',
        $body['role']['en'] ?? '',
        $body['role']['nl'] ?? '',
        $body['desc']['en'] ?? '',
        $body['desc']['nl'] ?? '',
        json_encode($body['tags'] ?? [], JSON_UNESCAPED_UNICODE),
        $sortOrder,
    ]);
    $newId = (int) $pdo->lastInsertId();
    json_out(fetch_projects($pdo, $newId)[0]);
}

if ($method === 'PUT') {
    require_login();
    if (!$id) json_out(['error' => 'Missing id'], 400);
    $body = read_json_body();

    $fields = [];
    $params = [];
    $map = [
        'name' => $body['name'] ?? null,
        'year' => $body['year'] ?? null,
        'url' => $body['url'] ?? null,
        'cat_en' => $body['cat']['en'] ?? null,
        'cat_nl' => $body['cat']['nl'] ?? null,
        'role_en' => $body['role']['en'] ?? null,
        'role_nl' => $body['role']['nl'] ?? null,
        'desc_en' => $body['desc']['en'] ?? null,
        'desc_nl' => $body['desc']['nl'] ?? null,
    ];
    foreach ($map as $col => $val) {
        if ($val !== null) { $fields[] = "$col = ?"; $params[] = $val; }
    }
    if (isset($body['tags'])) { $fields[] = 'tags = ?'; $params[] = json_encode($body['tags'], JSON_UNESCAPED_UNICODE); }
    if (isset($body['name'])) {
        $fields[] = 'slug = ?';
        $params[] = unique_slug($pdo, slugify($body['name']), $id);
    }

    if (!empty($fields)) {
        $params[] = $id;
        $pdo->prepare('UPDATE projects SET ' . implode(', ', $fields) . ' WHERE id = ?')->execute($params);
    }
    $projects = fetch_projects($pdo, $id);
    if (!$projects) json_out(['error' => 'Not found'], 404);
    json_out($projects[0]);
}

if ($method === 'DELETE') {
    require_login();
    if (!$id) json_out(['error' => 'Missing id'], 400);
    $pdo->prepare('DELETE FROM projects WHERE id = ?')->execute([$id]);
    json_out(['ok' => true]);
}

json_out(['error' => 'Method not allowed'], 405);
