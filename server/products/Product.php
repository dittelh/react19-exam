<?php 

class Product {
    private $name;
    private $img;
    private $price;
    private $description;
    private $category;
    private $stock;

    function __construct($newName, $newImg, $newPrice, $newDescription, $newCategory, $newStock) {
        $this->name = $newName;
        $this->img = $newImg;
        $this->price = $newPrice;
        $this->description = $newDescription;
        $this->category = $newCategory;
        $this->stock = $newStock;
    }

    public function getName() {
        return $this->name;
    }

    public function getImg() {
        return $this->img;
    } 

    public function getPrice() {
        return $this->price;
    } 

    public function getDescription() {
        return $this->description;
    } 

    public function getCategory() {
        return $this->category;
    } 

    public function getStock() {
        return $this->stock;
    }
};