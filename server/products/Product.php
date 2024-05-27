<?php 

class Product {
    private $id;
    private $name;
    private $img;
    private $price;
    private $description;
    private $category;
    private $stock;

    function __construct($newName, $newImg, $newPrice, $newDescription, $newCategory, $newStock, $newId=null) {
        $this->name = $newName;
        $this->img = $newImg;
        $this->price = $newPrice;
        $this->description = $newDescription;
        $this->category = $newCategory;
        $this->stock = $newStock;
        $this->id = $newId;
    }

    public function getId() {
        return $this->id;
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