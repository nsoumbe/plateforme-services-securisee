import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  // Pendant que le système vérifie le token JWT
  if (loading) return <div>Chargement sécurisé...</div>;

  // 1. Si pas d'utilisateur connecté -> Direction Login 
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Si le rôle n'est pas autorisé -> Direction page "Accès Refusé" 
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;