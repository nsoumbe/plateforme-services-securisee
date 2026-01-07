import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import des composants et pages
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import ServiceList from './pages/ServiceList';
import AdminDashboard from './pages/AdminDashboard';
import Unauthorized from './pages/Unauthorized';

function App() {
  // État global de l'utilisateur (username et rôle)
  // Pour tester : change 'client' en 'admin' ou 'fournisseur' manuellement ici
  const [user, setUser] = useState(null); 

  // Simulation de récupération de session au chargement (SDLC sécurisé : Gestion de session)
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      // Ici, plus tard, on décodera le vrai token JWT envoyé par Josias
      // Pour l'instant, on simule un utilisateur connecté si un token existe
      setUser({ username: "Utilisateur Test", role: "client" });
    }
  }, []);

  return (
    <Router>
      {/* La Navbar reçoit l'utilisateur pour afficher les menus selon son rôle */}
      <Navbar user={user} setUser={setUser} />
      
      <div style={{ padding: '20px' }}>
        <Routes>
          {/* --- ROUTES PUBLIQUES --- */}
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* --- ROUTES PROTÉGÉES (RBAC) --- */}
          
          {/* Liste des services : Accessible à tous les connectés */}
          <Route 
            path="/services" 
            element={
              <ProtectedRoute user={user} allowedRoles={['client', 'fournisseur', 'admin']}>
                <ServiceList />
              </ProtectedRoute>
            } 
          />

          {/* Dashboard Admin : STRICTEMENT réservé à l'admin [cite: 21] */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute user={user} allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Redirection automatique vers les services si la page n'existe pas */}
          <Route path="*" element={<Navigate to="/services" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;