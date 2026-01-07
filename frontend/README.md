🛡️ Plateforme Frontend - Économie du Partage (Sécurisée)
Ce dossier contient la partie Frontend de notre plateforme de services entre particuliers, développée avec React. L'objectif principal est l'application des principes du SDLC sécurisé.


🚀 Installation et Lancement
cd frontend

npm install

npm start (L'application tourne sur http://localhost:3000)

🔐 Architecture de Sécurité (Lionel)
Pour répondre aux exigences du projet, les contrôles suivants ont été mis en œuvre:

1. Contrôle d'accès (RBAC)

Système multi-rôle : Gestion des rôles Client, Fournisseur et Administrateur.



Protected Routes : Utilisation de composants React pour interdire l'accès aux pages sensibles selon le rôle de l'utilisateur.



Page 403 : Une page Unauthorized.js redirige les tentatives d'élévation de privilèges (Menace STRIDE : Elevation of Privilege).


2. Gestion de l'Authentification (JWT)

Context API : Utilisation de AuthContext.js pour centraliser l'état de l'utilisateur et sécuriser la session.


Persistance sécurisée : Décodage et validation des jetons JWT avec jwt-decode.

3. Protection contre les Injections

Validation d'entrée : Les formulaires de Connexion et d'Inscription vérifient les formats de données côté client avant l'envoi au backend.



Échappement des sorties : Utilisation des mécanismes natifs de React pour prévenir les attaques XSS.

4. Communication Backend

Intercepteurs Axios : Configuration automatique du header Authorization: Bearer <token> pour toutes les requêtes API vers le serveur Django.

📁 Structure des dossiers
/src/context/ : Coffre-fort de la session utilisateur.

/src/components/ : Composants réutilisables (Navbar dynamique, Routes protégées).

/src/pages/ : Vues métiers (Services, Login, Admin Dashboard).

/src/api/ : Configuration de la communication sécurisée.
