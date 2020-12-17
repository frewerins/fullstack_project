from rest_framework import serializers
from .models import *

class ItemSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = '__all__'

    def get_image_url(self, item):
        try:
            local_url = item.image.url
            request = self.context['request']
            print('request: ', request)
            return request.build_absolute_uri(local_url)
        except Exception:
            return None

class PageSerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True, read_only=True)

    class Meta:
        model = Page
        fields = ['id', 'title', 'items']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {'password': {'write_only': True}}
