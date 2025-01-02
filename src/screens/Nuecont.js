import React, { useState } from 'react';
import { Cabe } from '../components/Cabe'; // Componente de cabecera.
import { Piep } from '../components/Piep'; // Componente de pie de página.
import { Button, Input, Label, Form, FormGroup } from 'reactstrap'; // Componentes de Reactstrap.
import { db } from '../components/firebaseconfig'; // Configuración de Firebase Firestore.
import { collection, addDoc } from 'firebase/firestore'; // Métodos necesarios para Firestore.

export const Nuecont = () => {
  // Valores iniciales del formulario.
  const valorInicial = {
    nombre: '',
    edad: '',
    genero: '',
    correo: '',
    numero: '',
    ocupacion: ''
  };

  // Estado para manejar los valores del formulario.
  const [user, setUser] = useState(valorInicial);

  // Capturar valores de los inputs del formulario.
  const capturarInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Función para guardar los datos en Firestore.
  const guardarDatos = async (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario.
    const datosConvertidos = {
      ...user,
      edad: parseInt(user.edad, 10), // Convierte edad a número entero.
      numero: parseInt(user.numero, 10) // Convierte número a número entero.
    };

    try {
      await addDoc(collection(db, 'contactos'), datosConvertidos); // Agrega el contacto a Firestore.
      alert("Contacto agregado exitosamente");
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }

    // Resetea el formulario.
    setUser({ ...valorInicial });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Cabe /> {/* Componente de cabecera */}

      <div className="flex-grow bg-gray-100 py-10">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Agregar Nuevo Contacto</h2>
          <Form onSubmit={guardarDatos} className="space-y-4">
            {/* Campo para el nombre */}
            <FormGroup>
              <Label for="nombrec" className="text-gray-700 font-medium">Nombre:</Label>
              <Input
                id="nombrec"
                name="nombre"
                type="text"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                onChange={capturarInputs}
                value={user.nombre}
              />
            </FormGroup>

            {/* Agrupar edad y género en la misma línea */}
            <div className="grid grid-cols-2 gap-4">
              {/* Campo para la edad */}
              <FormGroup>
                <Label for="edad" className="text-gray-700 font-medium">Edad:</Label>
                <Input
                  id="edad" name="edad" type="number" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" onChange={capturarInputs} value={user.edad} />
              </FormGroup>

              {/* Campo para el género */}
              <FormGroup>
                <Label for="genero" className="text-gray-700 font-medium">Género:</Label>
                <Input
                  id="genero" name="genero" type="select" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" onChange={capturarInputs} value={user.genero} >

                  <option value="">Seleccione una opción</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otros">Otros</option>
                </Input>
              </FormGroup>
            </div>

            {/* Campo para el correo */}
            <FormGroup>
              <Label for="correoc" className="text-gray-700 font-medium">Correo:</Label>
              <Input
                id="correoc"
                name="correo"
                type="email"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                onChange={capturarInputs}
                value={user.correo}
              />
            </FormGroup>

            {/* Campo para el número telefónico */}
            <FormGroup>
              <Label for="numeroc" className="text-gray-700 font-medium">Número telefónico:</Label>
              <Input
                id="numeroc" name="numero" type="number" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" onChange={capturarInputs} value={user.numero} />
            </FormGroup>

            {/* Campo para la ocupación */}
            <FormGroup>
              <Label for="ocupacion" className="text-gray-700 font-medium">Ocupación:</Label>
              <Input id="ocupacion" name="ocupacion" type="text" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" onChange={capturarInputs} value={user.ocupacion} />
            </FormGroup>

            {/* Botones de acción */}
            <div className="flex space-x-4">
              <Button type="submit" className="!bg-blue-500 !text-white !py-2 !px-6 !rounded-md hover:!bg-blue-600 focus:!outline-none focus:!bg-blue-600 transition-colors duration-300">
                Guardar
              </Button>
              <Button type="button" className="!bg-red-600 !text-white !px-3 !py-1 !rounded-md font-bold hover:!bg-red-700 transition" onClick={() => setUser({ ...valorInicial })}>
                Limpiar
              </Button>
            </div>
          </Form>
        </div>
      </div>

      <Piep /> {/* Componente de pie de página */}
    </div>
  );
};

export default Nuecont;
