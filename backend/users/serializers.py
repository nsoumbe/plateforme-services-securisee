from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'role']
        extra_kwargs = {'password': {'write_only': True}} # Le mot de passe ne sera jamais renvoyé en clair

    def create(self, validated_data):
        # Cette méthode garantit que le mot de passe est haché (PBKDF2)
        user = User.objects.create_user(**validated_data)
        return user