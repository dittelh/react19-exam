<?php
include_once dirname(__DIR__) . '/cors.php';
include_once dirname(__DIR__) . '/products/Product.php';
include_once dirname(__DIR__) . '/products/ProductRepository.php';

$data = json_decode(file_get_contents("php://input"));
$id = $data->id;
$productRepo = new ProductRepository();

try {
    $productRepo->deleteById($id);
    echo json_encode([
        'code' => 200, 
        'message' => 'Success'
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'code' => 500, 
        'message' => $e->getMessage()
    ]);
};