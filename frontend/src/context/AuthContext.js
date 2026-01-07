import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Au chargement, on vérifie si un token existe déjà (Persistance de session)
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                // On vérifie si le token n'est pas expiré
                if (decoded.exp * 1000 > Date.now()) {
                    setUser({
                        username: decoded.username,
                        role: decoded.role // Récupéré du backend de Josias
                    });
                } else {
                    localStorage.removeItem('accessToken');
                }
            } catch (error) {
                console.error("Token invalide");
            }
        }
        setLoading(false);
    }, []);

    const login = (token) => {
        localStorage.setItem('accessToken', token);
        const decoded = jwtDecode(token);
        setUser({
            username: decoded.username,
            role: decoded.role
        });
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};