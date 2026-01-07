# Architecture de la plateforme de services sécurisée

## 1. Présentation générale

Ce projet consiste à développer une application web sécurisée composée d’un frontend, d’un backend et d’une base de données.  
L’objectif principal est d’intégrer la sécurité dès la conception de l’architecture, en appliquant les principes de séparation des composants, de défense en profondeur et de Zero Trust.

L’application est déployée à l’aide de conteneurs Docker afin d’assurer l’isolation des services et un environnement reproductible pour les tests de sécurité.

---

## 2. Architecture globale du système

L’architecture repose sur trois composants principaux :

- **Frontend** : interface utilisateur accessible via un navigateur web
- **Backend (Django)** : logique applicative, API et gestion de l’authentification
- **Base de données (PostgreSQL)** : stockage des données applicatives

Ces composants sont exécutés dans des conteneurs Docker distincts et communiquent uniquement via un réseau interne Docker.


---

## 3. Conteneurisation et isolation des services

Chaque composant est isolé dans son propre conteneur :

- Le **frontend** ne communique qu’avec le backend
- Le **backend** est le seul service autorisé à accéder à la base de données
- La **base de données n’est pas exposée** vers l’extérieur (pas de port publié)

Un réseau Docker interne est utilisé afin d’empêcher l’accès direct aux services sensibles depuis l’hôte ou Internet.

Cette séparation permet de réduire la surface d’attaque et d’appliquer le principe du moindre privilège.

---

## 4. Sécurité de l’architecture (approche Zero Trust)

L’architecture suit une approche inspirée du **Zero Trust**, selon laquelle aucun composant n’est considéré comme fiable par défaut.

Les principes appliqués sont :

- Aucun accès direct à la base de données
- Authentification obligatoire pour accéder aux endpoints sensibles
- Vérification systématique des droits côté backend
- Isolation réseau entre les composants
- Accès contrôlé aux secrets via des variables d’environnement

---

## 5. Gestion des secrets et des configurations

Les données sensibles (identifiants de base de données, clés, mots de passe) ne sont pas stockées en dur dans le code.

Elles sont gérées via :
- des variables d’environnement
- un fichier `.env` non versionné
- un fichier `.env.example` servant de modèle

Cette approche permet d’éviter les fuites d’informations sensibles dans le dépôt Git.

---

## 6. Sécurité et STRIDE (vue architecture)

L’architecture permet d’atténuer plusieurs menaces du modèle STRIDE :

### Spoofing (usurpation d’identité)
- Authentification gérée côté backend (Django)
- Accès aux endpoints protégés sans authentification refusé

### Tampering (altération des données)
- Accès à la base de données uniquement via le backend
- Utilisation de l’ORM Django pour éviter les injections SQL

### Repudiation (non-répudiation)
- Journalisation des actions importantes côté backend
- Logs accessibles via les conteneurs Docker pour les tests

### Information Disclosure (divulgation d’informations)
- Base de données non exposée
- Réseau Docker interne
- Secrets non stockés dans le code

### Denial of Service (déni de service)
- Limitation des ressources CPU et mémoire des conteneurs
- Prévention de la saturation de la machine hôte

### Elevation of Privilege (élévation de privilèges)
- Gestion des rôles et permissions côté backend
- Refus des actions non autorisées

---

## 7. Journalisation et surveillance

Les logs applicatifs sont générés par le backend et accessibles via Docker.  
Ils permettent de tracer :
- les connexions réussies et échouées
- l’accès aux endpoints protégés
- les actions sensibles

Ces logs sont utilisés lors des tests de sécurité afin de démontrer la traçabilité des actions utilisateurs.

---

## 8. Limites actuelles et perspectives d’amélioration

Dans la version actuelle du projet, certaines fonctionnalités de sécurité restent basiques mais fonctionnelles.

Des améliorations possibles incluent :
- l’intégration d’un serveur d’authentification dédié (ex : Keycloak)
- la mise en place d’une authentification multi-facteur (MFA)
- des politiques réseau encore plus restrictives
- une centralisation avancée des logs (ELK, SIEM)

Ces évolutions pourraient être envisagées dans une version future du projet.

---

## 9. Conclusion

L’architecture mise en place permet de répondre aux exigences de sécurité du projet tout en restant adaptée à un contexte académique.  
La séparation des composants, l’isolation réseau, la gestion des secrets et la journalisation offrent une base solide pour les tests de sécurité et la démonstration des concepts étudiés.

