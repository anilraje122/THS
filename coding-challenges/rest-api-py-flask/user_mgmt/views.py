from django.http import HttpResponse
from django.http import HttpRequest
from rest_framework.decorators import api_view
from . import controller
import json

def index(request):
    return HttpResponse("Welcome to User Management App")

@api_view(["GET", "POST", "PUT", "DELETE"])
def users(request):
    if request.method == 'POST':
        return controller.userRegistration(request)
    elif request.method == 'GET':
        return controller.userInfo(request)
    elif request.method == 'PUT':
        return controller.userUpdate(request)
    elif request.method == 'DELETE':
        return controller.userDelete(request)
    else:
        return HttpResponse("Error: Invalid HTTP Method")
    
    
    