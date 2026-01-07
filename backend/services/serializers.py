from rest_framework import serializers
from .models import Service, Order  # On regroupe les imports ici

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'title', 'description', 'price', 'provider', 'created_at']
        read_only_fields = ['provider']

    def validate_price(self, value):
        if value <= 0:
            raise serializers.ValidationError("Le prix doit être supérieur à zéro.")
        return value

# Cette classe doit être collée au bord gauche
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'client', 'service', 'status', 'created_at']
        read_only_fields = ['client', 'status']

    def validate(self, data):
        # Sécurité : Un fournisseur ne peut pas acheter son propre service
        if self.context['request'].user == data['service'].provider:
            raise serializers.ValidationError("Vous ne pouvez pas commander votre propre service.")
        return data