# Virtual environments

A virtual environment is a project scope that is isolated from other Python environments. Take a FastAPI project as example. This project needs its own dependencies including FastAPI and other stuff which might not be needed in another project.

## Installing dependencies

In Python, you use `pip`, which is Python package manager, to install dependencies of python projects.

In order to check your `pip` version:

```
python3 -m pip --version
```

To see what packages are already globally installed on your machine:

```
pip3 list
```

In order to setup and activate a new virtual environment for a project, Python provides us with a `venv` package with which you can do this. First go on and create a directory for your project:

```
mkdir fastapi && cd fastapi
```

Then create your virtual env:

```
python3 -m venv fastapienv
```

Then you need to activate the virtual env:

```
source fastapienv/bin/activate
```

Inside the environment, while it is active, you can use this command to see what packages are installed in the env:

```
pip list
```

> Note that you don't need to write `pip3` within the virtual env. You cannot use this command in python's global environment.

You can now go on and install `fastapi` package:

```
pip install fastapi
```

Then you need to install `uvicorn` package:

```
pip install "uvicorn[standard]"
```

> Notice the `[standard]` in uvicorn install command.

## VS Code troubles

### Interpretter

You might need to change the VS Code default Python interpretter to the Python interpretter inside the virtual environement.

[later...]

# FastAPI request method logic

## GET handlers

To implement a simple `GET` endpoint for a specific resource you can follow this example:

```py
# books.py
from fastapi import FastAPI

app = FastAPI()

@app.get("/books") # accessible on 127.0.0.1:8000/books GET
async def get_all_books():
  return books
```

> Notice that Swagger docs will be filled with your function definition name, endpoint and params. So choose them wisely.

To spin up a FastAPI server you can use uvicorn:

```
uvicorn books:app --reload
```

This will run the server on port `8000`.

> Notice that `app` is the name of the FastAPI variable defined in the `books.py` file. `--reload` flag will make the server reload on any code change.

Also you have access to the Swagger docs of your project on `127.0.0.1:8000/docs`.

## Path parameters

Path parameters (also called URL params) are request parameters attached to the URL. You can have stataic and dynamic params.

```py
@app.get("/books/{book_id}")
async def get_book_by_id(book_id: str):
  return books[book_id]
```

> Notice that adding a `str` type annotation to the `book_id` in the handler definition will cause the param to be parsed as a string.

### Careful with dynamic vs. static path params handler placement

In this endpoint and handler setup:

```py
@app.get("/books/{book_id}")
async def get_book_by_id(book_id: str):
  return books[book_id]

@app.get("/books/my_book")
async def get_book_by_id():
  return my_book
```

Calling `/books/my_book` will be handled by the first handler instead of the second. To fix it, you need to switch the postion of the two endpoint and handler definitions:

```py
@app.get("/books/my_book")
async def get_book_by_id():
  return my_book

@app.get("/books/{book_id}")
async def get_book_by_id(book_id: str):
  return books[book_id]
```

## Query parameters

Query parameters (also called query params) are request parameters attached to the URL after a `?` character with `name=value` pairs separated by `&` characters.

```py
@app.get("/books/")
async def search_book_by_category(category: str):
  return books.filter_by(category)
```

You can then call this endpoint with a `GET` request to `/books/?category=science`

> Notice that any parameter listed in the function parameters which is not in the endpoint decorator definition will be understood by Swagger as a query parameter.

## Combine path and query parameters

```py
@app.get("/books/{author}/")
async def get_books_by_author_and_category(author: str, category: str):
  return books.filter_by(author).filter_by(category)
```

## POST handlers

To be able to handle a `POST` request you need to import `Body` from `fastapi` to parse the request body for you.

```py
from fastapi import Body, FastAPI

@app.post("/books")
async def create_new_book(new_book=Body()):
  return Books.add(new_book)
```

This would require the user, by default, to send `application/json` content type in the request body.

## PUT handlers

Since `PUT` requests also have bodies, you need to use `Body` to parse it:

```py
from fastapi import Body, FastAPI

@app.post("/books/{book_id}")
async def update_book(book_id: str, updating_data=Body()):
  return Books[book_id].update(updating_data)
```

## DELETE handlers

`DELETE` requests do not have body. So you would generally define the `DELETE` endpoints with path or query params:

```py
@app.delete("/books/{book_id}")
async def delete_book(book_id: str):
  return Books[book_id].delete()
```

