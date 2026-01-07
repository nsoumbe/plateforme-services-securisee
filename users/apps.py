from django.apps import AppConfig

class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users' # Assure-toi que ce n'est pas écrit 'services' ou autre chose ici