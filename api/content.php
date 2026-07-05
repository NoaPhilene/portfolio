<?php
require __DIR__ . '/_helpers.php';
require __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $rows = $pdo->query('SELECT key_name, lang, value FROM content')->fetchAll();

    $out = ['en' => [], 'nl' => [], 'shared' => []];
    $arrayBuckets = []; // "en.titles" => [0=>val, 2=>val, ...], "en.steps.0" => ['t'=>..,'d'=>..]

    foreach ($rows as $row) {
        $lang = $row['lang'] === '' ? 'shared' : $row['lang'];
        $key = $row['key_name'];
        $value = $row['value'];
        $parts = explode('.', $key);

        if (count($parts) === 1) {
            $out[$lang][$key] = $value;
        } elseif (count($parts) === 2) {
            // e.g. titles.0, specialties handled separately (whole-JSON keys have no dots)
            [$base, $idx] = $parts;
            $arrayBuckets[$lang][$base][(int) $idx] = $value;
        } elseif (count($parts) === 3) {
            // steps.0.t / steps.0.d
            [$base, $idx, $field] = $parts;
            $arrayBuckets[$lang][$base][(int) $idx][$field] = $value;
        }
    }

    foreach ($arrayBuckets as $lang => $bases) {
        foreach ($bases as $base => $indexed) {
            ksort($indexed);
            $out[$lang][$base] = array_values($indexed);
        }
    }

    // shared JSON-list values decode to real arrays for the frontend
    foreach (['specialties', 'specialtiesCompact', 'skillCircles'] as $listKey) {
        if (isset($out['shared'][$listKey])) {
            $decoded = json_decode($out['shared'][$listKey], true);
            $out['shared'][$listKey] = is_array($decoded) ? $decoded : [];
        }
    }

    json_out($out);
}

if ($method === 'PUT' || $method === 'POST') {
    require_login();
    $body = read_json_body();
    $key = trim($body['key'] ?? '');
    $lang = $body['lang'] ?? '';
    $value = $body['value'] ?? '';

    if ($key === '' || !in_array($lang, ['en', 'nl', ''], true)) {
        json_out(['error' => 'Invalid key/lang'], 400);
    }
    if (is_array($value)) {
        $value = json_encode($value, JSON_UNESCAPED_UNICODE);
    }

    $stmt = $pdo->prepare(
        'INSERT INTO content (key_name, lang, value) VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE value = VALUES(value)'
    );
    $stmt->execute([$key, $lang, (string) $value]);
    json_out(['ok' => true]);
}

json_out(['error' => 'Method not allowed'], 405);