# Exception, Status codes and validation

In this section you will learn how to improve upon the route handlers you defined in the previous section and push them closer to a real-world project.

## POST handler validation

This is the POST handler we have had until this point.

```py
@app.post("/books")
async def create_new_book(new_book = Body()):
  return Books.add(new_book)
```

The problem with this is that the data that comes with the request body should first be validated and then be used to create a new book in the database.

`pydantic` is Python library used for data modelling, data parsing that comes with efficient error handling. To be able to use this library for data validation, you would have to create a separate **request model** for data validation. Then you would need to add **field data validation** on each variable or element. Here is a request model defined for `pydantic` validation as an example:

```py
from pydantic import BaseModel, Field
from typing import Optional

class BookRequest(BaseModel):
  id: Optional[int] = Field(description="Not needed on create", default=None)
  title: str = Field(min_length = 3)
  author: str = Field(min_length = 1)
  description: str = Field(min_length = 1, max_length = 100)
  rating: int = Field(gt = 0, lt = 5)
```

> Notice that we set the `id` property to optional since a user is not supposed to set the ID of a new record in your database. It should be figured automatically.

Notice that `BaseModel` is Pydantic model. By inheriting it you get a little bit more functionality for data validation.

After the validation, we need the book request body to be converted into an actual book object so it can be stored in the database:

```py
@app.post("/books")
async def create_book(book_request: BookRequest):
  new_book = Book(**book_request.dict())
  Books.add(new_book)
```

> Remember from python that `**` will pass the key-value pairs from the `BookRequest` into the `Book` constructor.

> In some cases or different versions of `pydantic` you might need to call `model_dump()` instead of `dict()`.

So you also need to define a `Book` object:

```py
class Book:
  id: int
  title: str
  author: str
  description: str
  rating: int

  def __init__(self, id, title, author, description, rating):
    self.id = id
    self.title = title
    self.author = author
    self.description = description
    self.rating = rating
```

If a request body violates any of the validation rules, pydantic will raise error in response.

### Populating Swagger example data with pydantic

```py
from pydantic import BaseModel, Field
from typing import Optional

class BookRequest(BaseModel):
  id: Optional[int] = Field(description="Not needed on create", default=None)
  title: str = Field(min_length = 3)
  author: str = Field(min_length = 1)
  description: str = Field(min_length = 1, max_length = 100)
  rating: int = Field(gt = 0, lt = 5)

  model_config = {
    "json_schema_example": {
      "example": {
        "title": "A new book",
        "author": "Omid",
        "description": "Great book",
        "rating": 5
      }
    }
  }
```

## PUT handlers validation

Everything regarding data validation with pydantic is similar as in POST handlers.

## Path parameters validation

You can implement something similar to pydantic field validation on Path parameters. To do this, You need to use `Path` from `fastapi`. For instance, you can validation a path paramtere of book ID to make sure it will always be valiadated as a positive integer.

```py
from fastapi import Path

@app.get("/books/{book_id}")
async def get_book_by_id(book_id: int = Path(gt = 0)):
  return Books[book_id]
```

If you call this endpoint with a value that violates the validation, you will automatically receive a `422` unprocessable entity response status.

## Query parameters validation

Similar to the way you can validate path parameters, you can validate query parameters by using `Query` from `fastapi`:

```py
from fastapi import Query

@app.get("/books/")
async def get_books_by_rating(rating: int = Query(gt = 0, lt = 6)):
  return Books.filter_by("rating").value(rating)
```

Let's see another example:

```py
@app.get("/books/publish")
async def get_books_by_publish_date(publish_date: int = Query(gt=1999, lt=2031)):
  return Books.filter_by("publish_date").value(publish_date)
```

## Status codes

In order to return proper status codes and responses and also raise HTTP exceptions in your endpoints you need to use `HTTPException` from `fastapi`.

For failure responses:

```py
from fastapi import HTTPException

@app.get('/books/{book_id}')
async def get_book_by_id(book_id: int = Path(gt = 0)):
  book_to_return = Books[book_id]

  if not book_to_return:
    raise HTTPException(status_code=404, detail="Item not found.")
```

For success responses, you can use `status` from `starlette`:

