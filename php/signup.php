<?php
$mail = $_POST['mail'];
$pass = $_POST['password'];
$enlace = mysqli_connect("127.0.0.1", "root", "Sombrer0", "techskingdom");
$consulta = "insert into cuentas values('$mail', '$pass')";
$resultado = mysqli_query($enlace, $consulta);

if ($resultado) {
    echo "Datos agregados";
} else {
    echo "Hubo un error";
}

mysqli_close($enlace);
