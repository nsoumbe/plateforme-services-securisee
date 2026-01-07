import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', marginTop: '100px', color: '#721c24' }}>
            <h1 style={{ fontSize: '3rem' }}>403 - Accès Refusé</h1>
            <div style={{ 
                backgroundColor: '#f8d7da', 
                border: '1px solid #f5c6cb', 
                padding: '20px', 
                borderRadius: '5px',
                display: 'inline-block' 
            }}>
                <p><strong>Erreur de sécurité :</strong> Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
                <p>Cette tentative a été enregistrée conformément à nos politiques de sécurité (SDLC sécurisé).</p>
            </div>
            <br />
            <button 
                onClick={() => navigate('/services')}
                style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
            >
                Retourner à l'accueil
            </button>
        </div>
    );
};

export default Unauthorized;