```py
from starlette import status

@app.get("/books", status_code=status.HTTP_200_OK)
async def get_books():
  return Books

@app.get('/books/{book_id}', status_code=status.HTTP_200_OK)
async def get_book_by_id(book_id: int = Path(gt = 0)):
  book_to_return = Books[book_id]

  if not book_to_return:
    raise HTTPException(status_code=404, detail="Item not found.")

@app.post("/books", status_code=status.HTTP_201_CREATED)
async def create_book(book_request: BookRequest):
  new_book = Book(**book_request.dict())
  Books.add(new_book)
```

# Database setup

In a new project directory and activated virtual environment, go on and create a `database.py` file. You are going to use this file to setup and connect to your database.

Before implementing anything in this file, you need to install `sqlalchemy` library. It is an ORM which FastAPI can use to create and connect to a database.

```
pip install sqlalchemy
```

Then go and implement:

```py
SQLALCHEMY_DATABASE_URL = 'sqlite:///./todos.db'
# This URL is going to be used to create a location of this database on your fastapi application
```

Next, you need to create an engine for connecting to the database and using it:

```py
from sqlalchemy import create_engine

SQLALCHEMY_DATABASE_URL = 'sqlite:///./todos.db'
# This URL is going to be used to create a location of this database on your fastapi application

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
# By default, SQLite will only allow one thread to communicate with it, assuming that each thread will handle an independent request. This is to prevent any kind of accidentally sharing of the same connection for different kinds of requests. Since it is completely normal in FastAPI to have more than one thread that could interact with the database, so this option is set to False to make sure that we don't want to be checking the same thread all the time
```

You now need to create a session local and each instance of the session local will have a database session. Remember that the class itself is not a database session, but we will add that later on. Go on and import `sessionmaker` from `sqlalchemy.orm`.

```py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = 'sqlite:///./todos.db'

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit = False, autoflush = False, bind = engine)
```

The last thing to do is to create a database object so you can interact with it.

```py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

SQLALCHEMY_DATABASE_URL = 'sqlite:///./todos.db'

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit = False, autoflush = False, bind = engine)

Base = declarative_base()
```

So later on you would be able to call your `database.py` file and create a base which is an object of the database and is going to be used to control your database.

## Tables (models)

To implement your models, you first need to create a file called `models.py`. Models is a way for SQLAlchemy to understand what kind of database tables you are going to create within your database. A database model is going to be the actual record that is inside a database table.

Go on and import the `Base` you created in your `database.py` file:

```py
from database import Base
from sqlalchemy import Column, Integer, String, Boolean

class Todos(Base):
  __tablename__ = 'todos'

  id: Column(Integer, primary_key = True, index = True)
  title: Column(String)
  description: Column(string)
  priority: Column(Integer)
  complete: Column(Boolean, default = False)
```

## Create database and tables

Up to this point, we still have no database or no table created. To do this, create a `main.py` file in your project root:

```py
from fastapi import FastAPI
import models
from database import engine

app = FastAPI()

models.Base.metadata.create_all(bind = engine)
```

Now with the terminal located at the project root:

```
uvicorn main:app --reload
```

You will see that you get a new file called `todos.db` in your project root. So basically, this piece of code:

```py
models.Base.metadata.create_all(bind = engine)
```

Takes everything from your `database.py` and `models.py` file and create your database.

> Notice that this code will only run if `todos.db` does not already exist in your project. So if you have already created the `.db` file and then, you update your table defintions, this line of code will not run again to update your database. To make the update happen, you are going to need `alembic` migrations.

## Install SQLite

[later...]

## Use SQLite for direct interaction with database

With the terminal located at the project root:

```
sqlite3 todos.db
```

You can now use SQL language to interact with your database. You can get all the schema defined in your database by:

```
.schema
```

You can change the display style of the table when using SQL select operator by:

```
.mode column
.mode markdown
.mode box
.mode table
```

## API-Database interaction

You now need to create your database dependency using the `SessionLocal` class. Insid `main.py`:

```py
from fastapi import FastAPI
import models
from database import engine, SessionLocal

app = FastAPI()

models.Base.metadata.create_all(bind = engine)

def get_db():
  db = SessionLocal()

  try:
    yield db
  finally:
    db.close()
```

The `get_db` function determines that the code before `yield` and including the `yield` will be executed before a response is sent, and the code after `yield` will be executed after the response is sent.

Now before beginning to process each request, we need to fetch this database SessionLocal and open and close the connection when receiving and responding to any request that comes to the server. This actually means that we need to implement dependency injection pattern, which is actually implemented for us, we just need to use it by importing `Depends` from `fastapi`, `SessionLocal` from `database.py`, and `Session` form `sqlalchemy.orm`.

