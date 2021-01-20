<?php
$errorMSG = "";


// NOMBRE Y APELLIDO
if (empty($_POST["first_name"])) {
    $errorMSG .= utf8_decode("Complete este campo");
} else {
    $first_name = $_POST["first_name"];
}

// EMAIL
if (empty($_POST["email"])) {
    $errorMSG .= utf8_decode("Complete este campo");
} else {
    $email = $_POST["email"];
}

// TELEFONO O CEL
if (empty($_POST["telephone"])) {
    $errorMSG .= utf8_decode("Complete este campo");
} else {
    $telephone = $_POST["telephone"];
}

// MENSAJE
if (empty($_POST["mensaje"])) {
    $errorMSG .= utf8_decode("Complete este campo");
} else {
    $mensaje = $_POST["mensaje"];
}

/****************************** ENVIAR EMAIL ******************************/
//CONTACTOS Y ASUNTO
$Contacts = array('anderson.forero344@gmail.com');
$Subject = utf8_decode("Nuevo Lead: Formulario Portafolio GitHub");


// CUERPO DE TEXTO MENSAJE
$Body = "";

$Body .= utf8_decode("Nombre y Apellido: ");
$Body .= utf8_decode($first_name);
$Body .= "\n";

$Body .= utf8_decode("Correo eletrónico: ");
$Body .= utf8_decode($email);
$Body .= "\n";

$Body .= utf8_decode("Teléfono o Celular: ");
$Body .= utf8_decode($telephone);
$Body .= "\n";

$Body .= utf8_decode("Mensaje: ");
$Body .= utf8_decode($mensaje);
$Body .= "\n";



// send email
foreach ($Contacts as $Contact){
    $to =  $Contact;
    $success = mail($to, $Subject, $Body, "From:".$email);
}

// redirect to success page
if ($success && $errorMSG == ""){
    echo "success";
}
else{
    if($errorMSG == ""){
        echo "Algo salío mal :(";
    }
    else {
        echo $errorMSG;
    }
}

?>
