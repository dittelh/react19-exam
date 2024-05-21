<?php 
include_once dirname(__DIR__) . '/database/databaseService.php'; 

class ProductRepository {

    private DatabaseService $databaseService;

    function __construct() {
        $this->databaseService = new DatabaseService();
    }

    public function get() {
        
    }

    public function store(Product $product) {
        $connection = $this->databaseService->getConnection();

        $addProductSQL = 'INSERT INTO products (productName, imgPath, price, description, category, stock)
        VALUES(:productName, :imgPath, :price, :description, :category, :stock)';

        $name = $product->getName();
        $imgPath = $product->getImg();
        $price = (int)$product->getPrice();
        $description = $product->getDescription();
        $category = $product->getCategory();
        $stock = (int)$product->getStock();

        $statement = $connection->prepare($addProductSQL);
        $statement->bindParam(':productName', $name);
        $statement->bindParam(':imgPath', $imgPath);
        $statement->bindParam(':price', $price);
        $statement->bindParam(':description', $description);
        $statement->bindParam(':category', $category);
        $statement->bindParam(':stock', $stock);

        $statement->execute();
    }

    public function delete() {
        
    }
    
    public function update() {
        
    }
};