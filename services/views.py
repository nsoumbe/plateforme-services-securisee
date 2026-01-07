from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Service, Order
from .serializers import ServiceSerializer, OrderSerializer
from users.permissions import IsProviderRole, IsClientRole

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [IsProviderRole()]
        return [permissions.IsAuthenticatedOrReadOnly()]

    def perform_create(self, serializer):
        serializer.save(provider=self.request.user)

# VERIFIE BIEN QUE CETTE PARTIE EST PRESENTE :
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [IsClientRole()]
        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(client=self.request.user)

    @action(detail=True, methods=['post'], permission_classes=[IsProviderRole])
    def accept_order(self, request, pk=None):
        order = self.get_object()
        if order.service.provider != request.user:
            return Response({"error": "Ce n'est pas votre service !"}, status=status.HTTP_403_FORBIDDEN)
        
        order.status = 'accepted'
        order.save()
        return Response({"status": "Commande acceptée"})