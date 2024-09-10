<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DENEDIG</title>
    
    <link rel="stylesheet" href="./../assets/css/master.css">  <!-- Llamamos al archivo que tiene los estilos -->
    <link rel="stylesheet" href="../assets/css/bootstrap.min.css"> <!-- Integramos booststrap en nuestro proyecto para darle estilos a nuestras pantallas -->
</head>
<body>
    <!-- Imagen del encabezado centrada horizontalmente con un ancho del 20% del contenedor -->
    <img src="./../assets/resources/img/DENEDIG ico.png" style="display: block; margin: 0 auto; width: 20%; height: auto;"><br>

    <!-- Contenedor del formulario, que también incluye una imagen de fondo -->
    <div class="form-container">
        <!-- Imagen de fondo del formulario, que se ajusta al tamaño del contenedor y está detrás del contenido del formulario -->
        <img src="./../assets/resources/img/fonlogi.png" class="background-img" alt="Imagen de fondo">
        
        <!-- Contenedor para el formulario -->
        <div class="formulario">
            <!-- Formulario para inicio de sesión -->
            <form>
                <!-- Etiqueta para el campo de inicio de sesión -->
                <label for="sesion" class="form-label">Inicio de sesión</label>
                
                <!-- Campo de entrada para el correo electrónico -->
                <div class="mb-3">
                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Correo" aria-describedby="emailHelp">
                </div>
                
                <!-- Campo de entrada para la contraseña -->
                <div class="mb-3">
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Contraseña">
                </div>
                
                <!-- Enlace que actúa como botón para iniciar sesión, estilizado con Bootstrap -->
                <a href="./../page/inicio.php" class="btn btn-outline-light">Iniciar sesión</a>
            </form>
        </div>
    </div>
    
    <!-- Inclusión del pie de página común a todas las pantallas -->
    <?php include "./../includes/footer.php" ?>
</body>
</html>