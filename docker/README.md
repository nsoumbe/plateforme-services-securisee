# Containerisation & Sécurité

La plateforme est déployée via Docker Compose afin de :
- Isoler le frontend, le backend et la base de données
- Réduire la surface d’attaque
- Appliquer une approche inspirée de Zero Trust

## Sécurité
- La base de données n’est accessible que via le backend
- Les services communiquent sur un réseau Docker interne
- Les secrets sont stockés dans des variables d’environnement
