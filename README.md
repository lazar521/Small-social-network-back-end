# Introduction


A small social network with a simple REST API backend that allows users to signup, login, add/remove friends and make posts. A user can see all of their friends' posts in their feed. Friends' posts are ordered by the time of creation.
<br> 
I've also included a small CLI application written in Python to test the backend.


## Example

Here's what the CLI looks like:
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
The backend works great


_________________________________________________
[logged as Jack] enter command:
```
<br>

## Testing


#### NOTE: You have to have Node.js intalled to run the backend. 

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


