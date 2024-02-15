import requests
from config import PORT

horizontalLine = "_________________________________________________"

helpMessage = """
Available commands:
- list       => Lists your friends
- add        => Adds a friend
- remove     => Removes a friend
- post       => Makes a post
- feed       => Shows your feed (Posts made by users that you follow)
- logout     => Logs you out of your account
"""


def loggedIn(username,sessionToken):
    running = True

    print(helpMessage)
    print("Type 'help' to see available commands for logged in users")

    requestHeaders = {'Content-Type': 'application/json', 'Authorization':sessionToken}

    while running:
        print("[logged as " + username +"] enter command: ",end = "")
        words = input().split()
        
        if len(words) != 1:
            print("Invalid command. Type 'help' to see available commands for logged in users")
            print(horizontalLine)
            continue

        cmd = words[0]
        
        if cmd == "list":
            listFriends(requestHeaders)
        
        elif cmd == "add":
            addFriend(requestHeaders)

        elif cmd == "remove":
            removeFriend(requestHeaders)

        elif cmd == "post":
            makePost(requestHeaders)
        
        elif cmd == "feed":
            showFeed(requestHeaders)

        elif cmd == "logout":
            print("\nLOGGING OUT\n")
            running = False

        elif cmd == "help":
            print(helpMessage)

        else:
            print("Invalid command. Type 'help' to see available commands for logged in users")

        print(horizontalLine)



def listFriends(headers):
    reqBody = {}

    response = requests.get(url="http://localhost:" + PORT + "/api/connection/list",headers=headers,json=reqBody)
    resBody = response.json()

    print("\nYour friend list:")
    for friend in resBody["friends"]:
        print("---- " + friend)



def addFriend(headers):
    reqBody = {}

    print("\nWho do you want to add: ",end="")
    reqBody["friendName"] = input()

    response = requests.post(url="http://localhost:" + PORT + "/api/connection/add",headers=headers,json=reqBody)

    resBody = response.json()

    if response.status_code >= 400:
        print("CODE " + str(response.status_code) +": Cannot add friend: " + resBody["message"])    
    else:
        print("You have added " + reqBody["friendName"])




def removeFriend(headers):
    reqBody = {}

    print("\nWho do you want to remove: ",end="")
    reqBody["friendName"] = input()

    response = requests.post(url="http://localhost:" + PORT + "/api/connection/remove",headers=headers,json=reqBody)

    resBody = response.json()

    if response.status_code >= 400:
        print("CODE " + str(response.status_code) +": Cannot remove friend: " + resBody["message"])    
    else:
        print("You have removed " + reqBody["friendName"])




def makePost(headers):
    reqBody = {}

    print("\nWhat do you wish to post: ",end="")
    reqBody["contents"] = input()

    response = requests.post(url="http://localhost:" + PORT + "/api/post/publish",headers=headers,json=reqBody)
    resBody = response.json()

    if response.status_code >= 400:
        print("CODE " + str(response.status_code) +": Cannot add friend: " + resBody["message"])    
    else:
        print("Posted!")




def showFeed(headers):
    response = requests.get(url="http://localhost:" + PORT + "/api/post/feed",headers=headers)
    resBody = response.json()
    
    if response.status_code >= 400:
        print("CODE " + str(response.status_code) +": Cannot show feed: " + resBody["message"])    
        return
    
    print("\n               Your Feed\n")
    
    for post in resBody["Posts"]:
        date = post["createdAt"][:10] + "   " + post["createdAt"][11:16]
        print(date + "   " + post["User"]["username"] + "\n" + post["contents"] + "\n\n")