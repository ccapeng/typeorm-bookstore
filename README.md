# Bookstore with nodeJS, Express, TypeORM

## Features
- Backend is node.js. the object relationship mapping is TypeORM.
- It's one of backend servers of my [bookstore](https://ccapeng.gitbook.io/bookstores/) project.

## To start
- Development
	```
	npm run dev
	```
	By the default, the server start at the `localhost` port `8001`.
- Production
	```
	npm run start
	```

## REST
The REST API end points are
- APIs document with swagger: 
	[http://127.0.0.1:8001/docs](http://127.0.0.1:8001/docs)
- Category: 
	[http://127.0.0.1:8001/api/categories](http://127.0.0.1:8080/api/categories)
- Publisher: 
	[http://127.0.0.1:8001/api/publishers](http://127.0.0.1:8001/api/publishers)
- Author: 
	[http://127.0.0.1:8001/api/authors](http://127.0.0.1:8001/api/authors)
- Book: 
	[http://127.0.0.1:8001/api/books](http://127.0.0.1:8001/api/books)

## Front End
- The bookstore front end is react/redux.  
	Please find it in here [https://github.com/ccapeng/bookstore-hook-redux](https://github.com/ccapeng/bookstore-hook-redux)  

