<?php
require __DIR__ . '/_helpers.php';
require __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $rows = $pdo->query('SELECT key_name, url FROM site_images')->fetchAll();
    $out = [];
    foreach ($rows as $r) $out[$r['key_name']] = $r['url'];
    json_out($out);
}

if ($method === 'POST') {
    require_login();
    $body = read_json_body();
    $key = trim($body['key'] ?? '');
    $url = $body['url'] ?? null;
    if ($key === '') json_out(['error' => 'Missing key'], 400);

    $stmt = $pdo->prepare(
        'INSERT INTO site_images (key_name, url) VALUES (?, ?)
         ON DUPLICATE KEY UPDATE url = VALUES(url)'
    );
    $stmt->execute([$key, $url]);
    json_out(['ok' => true]);
}

json_out(['error' => 'Method not allowed'], 405);
