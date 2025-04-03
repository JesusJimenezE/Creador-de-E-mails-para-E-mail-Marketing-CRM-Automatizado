import React, { useState } from 'react';
import { db } from './../../components/firebaseconfig'; // Configuración de Firebase Firestore.
import { collection, addDoc } from 'firebase/firestore'; // Métodos necesarios para Firestore.
import { Cabe } from './../../components/Cabe'; // Importa el componente de cabecera.

export const Regispres = () => {
    // Definir estado inicial del formulario
    const valorInicial = {
        nombre: '',
        correo: '',
        horas: '',
        tipo: '',
        escuela: ''
    };

    const [user, setUser] = useState(valorInicial);

    // Capturar inputs del formulario
    const capturarInputs = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    // Función para guardar datos en Firestore
    const guardarDatos = async (e) => {
        e.preventDefault();

        try {
            await addDoc(collection(db, 'servicio'), user);
            alert('Datos guardados correctamente');
            setUser(valorInicial); // Limpiar el formulario después de guardar
        } catch (error) {
            console.error('Error al guardar datos:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Cabe /> {/* Muestra el componente de cabecera */}
            <div className="flex-grow bg-gray-100 py-10">
                <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Agregar Nuevo Integrante</h2>
                    <form onSubmit={guardarDatos} className="space-y-4">

                        {/* Campo para el nombre */}
                        <div>
                            <label htmlFor="nombre" className="block text-gray-700 font-medium mb-2">Nombre:</label>
                            <input
                                id="nombre" name="nombre" type="text"
                                className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                                onChange={capturarInputs} value={user.nombre} />
                        </div>

                        {/* Campo para el correo */}
                        <div>
                            <label htmlFor="correo" className="block text-gray-700 font-medium mb-2">Correo:</label>
                            <input
                                id="correo" name="correo" type="email"
                                className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                                onChange={capturarInputs} value={user.correo} />
                        </div>

                        {/* Agrupar horas y tipo en la misma línea */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="horas" className="block text-gray-700 font-medium mb-2">
                                    Horas totales:
                                </label>
                                <input
                                    id="horas" name="horas" type="number"
                                    className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                                    onChange={capturarInputs} value={user.horas} />
                            </div>

                            <div>
                                <label htmlFor="tipo" className="block text-gray-700 font-medium mb-2">Tipo de servicio:</label>
                                <select
                                    id="tipo" name="tipo"
                                    className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                                    onChange={capturarInputs}
                                    value={user.tipo}>
                                    <option value="">Seleccione una opción</option>
                                    <option value="Servicio social">Servicio social</option>
                                    <option value="Residencia profesional">Residencia profesional</option>
                                    <option value="Practicas profesionales">Prácticas profesionales</option>
                                </select>
                            </div>
                        </div>

                        {/* Campo para el número de escuela */}
                        <div>
                            <label htmlFor="escuela" className="block text-gray-700 font-medium mb-2">Escuela:</label>
                            <input
                                id="escuela" name="escuela" type="text"
                                className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                                onChange={capturarInputs} value={user.escuela} />
                        </div>

                        {/* Botones de acción */}
                        <div className="flex space-x-4">
                            <button type="submit"
                                className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition-colors duration-300">
                                Guardar
                            </button>

                            <button
                                type="button"
                                className="bg-red-600 text-white px-3 py-1 rounded-md font-bold hover:bg-red-700 transition"
                                onClick={() => setUser(valorInicial)}> Limpiar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default Regispres;
