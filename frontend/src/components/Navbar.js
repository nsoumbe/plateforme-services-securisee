import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // SÉCURITÉ : Nettoyage de la session 
    localStorage.removeItem('accessToken');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f4f4f4' }}>
      <div>
        <Link shadow to="/services" style={{ marginRight: '15px' }}>Accueil Services</Link>
        
        {/* Affichage conditionnel selon le RÔLE (RBAC) [cite: 17, 46] */}
        {user?.role === 'fournisseur' && (
          <Link to="/create-service" style={{ marginRight: '15px' }}>Proposer un Service</Link>
        )}

        {user?.role === 'admin' && (
          <Link to="/admin" style={{ fontWeight: 'bold', color: 'red' }}>Tableau de Bord Admin</Link>
        )}
      </div>

      <div>
        {user ? (
          <>
            <span style={{ marginRight: '10px' }}>Bonjour, <strong>{user.username}</strong></span>
            <button onClick={handleLogout}>Déconnexion</button>
          </>
        ) : (
          <Link to="/login">Connexion</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;