```py
# main.py
from fastapi import FastAPI, Depends
import models
from models import Todos
from database import engine, SessionLocal
from typing import Annotated
from sqlalchemy.orm import Session

app = FastAPI()

models.Base.metadata.create_all(bind = engine)

def get_db():
  db = SessionLocal()

  try:
    yield db
  finally:
    db.close()


@app.get("/todos")
async def get_all_todos(db: Annotated[Session, Depends(get_db)]):
  return db.query(Todos).all()
```

So, Python's `Annotated` is really helping us implementing the dependency injection pattern. Since this piece of code:

```py
Annotated[Session, Depends(get_db)]
```

will be repeated multiple times for all your endpoint defitions, you can refactor and have:

```py
db_dependency = Annotated[Session, Depends(get_db)]
```

And then use it in your endpoint definition:

```py
@app.get("/todos", status_code = status.HTTP_200_OK)
async def get_all_todos(db: db_dependency):
  return db.query(Todos).all()
```

You can now go on and run uvicorn server:

```
uvicorn main:app --reload
```

## Getting resource by ID

```py
# main.py
from fastapi import HTTPException, Path
from starlette import status

@app.get("/todos/{todo_id}", status_code = status.HTTP_200_OK)
async def get_todo_by_id(db: db_dependency, todo_id: int: Path(gt = 0)):

  todo_model = db.query(Todos).filter(Todos.id == todo_id).first()

  if todo_model is not None:
    return todo_model

  raise HTTPException(status_code = 404, detail = "Todo not found.")
```

## POST request

```py
# main.py
from pydantic import Field, BaseModel

class TodoRequest(BaseModel):
  title: str = Field(min_length = 3)
  description: str = Field(min_length = 3, max_length = 100)
  priority: int = Field(gt = 0, lt = 6)
  complete: bool

@app.post('/todos', status_code = status.HTTP_201_CREATED)
async def create_todo(db: db_dependency, todo_request: TodoRequest):
  todo_model = Todos(**todo_request.dict())

  db.add(todo_model) # makes database ready for the specified action
  db.commit() # executes the action
```

## PUT request

```py
# main.py

@app.put("/todos/{todo_id}", status_code = status.HTTP_204_NO_CONTENT)
async def update_todo(db: db_dependency,
                      todo_request: TodoRequest,
                      todo_id: int = Path(gt = 0)):
                      # Notice the path parameter should be the last handler parameter

  todo_model = db.query(Todos).filter(Todos.id == todo_id).first()

  if todo_model is None:
    raise HTTPException(status_code = 404, detail = "Todo not found.")

  todo_model.title = todo_request.title
  todo_model.description = todo_request.description
  todo_model.priority = todo_request.priority
  todo_model.complete = todo_request.complete

  db.add(todo_model)
  db.commit()
```

> Make sure you use the same `todo_model` retrieved from the databasew. This is because SQLAlchemy will automatically know that this is the todo within the database. Otherwise, if you create a new todo object in your code, SQLAlchemy will suppose you are creating a new todo and it will auto increment the ID, which is not what you want in a `PUT` request.

## DELETE request

```py
# main.py

@app.delete("/todo/{todo_id}", status_code = status.HTTP_204_NO_CONTENT)
async def delete_todo(db: db_dependency, todo_id: int = Path(gt = 0)):
  todo_model = db.query(Todos).filter(Todos.id == todo_id).first()

  if todo_model is None:
    raise HTTPException(status_code = 404, detail = "Todo not found.")

  db.query(Todos).filter(Todos.id == todo_id).delete()
  db.commit()
```

# Authentication & Authorization (+ Routers)

This is where you get to improve upon the structure of your project a bit more. You are going to use **routers** now. Your `main.py` file is no longer going to hold API endpoints, but just routers to different resources. Go on and create a new folder in your project and call it `routers`. Inside this folder, create an `auth.py` file.

```py
# /routers/auth.py

from fastapi import APIRouter

router = APIRouter()

@router.get("/auth/")
async def get_user():
  return {"user": "authenticated"}
```

Then, back in your `main.py` file:

```py
from routers import auth, todos
from fastapi import FastAPI

# code from before:
app = FastAPI()
models.Base.metadata.create_all(bind = engine)

# add new code:
app.include_router(auth.router)
app.include_router(todos.router)

# Other code related to todos endpoints
```

