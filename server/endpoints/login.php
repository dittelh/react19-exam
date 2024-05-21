<?php
include_once dirname(__DIR__) . '/cors.php';
include_once dirname(__DIR__) . '/database/databaseService.php'; 

$data = json_decode(file_get_contents("php://input"));
$email = $data->email;
$password = $data->password;
$user = getUser($email);
$verifiedPassword = checkPassword($password, $user);

if ($verifiedPassword) {
    echo json_encode([
        'code' => 200, 
        'message' => 'Success'
    ]);
} else {
    echo json_encode([
        'code' => 403,
        'message' => 'Fail'
    ]);
};

function getUser($email) {
    $databaseService = new DatabaseService();
    $connection = $databaseService->getConnection();

    $emailSQL = 'SELECT * FROM user 
    WHERE email = :email';

    $statement = $connection->prepare($emailSQL);
    $statement->bindParam(':email', $email);

    try {
        $statement->execute();
        return $statement->fetch(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        echo json_encode([
            'message' => $e->getMessage()
        ]);
    };
};

function checkPassword($password, $user) {
    return password_verify($password, $user['password']);
};