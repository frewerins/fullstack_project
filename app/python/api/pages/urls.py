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
    path('items/', ItemList.as_view())
]