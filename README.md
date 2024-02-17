# Overview


A small social network with a simple REST API back end written in **Node.js**, that allows users to signup, login, add/remove friends and make posts. A user can see all of their friends' posts in their feed ordered by the time of post's creation. Friendships don't have to be bidirectional, they work more like a following. The back end uses an integrated **SQLite** database with **Sequelize** ORM library.
<br> 

I've also included a small **client CLI application** written in Python to test the back end.

<br>
The API endpoints:

```
- /api/user/signup          ==> User signup
- /api/user/login           ==> User login

- /api/connection/add       ==> Add friend 
- /api/connection/remove    ==> Remove friend
- /api/connection/list      ==> List friends

- /api/post/publish         ==> Make a post
- /api/post/feed            ==> List of posts made by friends
```


#### NOTE: The back end is relatively simplistic and it performs some, but not every possible security check.
It doesn't check the payload size, for example.

## Example

Here's what the client CLI looks like:
```
[logged as Jack] enter command: list

Your friend list:
---- Darko
---- John
_________________________________________________
[logged as Jack] enter command: feed

               Your Feed

2024-02-15   16:52   Darko
The CLI too


2024-02-15   16:50   John
The back end works great


_________________________________________________
[logged as Jack] enter command:
```
<br>

## Testing


#### NOTE: You have to have Node.js intalled to run the back end. 

<br>
If you wish to run and test the API yourself, first you have to start the server by running this command from the 'backend' folder.

<br>

```
npm run server
```

<br>
When you start the server, from another terminal/cmd you can run the client application by running:

<br>

```
python ./main.py
```

The client application provides a small menu with 'help' option.

#### NOTE: You can modify the 'backend/.env' and 'client/config.py' to change the port that the server will be using.
