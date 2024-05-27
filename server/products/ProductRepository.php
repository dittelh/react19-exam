<?php 
include_once dirname(__DIR__) . '/database/databaseService.php'; 

class ProductRepository {

    private DatabaseService $databaseService;

    function __construct() {
        $this->databaseService = new DatabaseService();
    }

    public function getAll() {
        $connection = $this->databaseService->getConnection();

        $getProducts = 'SELECT * FROM products';

        $statement = $connection->prepare($getProducts);

        $statement->execute();
        $rows = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $rows;
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

    public function deleteById($id) {
        $connection = $this->databaseService->getConnection();

        $deleteProductSQL = 
        'DELETE FROM products WHERE productID = :productID';

        $statement = $connection->prepare($deleteProductSQL);
        $statement->bindParam(':productID', $id);

        $statement->execute();
    }
    
    public function update() {
        
    }
};