from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User  # Importe ton modèle personnalisé

# Enregistre ton modèle User pour qu'il apparaisse dans l'interface
admin.site.register(User, UserAdmin)