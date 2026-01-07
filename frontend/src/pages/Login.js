import React, { useState } from 'react';
import api from '../api/axiosConfig'; // Ton instance Axios sécurisée
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // --- SÉCURITÉ : Validation côté client (Anti-Injection) ---
        if (!email.includes('@')) {
            setError("Format d'email invalide.");
            return;
        }
        if (password.length < 8) {
            setError("Le mot de passe doit faire au moins 8 caractères.");
            return;
        }

        try {
            // Appel au backend de Josias
            const response = await api.post('/login/', { email, password });
            
            // --- SÉCURITÉ : Gestion du Token ---
            const { access, role } = response.data;
            localStorage.setItem('accessToken', access); // On stocke le JWT
            
            // Redirection selon le rôle (RBAC)
            if (role === 'admin') navigate('/admin');
            else navigate('/services');
            
        } catch (err) {
            // --- SÉCURITÉ : Message d'erreur générique ---
            // On ne dit pas si c'est le mail ou le mdp qui est faux pour éviter l'énumération de comptes
            setError("Identifiants incorrects ou serveur indisponible.");
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
            <h2>Connexion Sécurisée</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input 
                        type="password" 
                        placeholder="Mot de passe" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
                <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                    Se connecter
                </button>
            </form>
        </div>
    );
};

export default Login;