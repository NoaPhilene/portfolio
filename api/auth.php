<?php
require __DIR__ . '/_helpers.php';
require __DIR__ . '/config.php';

$action = $_GET['action'] ?? '';

if ($action === 'me') {
    json_out(['loggedIn' => is_logged_in()]);
}

if ($action === 'login' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = read_json_body();
    $username = trim($body['username'] ?? '');
    $password = (string) ($body['password'] ?? '');

    $stmt = $pdo->prepare('SELECT id, password_hash FROM admin_user WHERE username = ? LIMIT 1');
    $stmt->execute([$username]);
    $row = $stmt->fetch();

    if (!$row || !password_verify($password, $row['password_hash'])) {
        json_out(['error' => 'Onjuiste inloggegevens'], 401);
    }

    session_regenerate_id(true);
    $_SESSION['admin'] = true;
    $_SESSION['admin_id'] = $row['id'];
    json_out(['loggedIn' => true]);
}

if ($action === 'logout' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $_SESSION = [];
    session_destroy();
    json_out(['loggedIn' => false]);
}

json_out(['error' => 'Unknown action'], 404);