You then need to take the code related to todos endpoints in put it in a separate file `todos.py` in your `routers` folder:

```py
# /routers/todos.py
from fastapi import APIRouter
# All imports related to todos endpoints

router = APIRouter()

# Code related to todos endpoints
@router.get("/todos")
# and so on...
```

You are now left with a minimal `main.py` file with your routes separated in different files related to each resource.

You are now going to run your server:

```
uvicorn main:app --reload
```

Since we are now going to add another table to the database and SQLAlchemy on its own is not capable of enhancing the already existing database, you can delete the `todos.db` file so it will be created fresh with new models. But before that, go into your `models.py` file to add new models:

```py
# models.py
from database import Base
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey

class Users(Base):
  __tablename__ = "users"

  id: Column(Integer, primary_key = True, index = True)
  email = Column(String, unique = True)
  username = Column(String, unique = True)
  first_name = Column(String)
  last_name = Column(String)
  hashed_password = Column(String)
  is_active = Column(Boolean, default = True)
  role = Column(String)


class Todos(Base):
  __tablename__ = 'todos'

  id: Column(Integer, primary_key = True, index = True)
  title: Column(String)
  description: Column(String)
  priority: Column(Integer)
  complete: Column(Boolean, default = False)
  owner_id: Column(Integer, ForeignKey("users.id"))
```

Now go on and spin up your server again:

```
uvicorn main:app --reload
```

## Authentication endpoints

### Creating a user (+ password hash)

To be able to implement password hashing, you need some dependencies: `passlib` and `bcrypt`:

```
pip install passlib
pip install bcrypt==4.0.1
```

Now in your `auth.py` file:

```py
# /routers/auth.py
from fastapi import APIRouter
from pydantic import BaseModel
from models import Users
from starlette import status
from passlib.context import CryptContext

router = APIRouter()

bcrypt_context = CryptContext(schemes = ["bcrypt"], deprecated = "auto")

class CreateUserRequest(BaseModel):
  username: str
  email: str
  first_name: str
  last_name: str
  password: str
  role: str


@router.post("/auth", status_code = status.HTTP_201_CREATED)
async def create_user(create_user_request: CreateUserRequest):
  # This code will not work in this case, since we are going to need hashed_password instead of password
  # create_user_model = Users(**create_user_request.dict())

  # Instead:
  create_user_model = Users(
    email = create_user_request.email,
    username = create_user_request.username,
    first_name = create_user_request.first_name,
    last_name = create_user_request.last_name,
    role = create_user_request.role,
    hashed_password = bcrypt_context.hash(create_user_request.password),
    is_active = True,
  )
```

You now need to save the new user data in the database. To do this, you need to get you database dependency once again. Go on and get it from your other router file and copy it here in your `auth.py` file:

```py
# /routers/auth.py
# Remember to import what you need for this code
def get_db():
  db = SessionLocal()

  try:
    yield db
  finally:
    db.close()

db_dependency = Annotated[Session, Depends(get_db)]
```

Then your route handler will be updated as:

```py
@router.post("/auth", status_code = status.HTTP_201_CREATED)
async def create_user(db = db_dependency, create_user_request: CreateUserRequest):

  create_user_model = Users(
    email = create_user_request.email,
    username = create_user_request.username,
    first_name = create_user_request.first_name,
    last_name = create_user_request.last_name,
    role = create_user_request.role,
    hashed_password = bcrypt_context.hash(create_user_request.password),
    is_active = True,
  )

  db.add(create_user_model)
  db.commit()
```

### Authenticate a user

To enable users to get authenticated in your system, you first need to define an endpoint where this is going to be processed:

```py
# routers/auth.py

@router.post("/login")
async def login():
  return token
```

To be able to get user input for this part, you are going to need a python package called `python-multipart`. So in your activated virtual environment:

```
pip install python-multipart
```

We can now submit forms to our application, but we're are not going to use a normal FastAPI form. Instead, we use "OAuth to password request form". It is a special kind of form that is slightly more secure and will have its own portal on Swagger. Now go on and import in your `auth.py` file:

```py
from fastapi.security import OAuth2PasswordRequestForm
```

You can now use it with dependency injection for your API endpoint, and then check your database to see if user exists and if the submitted credentials match:

