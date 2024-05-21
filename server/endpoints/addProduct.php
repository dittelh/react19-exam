<?php
include_once dirname(__DIR__) . '/cors.php';
include_once dirname(__DIR__) . '/products/Product.php';
include_once dirname(__DIR__) . '/products/ProductRepository.php';

$data = json_decode(file_get_contents("php://input"));
$product = new Product($data->name, $data->imgPath, $data->price, $data->description, $data->category, $data->stock);
$productRepo = new ProductRepository();


try {
    $productRepo->store($product);
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