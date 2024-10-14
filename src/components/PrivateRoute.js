import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Importa Firebase Authentication
import { useNavigate } from 'react-router-dom'; // Hook para redireccionamiento en React Router

const PrivateRoute = ({ children }) => {
    const [loading, setLoading] = useState(true); // Estado para gestionar el proceso de carga
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para verificar si el usuario está autenticado
    const navigate = useNavigate(); // Hook para la navegación entre rutas

    // Efecto para comprobar el estado de autenticación del usuario
    useEffect(() => {
        const auth = getAuth(); // Obtiene la instancia de autenticación de Firebase
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Si el usuario está autenticado
                setIsAuthenticated(true);
            } else {
                // Si no hay usuario autenticado, redirige a la página de login
                setIsAuthenticated(false);
                navigate('/login');
            }
            // Una vez que se verifica la autenticación, detiene el estado de carga
            setLoading(false);
        });

        // Cleanup: Elimina el listener cuando el componente se desmonta
        return () => unsubscribe();
    }, [navigate]);

    // Muestra un mensaje mientras se verifica el estado de autenticación
    if (loading) {
        return <div>Cargando...</div>;
    }

    // Si el usuario está autenticado, renderiza los hijos del componente (contenido privado)
    // Si no está autenticado, no renderiza nada
    return isAuthenticated ? children : null;
};

export default PrivateRoute;
