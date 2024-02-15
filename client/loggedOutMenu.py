import requests
from loggedInMenu import *
from config import PORT

headers = {'Content-Type': 'application/json'}


def login():
    reqBody = {}

    print("\nusername: ",end="")
    reqBody["username"] = input()
    
    print("password: ", end= "")
    reqBody["password"] = input()

    response = requests.post(url="http://localhost:" + PORT + "/api/user/login",headers=headers,json=reqBody)

    resBody = response.json()

    if response.status_code >= 400:
        print("CODE " + str(response.status_code) +": Login failed: " + resBody["message"])    
        return
 
    print("\n========= YOU ARE LOGGED IN AS " + reqBody["username"] + " =========")
    sessionToken = resBody["token"]
    loggedIn(reqBody["username"],sessionToken)
    
 
 

def signup():
    reqBody = {}

    print("\nusername: ",end="")
    reqBody["username"] = input()
    
    print("password: ", end= "")
    reqBody["password"] = input()

    print("email: ",end ="")
    reqBody["email"] = input()

    response = requests.post(url="http://localhost:" + PORT + "/api/user/signup",headers=headers,json=reqBody)

    if response.status_code >= 400:
        print("CODE " + str(response.status_code) + ": Signup failed: " + response.json()["message"])
    else :
        print("Successfully signed up")




