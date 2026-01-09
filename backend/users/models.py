from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # Définition des rôles
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('client', 'Client'),
        ('provider', 'Fournisseur'),
    )
    
    # On rend l'email unique et obligatoire pour la connexion
    email = models.EmailField(unique=True)
    
    # Ton champ de rôle avec les choix prédéfinis
    role = models.CharField(
        max_length=10, 
        choices=ROLE_CHOICES, 
        default='client'
    )

    # CONFIGURATION CRUCIALE POUR LIONEL :
    # On indique à Django que l'identifiant de connexion est l'email
    USERNAME_FIELD = 'email' 
    
    # Le champ 'username' reste requis par Django mais n'est plus l'identifiant
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return f"{self.email} ({self.role})"