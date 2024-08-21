<?php
session_start();
require 'config.php'; // Archivo que contiene la configuración de la conexión a la base de datos

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Consulta para verificar si el correo existe y obtener la contraseña
    $query = $pdo->prepare("SELECT id, password FROM users WHERE email = ?");
    $query->execute([$email]);
    $user = $query->fetch();

    if ($user && password_verify($password, $user['password'])) {
        // Inicio de sesión exitoso
        $_SESSION['user_id'] = $user['id'];
        header("Location: dashboard.php"); // Redirigir a una página de destino
        exit();
    } else {
        if ($user) {
            $error = "Contraseña incorrecta. <a href='reset_password.php'>Restablecer contraseña</a>";
        } else {
            $error = "El correo electrónico no está registrado.";
        }
    }
}
?>
