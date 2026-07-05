<?php
require __DIR__ . '/_helpers.php';
require_login();

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || empty($_FILES['file'])) {
    json_out(['error' => 'No file uploaded'], 400);
}

$file = $_FILES['file'];
if ($file['error'] !== UPLOAD_ERR_OK) {
    json_out(['error' => 'Upload failed'], 400);
}

$maxBytes = 8 * 1024 * 1024;
if ($file['size'] > $maxBytes) {
    json_out(['error' => 'File too large (max 8MB)'], 400);
}

$allowed = [
    'image/png' => 'png',
    'image/jpeg' => 'jpg',
    'image/webp' => 'webp',
    'image/gif' => 'gif',
];

$mime = mime_content_type($file['tmp_name']);
if (!isset($allowed[$mime])) {
    json_out(['error' => 'Only PNG, JPEG, WEBP or GIF images are allowed'], 400);
}

$ext = $allowed[$mime];
$name = bin2hex(random_bytes(12)) . '.' . $ext;
$dest = __DIR__ . '/uploads/' . $name;

if (!move_uploaded_file($file['tmp_name'], $dest)) {
    json_out(['error' => 'Could not save file'], 500);
}

json_out(['url' => '/portfolio/api/uploads/' . $name]);
