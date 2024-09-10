<?php include "./../includes/encabezado.php" ?> <!-- Llamamos al encabezado de pagina que estara en todas las pantalla -->

<div class="formulario-connue">
  <form class="row g-3">
     
    <div class="col-md-12">
      <label for="nombre" class="form-label">Nombre:</label>
      <input type="text" class="form-control" id="nombre">
    </div>
    
    <div class="col-md-12">
      <label for="edad" class="form-label">Edad:</label>
      <input type="number" class="form-control" id="edad">
    </div>

  
    <div class="col-md-6">
      <label for="genero" class="form-label">Género:</label>
      <select id="genero" class="form-select">
        <option>Femenino</option>
        <option>Masculino</option>
        <option>Otros</option>
      </select>
    </div>

    <div class="col-md-6">
      <label for="numero" class="form-label">Número:</label>
      <input type="tel" class="form-control" id="numero">
    </div>

   
    <div class="col-md-12">
      <label for="correo" class="form-label">Correo:</label>
      <input type="email" class="form-control" id="correo">
    </div>

    <div class="col-md-12">
      <label for="direccion" class="form-label">Dirección:</label>
      <input type="text" class="form-control" id="direccion">
    </div>


    <div class="col-12">
      <button type="submit" class="btn btn-primary">Agregar</button>
    </div>
  </form>
</div>

<?php include "./../includes/piepagina.php" ?><!-- Llamamos al piede pagina que estara en todas las pantalla -->