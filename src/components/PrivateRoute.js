import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => { // Corregido el nombre de la propiedad
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Inicialmente debe ser false
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true); // Usuario autenticado
            } else {
                setIsAuthenticated(false); // Usuario no autenticado
                navigate('/login'); // Redirige al login si no hay usuario
            }
            setLoading(false); // Finaliza el estado de carga
        });

        return () => unsubscribe(); // Limpieza del listener cuando el componente se desmonta
    }, [navigate]);

    if (loading) {
        return <div>Cargando...</div>; // Muestra un mensaje de carga mientras espera la verificación
    }

    return isAuthenticated ? children : null; // Muestra los hijos si está autenticado
};

export default PrivateRoute;
