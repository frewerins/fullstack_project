from rest_framework.generics import get_object_or_404, RetrieveUpdateAPIView
from django.shortcuts import render, redirect
from django.views import View
from .models import *
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from .models import User
from .serializers import UserSerializer
from django.contrib.auth.hashers import make_password
from django.utils.crypto import get_random_string
from rest_framework import mixins, generics, permissions
from rest_framework.authtoken.models import Token
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings
from rest_framework.decorators import api_view


class PageList(APIView):

    def get(self, request):
        pages = Page.objects.all()
        serializer = PageSerializer(pages, many=True)
        return Response(serializer.data)

    def get(self, request, id):
        page = Page.objects.get(id=id)
        serializer = PageSerializer(page)
        return Response(serializer.data)

    def post(self, request):
        serializer = PageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, id):
        page = get_object_or_404(Page.objects.all(), id=id)
        page.delete()
        return Response({id}, status=204)

class ItemList(APIView):

    def get(self, request):
        items = Item.objects.all()
        serializer = ItemSerializer(items, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, id):
        item = get_object_or_404(Item.objects.all(), id=id)
        item.delete()
        return Response({id}, status=204)

class CreateUserAPIView(APIView):
    # permission_classes = (AllowAny,)
 
    def post(self, request):
        user = request.data
        serializer = UserSerializer(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


@api_view(['POST'])
def authenticate_user(request):
    try:
        email = request.data['email']
        password = request.data['password']
 
        user = User.objects.get(email=email, password=password)
        if user:
            try:
                payload = jwt_payload_handler(user)
                token = jwt.encode(payload, settings.SECRET_KEY)
                user_details = {}
                user_details['name'] = "%s %s" % (
                    user.first_name, user.last_name)
                user_details['token'] = token
                user_logged_in.send(sender=user.__class__,
                                    request=request, user=user)
                return Response(user_details)
 
            except Exception as e:
                raise e
        else:
            res = {
                'error': 'can not authenticate with the given credentials or the account has been deactivated'}
            return Response(res)
    except KeyError:
        res = {'error': 'please provide a email and a password'}
        return Response(res)

class UserRetrieveUpdateAPIView(RetrieveUpdateAPIView):
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        serializer = self.serializer_class(request.user)
        return Response(serializer.data)
  
    def put(self, request, *args, **kwargs):
        serializer_data = request.data.get('user', {})
        serializer = UserSerializer(request.user, data=serializer_data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

# class ItemCreate(generics.CreateAPIView):
#     serializer_class = ItemSerializer


# class ItemList(generics.ListAPIView):
#     serializer_class = ItemSerializer
#     queryset = Item.objects.all()


# class ItemDetail(generics.RetrieveUpdateDestroyAPIView):
#     serializer_class = ItemSerializer
#     queryset = Item.objects.all()

# class Get_all(View):
#     def get(self, request):
#         items = Item.objects.all()
#         return render(request, 'item/index.html', context={'items': items})

# class Get_by_id(View):
#     def get(self, request, id):
#         item = Item.objects.get(id=id);
#         return render(request, 'item/index.html', context={'items': {item}})

# class Delete(View):
#     def get(self, request, id):
#         Item.objects.get(id=id).delete()
#         return redirect('/item/get_all')

# class Add(View):
#     def get(self, request):
#         params={
#             "title":"",
#             "link":"",
#             "descr":""
#         }
#         return render(request, 'item/add.html', context=params)

#     def post(self, request):
#         params = {
#             "title": request.POST.get('title'),
#             "link": request.POST.get('link'),
#             "descr": request.POST.get('descr')
#         }
#         new_item = Item(title=params['title'], link=params['link'], descr=params['descr'])
#         new_item.save()
#         return render(request, 'item/add.html', context=params)
