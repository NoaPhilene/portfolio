<?php
// Shared bits for every endpoint: JSON response headers, one session per
// request, and a single place that defines what "logged in" means.
header('Content-Type: application/json; charset=utf-8');

if (session_status() === PHP_SESSION_NONE) {
    session_set_cookie_params([
        'path'     => '/',
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    session_start();
}

function json_out($data, int $status = 200): void {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function is_logged_in(): bool {
    return !empty($_SESSION['admin']);
}

function require_login(): void {
    if (!is_logged_in()) {
        json_out(['error' => 'Not logged in'], 401);
    }
}

function read_json_body(): array {
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') return [];
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}
