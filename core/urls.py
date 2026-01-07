from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Route pour se connecter et obtenir le token
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # Route pour rafraîchir le token sans se reconnecter
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # On inclut les futures routes de nos apps
    path('api/users/', include('users.urls')),
    path('api/services/', include('services.urls')),
]