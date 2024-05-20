<?php
include_once dirname(__DIR__) . '/cors.php';
include_once dirname(__DIR__) . '/database/databaseService.php'; 

$data = json_decode(file_get_contents("php://input"));

echo json_encode([
    'status' => $data
]);