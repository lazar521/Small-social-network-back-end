import requests
from loggedInMenu import *

headers = {'Content-Type': 'application/json'}


def login():
    reqBody = {}

    print("\nusername: ",end="")
    reqBody["username"] = input()
    
    print("password: ", end= "")
    reqBody["password"] = input()

    response = requests.post(url="http://localhost:5000/api/user/login",headers=headers,json=reqBody)

    resBody = response.json()

    if response.status_code >= 400:
        print("CODE " + str(response.status_code) +": Login failed: " + resBody["message"])    
        return
 
    print("\nYou are logged in as " + reqBody["username"])
    sessionToken = resBody["token"]
    loggedIn(sessionToken)
    
 
 

def signup():
    reqBody = {}

    print("\nusername: ",end="")
    reqBody["username"] = input()
    
    print("password: ", end= "")
    reqBody["password"] = input()

    print("email: ",end ="")
    reqBody["email"] = input()

    response = requests.post(url="http://localhost:5000/api/user/signup",headers=headers,json=reqBody)

    if response.status_code == 201:
        print("Successfully signed up")
    else :
        print("CODE " + str(response.status_code) + ": Signup failed: " + response.json()["message"])




