<?php

class DatabaseService {
    private $connection = null; 
    private $config; 

    public function __construct(){
        $this->config = parse_ini_file('config.ini');
    }

    public function getConnection(){
        $db_host = $this->config['db_host'];
        $db_name = $this->config['db_name'];
        $db_user = $this->config['db_user'];
        $db_password = $this->config['db_password'];

        try {
            $this->connection = new PDO('mysql:host=' . $db_host . ';dbname=' . $db_name, $db_user, $db_password);
        } catch (PDOException $e) {
            echo $e->getMessage();
        }

        return $this->connection;
    }
}