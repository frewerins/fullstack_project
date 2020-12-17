"""python URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    # path('delete/<id>', Delete.as_view()),
    # #path('get_all/', Get_all.as_view()),

    # path('get_by_id/<id>', Get_by_id.as_view()),
    # path('add/', Add.as_view(), name="add_item"),
    # path('create/', ItemCreate.as_view()))

    path('pages/', PageList.as_view()),
    path('pages/<id>/', PageList.as_view()),
    path('items/', ItemList.as_view()),
    path('items/<id>/', ItemList.as_view()),
    path('login/', CreateUserAPIView.as_view()),
    path('user/', UserRetrieveUpdateAPIView.as_view())
]
