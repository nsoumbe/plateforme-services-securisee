import React, { useState } from 'react';
import api from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'client' // Par défaut
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // SÉCURITÉ : Validation locale avant envoi 
        if (formData.password.length < 10) {
            setError("Le mot de passe doit contenir au moins 10 caractères.");
            return;
        }

        try {
            // Envoi vers le backend de Josias [cite: 29]
            await api.post('/register/', formData);
            alert("Inscription réussie !");
            navigate('/login');
        } catch (err) {
            setError("Erreur lors de l'inscription. L'email est peut-être déjà utilisé.");
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto' }}>
            <h2>Créer un compte sécurisé</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nom d'utilisateur" onChange={(e) => setFormData({...formData, username: e.target.value})} required />
                <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                <input type="password" placeholder="Mot de passe" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                
                {/* Choix du rôle : Crucial pour le RBAC  */}
                <div style={{ margin: '10px 0' }}>
                    <label>Je souhaite être : </label>
                    <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
                        <option value="client">Client (Acheter des services)</option>
                        <option value="fournisseur">Fournisseur (Vendre des services)</option>
                    </select>
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
};

export default Register;