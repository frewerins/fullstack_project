from django.db import models
from django.db.models import CharField, UUIDField, IntegerField, FloatField, EmailField
from django.contrib.auth.models import (
    AbstractBaseUser, PermissionsMixin, BaseUserManager
)

class Page(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=32, blank=True)

    def __str__(self):
        return f'{self.id}: {self.title}'

class Item(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=32, blank=True)
    link = models.TextField(blank=True)
    descr = models.TextField(max_length=256, blank=True)
    page = models.ForeignKey(Page, related_name="items", on_delete=models.CASCADE)
    #image = models.ImageField(upload_to='items_images', null=True, blank=True)

    def __str__(self):
        return f'{self.id}: {self.title}'

class UserManager(BaseUserManager):
 
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The given email must be set')
        try:
            with transaction.atomic():
                user = self.model(email=email, **extra_fields)
                user.set_password(password)
                user.save(using=self._db)
                return user
        except:
            raise
 
    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)
 
    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
 
        return self._create_user(email, password=password, **extra_fields)

class User(AbstractBaseUser):
    last_name = CharField("Family name", max_length=150, blank=True)
    first_name = CharField("Given name", max_length=30, blank=True)
    email = EmailField()
    objects = UserManager()

    def __str__(self):
        return self.email