```py
def authenticate_user(username: str,
                      password: str,
                      db):
    user = db.query(Users).filter(Users.username == username).first()

    if not user:
      return False

    if not bcrypt_context.verify(password, user.hashed_password):
      return False

    return user

@router.post("/login")
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
                db: db_dependency):

    user = authenticate_user(form_data.username, form_data.password, db)

    if not user:
      return "Failed authentication"

    return 'Successful authentication'
```

Now swagger will request information for this endpoint.

Now we actually need to create and sign a JWT and return it to the user. To be able to create a JWT you are going to need another package:

```
pip install "python-jose[cryptography]"
```

Then import it in your `auth.py` file:

```py
from jose import jwt
```

To be able to create a JWT, you are going to need a secret and an algorithm.

You can use `openssl` CLI to generate a secret string for you:

```
openssl rand -hex 32
<!-- copy the returned secret string -->
```

Go on and add these under your router initiation in `auth.py`:

```py
# /routers/auth.py
router = APIRouter()

SECRET_KEY = "PASTE_SECRET_HERE"
ALGORITHM = "HS256"
```

The secret and the algorithm together will add a signature to the JWT to make sure the token is secure.

Go on and create another function to create the access token in your `auth.py` file:

```py
# /routers/auth.py
from datetime import timedelta, datetime, timezone

def create_access_token(username: str, user_id: int, role: str, expires_delta: timedelta):
  encode = {
    "sub": username,
    "id": user_id,
    "role": role
  }

  expires = datetime.now(timezone.utc) + expires_delta

  encode.update({"exp": expired})

  return jwt.encode(encode, SECRET_KEY, algorithm = ALGORITHM)
```

And now use it in your `/login` route handler:

```py
@router.post("/login")
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
                db: db_dependency):

    user = authenticate_user(form_data.username, form_data.password, db)

    if not user:
      return "Failed authentication"

    token = create_access_token(user.username, user.id, user.role timedelta(minutes = 20))

    return token
```

But it is a good practice to, instead of just returning the token, define a `Token` class in your `auth.py` file, and use it in your endpoint handler decorator as `response_model` which kind of means the handler's _return type_:

```py
# /routers/auth.py

class Token(BaseModel):
  access_token: str
  token_type: str


@router.post("/login", response_model = Token)
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
                db: db_dependency):

    user = authenticate_user(form_data.username, form_data.password, db)

    if not user:
      raise HTTPException(
      status_code = status.HTTP_401_UNAUTHORIZED,
      detail = "Could not validate user."
    )

    token = create_access_token(user.username, user.id, user.role, timedelta(minutes = 20))

    return {
      "access_token": token,
      "token_type": "bearer"
    }
```

## Authorize a user

When you give a user a JWT, you later need to be able to decode and verify it. Each API endpoint that needs to be protected against un-authorized users, will need to receive the JWT, decode and verify it.

For this purpose, we are goint to import `OAuth2PasswordBearer` from `fastapi.security`:

```py
from fastapi.security import OAuth2PasswordBearer
```

We would then need to implement a dependency on which protected API endpoints will rely on. We do it in the same `auth.py` file:

```py
# /routes/auth.py
from jose import JWTError

oauth2_bearer = OAuth2PasswordBearer(tokenURL = "auth/login" )

async def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]):
  try:
    payload = jwt.decode(token, SECRET_KEY, algorithms = [ALGORITHM])

    username: str = payload.get("sub")
    user_id: int = payload.get("id")
    user_role: str = payload.get("role")

    if username is None or user_id is None:
      raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED,
      detail = "Could not validate user." )

    return {"username": username, "id": user_id, "user_role": user_role}

  except JWTError:
    raise HTTPException(
      status_code = status.HTTP_401_UNAUTHORIZED,
      detail = "Could not validate user."
    )
```

**NOTE: Improve Swagger docs**

To make your Swagger docs more organized and separate endpoints related to different resources, you can add `prefix` to the router initiation:

```py
router = APIRouter(
  prefix = "/auth",
  tags = ['auth']
)
```

Now our `/login` endpoint will be accessible at `/auth/login`.

> Notice that we have already mentioned the login path in:

```py
oauth2_bearer = OAuth2PasswordBearer(tokenURL = "auth/login" )
```

So from now on, on every protected endpoint, we are first going to call this `get_current_user()` function to verify the token that is coming with the request.

## Authenticating requests

Now that you're able to authenticate a JWT coming with a request, you can use the `get_current_user()` function that you defined previously in your `auth.py` file, and get username and user ID.

### POST a new todo

