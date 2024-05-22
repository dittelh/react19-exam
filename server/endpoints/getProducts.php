<?php
include_once dirname(__DIR__) . '/cors.php';
include_once dirname(__DIR__) . '/products/Product.php';
include_once dirname(__DIR__) . '/products/ProductRepository.php';

$productRepo = new ProductRepository();

try {
    $products = $productRepo->getAll();
    echo json_encode([
        'code' => 200, 
        'message' => 'Success',
        'products' => $products
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'code' => 500, 
        'message' => $e->getMessage()
    ]);
};