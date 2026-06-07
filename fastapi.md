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

## POST handlers

This is the POST handler we have had until this point.

```py
@app.post("/books")
async def create_new_book(new_book = Body()):
  return Books.add(new_book)
```

The problem with this is that the data that comes with the request body should first be validated and then be used to create a new book in the database.

### Validation with Pydantic

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

#### Populating Swagger example data with pydantic

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

# FastAPI real-world project setup

Create a directory for your project. Then create and activate a virtual environment for your project. Select The VC code's Python interpretter if necessary.

[later...]