For instance, in your `todos.py` file, to create a todo:

```py
# routers/todos.py

from .auth import get_current_user

# previous code
db_dependency = Annotated[Session, Depends(get_db)]

# new code
user_dependency = Annotated[dict, Depends(get_current_user)]

@router.post("/todos", status_code = status.HTTP_201_CREATED)
async def create_todo(user: user_dependency,
                      db: db_dependency,
                      todo_request: TodoRequest):
  if user is None:
    raise HTTPException(status_code = 401, detail = 'Authentication failed')

  todo_model = Todos(**todo_request,dict(), owner_id = user.get("id"))

  db.add(todo_model)
  db.commit()
```

Notice that introducing the `user_dependency` to the route handler will make Swagger provide an authentication modal for this specific endpoint in its docs. This is how your request will be authenticated via Swagger.

### GET all todos

You can now filter all todos based on the authenticated user:

```py
# /routeres/todos.py
@router.get("/", status_code = status.HTTP_200_OK):
async def get_all_todos(user: user_dependency,
                        db: db_dependency):
    if user is None:
      raise HTTPException(status_code = 401, detail = "Authentication failed")

    return db.query(Todos).filter(Todos.owner_id == user.get("id")).all()
```

### GET todo by ID

You can now get a specific todo based on the authenticated user:

```py
# /routeres/todos.py
@router.get("/todos/{todo_id}", status_code = status.HTTP_200_OK)
async def get_todo_by_id( user: user_dependency,
                          db: db_dependency,
                          todo_id: int = Path(gt = 0) ):
    if user is None:
      raise HTTPException(status_code = 401, detail = "Authentication failed")

    todo_model = db.query(Todos)
                   .filter(Todos.id == todo_id)
                   .filter(Todos.owner_id == user.get("id"))
                   .first()

    if todo_model is not None:
      return todo_model

    raise HTTPException(status_code = 404, detail = "Todo not found")
```

### PUT todo

```py
@router.put("/todos/{todo_id}", status_code = status.HTTP_204_NO_CONTENT)
async def update_todo( user: user_dependency,
                       db: db_dependency,
                       todo_request: TodoRequest,
                       todo_id: int = Path(gt = 0) ):
    if user is None:
      raise HTTPException(status_code = 401, detail = "Authentication failed")

    todo_model = db.query(Todos)
                   .filter(Todos.id == todo_id)
                   .filter(Todos.owner_id == user.get("id"))
                   .first()

    if todo_model is None:
      raise HTTPException(status_code = 404, detail = "Todo not found")

    todo_model.title = todo_request.title
    todo_model.description = todo_request.description
    todo_model.priority = todo_request.priority
    todo_model.complete = todo_request.complete

    db.add(todo_model)
    db.commit()
```

### DELETE todo

```py
@app.delete("/todo/{todo_id}", status_code = status.HTTP_204_NO_CONTENT)
async def delete_todo(user: user_dependency,
                      db: db_dependency,
                      todo_id: int = Path(gt = 0)):
  if user is None:
      raise HTTPException(status_code = 401, detail = "Authentication failed")

  todo_model = db.query(Todos)
                 .filter(Todos.id == todo_id)
                 .filter(Todos.owner_id == user.get("id"))
                 .first()

  if todo_model is None:
    raise HTTPException(status_code = 404, detail = "Todo not found.")

  db.query(Todos)
    .filter(Todos.id == todo_id)
    .filter(Todos.owner_id == user.get("id"))
    .delete()

  db.commit()
```

### Admin router

Normally, in an API, you would need an admin area. An admin area is actually a set of routes specifically designed for admin access. So go on and create a new router called `admin.py`:

```py
# /routers/admin.py

# copy these from other router files
router = APIRouter(
  prefix: "/admin",,
  tags = ["admin"]
)

def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]

# new code
@router.get("/todos", status_code = status.HTTP_200_OK)
async def get_all_todos(user: user_dependency,
                        db: db_dependency):
    if user is None or user.get("user_role") != "admin":
      raise HTTPException(status_code = 401, detail = "Authentication failed")

    return db.query(Todos).all()

@router.delete("/todos/{todo_id}", status_code = status.HTTP_204_NO_CONTENT)
async def delete_todo(user: user_dependency,
                      db: db_dependency,
                      todo_id: int = Path(gt = 0)):

    if user is None or user.get("user_role") != "admin":
      raise HTTPException(status_code = 401, detail = "Authentication failed")

    todo_mode = db.query(Todos)
                  .filter(Todos.id == todo_id)
                  .first()

    if todo_model is None:
      raise HTTPException(status_code = 404, detail = "Todo not found")

    db.query(Todos).filter(Todos.id == todo_id).delete()
    db.commit()
```

