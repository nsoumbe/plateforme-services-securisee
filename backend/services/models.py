from django.db import models
from django.conf import settings

class Service(models.Model):
    provider = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='services')
    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.provider.username}"

# RECOPIE BIEN CETTE PARTIE SANS ESPACE AU DÉBUT DE LA LIGNE SUIVANTE :
class Order(models.Model):
    STATUS_CHOICES = (
        ('pending', 'En attente'),
        ('accepted', 'Acceptée'),
        ('completed', 'Terminée'),
        ('canceled', 'Annulée'),
    )

    client = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='orders')
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='orders')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Commande {self.id} - {self.client.username}"