import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
    // On récupère le rôle stocké lors du login
    const userRole = localStorage.getItem('userRole'); 

    // SÉCURITÉ : Si l'utilisateur n'est pas admin, on le redirige
    if (userRole !== 'admin') {
        return <Navigate to="/unauthorized" />;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>🛡️ Espace Administration Sécurisé</h2>
            <p>Bienvenue Josias. Ici, vous pouvez gérer les utilisateurs et les services.</p>
            {/* Lionel ajoutera ici les appels API vers ton backend */}
        </div>
    );
};

export default AdminDashboard;