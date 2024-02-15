from loggedOutMenu import *


horizontalLine = "_________________________________________________"

helpMessage = """
Available commands:
- login
- signup
- exit
"""

def program():
    running = True

    print(horizontalLine)
    print("Type 'help' for options")

    while running:
        print("enter command: ",end = "")
        words = input().split()
        
        if len(words) != 1:
            print("Invalid command. Type 'help' for options")
            print(horizontalLine)
            continue

        cmd = words[0]
        
        if cmd == "login":
            login()
       
        elif cmd == "signup":
            signup() 
        
        elif cmd == "exit":
            print("\nEXITING\n")
            running = False
       
        elif cmd == "help":
            print(helpMessage)
        
        else:
            print("Invalid command. Type 'help' for options")

        print(horizontalLine)


program()