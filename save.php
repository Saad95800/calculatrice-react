<?php

if($_SERVER['HTTP_ORIGIN'] == "http://localhost:3000") {
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-type: application/json');
}

$servername = "localhost";
$username = "root";
$password = "";

if(isset($_GET['value'])){
    try{
        $bdd = new PDO("mysql:host=$servername;dbname=calculatrice", $username, $password);
        $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $req = $bdd->prepare('INSERT INTO result (value) VALUES (:value)');
        $req->bindValue(':value', $_GET['value'], PDO::PARAM_STR);
        $res = $req->execute();
        $result = 'error';
        $msg = 'L\'enregistrement a échoué';
        if($res){
            $result = 'Success';
            $msg = 'Valeur enregistrée avec succès';
        }
        echo json_encode(['result' => $result, 'message' => $msg]);
        die;
    }catch(PDOException $e){
        echo json_encode(['result' => 'error', 'message' => "Connection échouée: " . $e->getMessage()]);
        die;
    }
}else{
    echo json_encode(['result' => 'No value']);
    die;
}