Then go back to your `main.py` to include the new router:

```py
# main.py
from routers import auth, todos, admin

# code from before...

# new code
app.include_router(admin.router)
```

# Production database

## FastAPI-Postgresql connection

Create a directory for your project. Then create and activate a virtual environment for your project. Select The VC code's Python interpretter if necessary. To be able to setup Postgresql database connection and interact with it you are goin to need `psycopg2-binary` package:

```
pip install psycopg2-binary
```

Now back to your `database.py` file:

```py
# database.py

SQLALCHEMY_DATABASE_URL = "postgresql://[postgres]:[hotb]@[localhost]/[todos-db-py]"
# remove "[]"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
# Notice the "connect_args" property is removed since it is not needed for postgresql

SessionLocal = sessionmaker(autocommit = False, autoflush = False, bind = engine)

Base = declarative_base()
```

## Alembic data migration

Alembic is used with SQLAlchemy as a database migration tool. Alembic provides the creation and invocation of change management scripts. This allows you to create migration environments and change data the way you like.

To install Alembic you can do:

```
pip install alembic
```

Once installed, you now have access to some commands:

```bash
alembic init [folder-name]
# initializes a new, generic environment

alembic revision -m [message]
# creates a new revision of the environment
# this is where you can write your database scripts to change and migrate your database
# this command will create a revision with a specific ID

alembic upgrade [revision-id]
# runs migration and upgrades your database

alembic downgrade -1
# downgrade database to previous state before the applied migration
```

After initializing Alembic, you will notice two items appear in your project's directory:

1. `alembic.ini`: Alembic looks for this file when it is invoked. Contains configuration information for Alembic that we can change to match them with our project.
2. `alembic/` directory: Contains all the environmental properties for alembic. Holds all the revisions of your application.

### Using Alembic

After installing Alembic and initiating it, go on into the `alembic.ini` file in your project and find the line where `sqlalchemy.url` configuration is listed, and update it as:

```
sqlalchemy.url = sqlit:///./todos.db
```

Just take the same URL you used in your `database.py` file.

Next, go into your `alembic/env.py` file and import your models:

```py
import models
```

Then in the same file, find this code:

```py
if config.config_file_name is not None:
  fileConfig(config.config_file_name)
```

Go on and remove the condition check:

```py
fileConfig(config.config_file_name)
```

Next, find the comment saying "add your model's MetaData object here".

```py
# since you imported "Base" at the top of this file, you can:
target_metadata = models.Base.metadata
```

Go on and create a migration script in the terminal:

```
alembic revision -m "create phone_number column for user table"
```

This will create a file in your `/alembic/versions/` directory. The filename starts with an ID and then followed by the revision message your provided in the command above. Within this file, you are going to see the file ID and some imports that are needed for writing migration scripts. There are also two python functions called `upgrade` and `downgrade`. Implement this code:

```py
def upgrade() -> None:
  op.add_column("users", sa.Column("phone_number", sa.String(), nullable = True))

def downgrade() -> None:
  pass
```

Go on and apply the migration by, first stopping your server, and then applying the migration:

```
alembic upgrade [migration-id]
```

Then run your server again.

If you have not yet updated your User model, you can now go into your `models.py` file and update the model definition for users:

```py
class User(BaseModel):
  # previous properties
  phone_number = Column(String)
```

# FastAPI real-world project setup

## Create `main.py`

Create a file that will act as your project's entrypoint:

```py
from routers import auth, todos
from fastapi import FastAPI

# Create fastapi application
app = FastAPI()

# Setup and establish database
models.Base.metadata.create_all(bind = engine)

# Include routers
app.include_router(auth.router)
app.include_router(todos.router)
```

## Routers

To implement routers, you should conventionally create a `routers` folder in your project root. Then for each resource (for example, todos) you will have a separate file:

```py
# /routers/todos.py
from fastapi import APIRouter
# All imports related to todos endpoints

router = APIRouter()

# Todos endpoints
@router.get("/todos")
# And so on...
```

## Database setup

In your project root, create a `database.py` file which will hold your database connection setting:

```py
# database.py
```

[later...]
