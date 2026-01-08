Plateforme de Services Sécurisée (Backend & Frontend)
Ce projet est une application web full-stack permettant la mise en relation entre Clients et Fournisseurs de services, avec une sécurité renforcée (JWT & RBAC).

🛠️ Architecture du Projet
Backend : Django REST Framework (Python)

Frontend : React.js

Base de données : SQLite (Fichier db.sqlite3)

Déploiement : Docker (en cours)

🏗️ Installation et Lancement (Local)
1. Backend (Josias)
Le backend gère l'authentification, les rôles et la logique métier.

Installer les dépendances :

Bash

pip install django djangorestframework django-cors-headers djangorestframework-simplejwt
Appliquer les migrations (Base de données) :

Bash

python manage.py migrate
Lancer le serveur :

Bash

python manage.py runserver
Le serveur sera disponible sur : http://127.0.0.1:8000

2. Frontend (Lionel)
L'interface utilisateur communique avec l'API Django.

Aller dans le dossier frontend : cd frontend

Installer Node.js et les modules :

Bash

npm install
npm install jwt-decode  # Nécessaire pour l'authentification
Lancer React :

Bash

npm start
L'interface sera disponible sur : http://localhost:3000

🔐 Sécurité & API
Authentification
Le projet utilise des JSON Web Tokens (JWT).

Login : Envoyez un POST sur /api/token/ pour recevoir vos accès.

Headers : Ajoutez Authorization: Bearer <votre_token> pour les requêtes protégées.

Rôles Utilisateurs
Admin : Accès total via /admin/.

Provider (Fournisseur) : Peut créer et gérer ses services.

Client : Peut consulter et commander des services.
