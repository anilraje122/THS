from django.http import HttpResponse
from django.http import HttpRequest
import json
from . import model

def userRegistration(request):
    body = json.loads(request.body.decode("utf-8"))
    firstname = body["firstname"] if "firstname" in body and type(body["firstname"]) == str and len(body["firstname"]) != 0 and type(body["firstname"]) != None else False
    lastname = body["lastname"] if "lastname" in body and type(body["lastname"]) == str and len(body["lastname"]) != 0 and type(body["lastname"]) != None else False
    email = body["email"] if "email" in body and type(body["email"]) == str and len(body["email"]) != 0 and type(body["email"]) != None else False
    phone = body["phone"] if "phone" in body and type(body["phone"]) == str and len(body["phone"]) == 10 and type(body["phone"]) != None else False
    password = body["password"] if "password" in body and type(body["password"]) == str and len(body["password"]) >= 6 and type(body["password"]) != None else False
    if firstname and lastname and email and password and phone:
        userData = {
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "phone": phone,
            "password": password
        }
        if model.writeFile("userDB", phone, userData):
            return HttpResponse("User Registered Successfully")
        else:
            return HttpResponse("Server Error")
    else:
        return HttpResponse("Required Fields Missing")

def userInfo(request):
    phone = request.GET.get('phone', None)
    phone = phone if type(phone) == str and len(phone) == 10 and type(phone) != None else False
    print(phone)
    if phone:
        userData = model.readFile("userDB", phone)        
        if userData:
            return HttpResponse(userData)
        else:
            return HttpResponse("Server Error")
    else:
        return HttpResponse("Required Fields Missing")

def userUpdate(request):
    body = json.loads(request.body.decode("utf-8"))
    firstname = body["firstname"] if "firstname" in body and type(body["firstname"]) == str and len(body["firstname"]) != 0 and type(body["firstname"]) != None else False
    lastname = body["lastname"] if "lastname" in body and type(body["lastname"]) == str and len(body["lastname"]) != 0 and type(body["lastname"]) != None else False
    email = body["email"] if "email" in body and type(body["email"]) == str and len(body["email"]) != 0 and type(body["email"]) != None else False
    phone = body["phone"] if "phone" in body and type(body["phone"]) == str and len(body["phone"]) == 10 and type(body["phone"]) != None else False
    password = body["password"] if "password" in body and type(body["password"]) == str and len(body["password"]) >= 6 and type(body["password"]) != None else False

    if phone and (firstname or lastname or email or password):
        data = model.readFile("userDB", phone)
        if data:
            print(data)
            userData = json.loads(data)
            print(userData)
            userData["firstname"] = firstname if "firstname" in body else userData["firstname"]
            userData["lastname"] = lastname if "lastname" in body else userData["lastname"]
            userData["email"] = email if "email" in body else userData["email"]
            userData["password"] = password if "password" in body else userData["password"]
            if model.updateFile("userDB", phone, userData):
                return HttpResponse("User Details Updated Successfully")
            else:
                return HttpResponse("Server Error")
        else:
            return HttpResponse("User Doesn't Exist")
    else:
        return HttpResponse("Required Fields Missing")

def userDelete(request):
    phone = request.GET.get('phone', None)
    phone = phone if type(phone) == str and len(phone) != 0 and type(phone) != None  else False
    if phone:        
        if model.deleteFile("userDB", phone):
            return HttpResponse("User Deleted Successfully")
        else:
            return HttpResponse("Server Error")
    else:
        return HttpResponse("Required Fields Missing")