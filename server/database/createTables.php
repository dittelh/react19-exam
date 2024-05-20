<?php

include_once './databaseService.php';

createUserTable();
createProductTable();
createAdmin();

function createUserTable(){
    $databaseService = new DatabaseService();
    $connection = $databaseService->getConnection();

    $sql = 'CREATE TABLE IF NOT EXISTS user (
        userID INT AUTO_INCREMENT PRIMARY KEY, 
        email VARCHAR(50) NOT NULL, 
        password VARCHAR(255) NOT NULL)';

    try {
        $connection->exec($sql);
    } catch (PDOException $e) {
        echo $e->getMessage();
    }
};

function createProductTable(){
    $databaseService = new DatabaseService();
    $connection = $databaseService->getConnection();

    $sql = 'CREATE TABLE IF NOT EXISTS products (
        productID INT AUTO_INCREMENT PRIMARY KEY, 
        productName VARCHAR(50) NOT NULL,
        imgPath VARCHAR(255) NOT NULL, 
        price INT(8) NOT NULL, 
        description VARCHAR(150) NOT NULL,
        category VARCHAR(255) NOT NULL,
        stock INT(8) NOT NULL)';

    try {
        $connection->exec($sql);
    } catch (PDOException $e) {
        echo $e->getMessage();
    }
};


// Hvis det er helt rigtig, så må den her funktion ikke komme ud i prod
function createAdmin(){
    $databaseService = new DatabaseService();
    $connection = $databaseService->getConnection();

    $sql = "INSERT INTO user (userID, email, password) 
    VALUES(:userID, :email, :password)";

    $password = password_hash('admin', PASSWORD_BCRYPT);

    $userId = 1;
    $email = 'admin@admin.dk';
    $role = 'admin';

    $statement = $connection->prepare($sql);
    $statement->bindParam(':userID', $userId);
    $statement->bindParam(':email', $email);
    $statement->bindParam(':password', $password);

    try {
        $statement->execute();
    } catch (PDOException $e) {
        echo $e->getMessage();
    }
};