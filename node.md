- [**Back-end theory**](#back-end-theory)
  - [**How the web works**](#how-the-web-works)
  - [**Web server**](#web-server)
    - [**HTTP server**](#http-server)
      - [**Routing**](#routing)
        - [**_Query_**](#query)
      - [**Static web server**](#static-web-server)
      - [**Dynamic web server**](#dynamic-web-server)
      - [**API**](#api)
        - [**REST architecture**](#rest-architecture)
        - [**_JSON_**](#json)
  - [**MVC architecture**](#mvc-architecture)
    - [**MVC in an Express application**](#mvc-in-an-express-application)
- [**Introduction to NodeJS**](#introduction-to-nodejs)
  - [**NodeJS advantages**](#nodejs-advantages)
  - [**Node architecture**](#node-architecture)
    - [**Threads, the thread pool, and the event loop**](#threads-the-thread-pool-and-the-event-loop)
      - [**The thread pool**](#the-thread-pool)
      - [**The event loop**](#the-event-loop)
      - [**The event-driven architecture**](#the-event-driven-architecture)
  - [**Environment variables**](#environment-variables)
    - [**Environment variables and Express**](#environment-variables-and-express)
  - [**Running JavaScript outside the browser**](#running-javascript-outside-the-browser)
    - [**Interacting with Node in Terminal**](#interacting-with-node-in-terminal)
    - [**Creating a Node application**](#creating-a-node-application)
  - [**Introduction to NodeJS modules**](#introduction-to-nodejs-modules)
    - [**The `require` mechanism**](#the-require-mechanism)
    - [**NodeJS module types**](#nodejs-module-types)
      - [**1. Core modules**](#1-core-modules)
      - [**2. Our own modules**](#2-our-own-modules)
        - [**Different ways of exporting**](#different-ways-of-exporting)
      - [**3. 3rd-Party modules**](#3-3rd-party-modules)
        - [**Installing 3rd-party modules**](#installing-3rd-party-modules)
      - [**Package versioning and updating**](#package-versioning-and-updating)
  - [**NodeJS core and 3rd-party modules**](#nodejs-core-and-3rd-party-modules)
    - [**Process module**](#process-module)
    - [**Dotenv module**](#dotenv-module)
    - [**FS module**](#fs-module)
      - [**Reading files**](#reading-files)
      - [**Writing files**](#writing-files)
    - [**HTTP module**](#http-module)
      - [**Creating a web server**](#creating-a-web-server)
      - [**Methods for sending response**](#methods-for-sending-response)
        - [**Standard HTTP response headers**](#standard-http-response-headers)
    - [**URL module**](#url-module)
      - [**Inspecting the request URL**](#inspecting-the-request-url)
      - [**Parse URL parameters**](#parse-url-parameters)
    - [**Slugify module**](#slugify-module)
      - [**Using slugify**](#using-slugify)
    - [**Nodemon module**](#nodemon-module)
  - [**Streams**](#streams)
    - [**Streams in practice**](#streams-in-practice)
      - [**The best solution**](#the-best-solution)
  - [**HTML templating**](#html-templating)
    - [**Implementing placeholders**](#implementing-placeholders)
      - [**Placeholders for templating unknown amount of data**](#placeholders-for-templating-unknown-amount-of-data)
    - [**Replacing placeholders**](#replacing-placeholders)
- [**Express framework**](#express-framework)
  - [**Middleware and request-response cycle**](#middleware-and-request-response-cycle)
    - [**Implementing middleware**](#implementing-middleware)
  - [**Starting a server**](#starting-a-server)
  - [**Defining routes**](#defining-routes)
    - [**Implementing Routers and mounting**](#implementing-routers-and-mounting)
  - [**Methods on response**](#methods-on-response)
  - [**Responding to URL parameters**](#responding-to-url-parameters)
    - [**Optional parameter**](#optional-parameter)
  - [**Popular middleware**](#popular-middleware)
    - [**Body parser**](#body-parser)
    - [**Param middleware**](#param-middleware)
    - [**Static**](#static)
    - [**Morgan**](#morgan)
  - [**Creating custom middleware**](#creating-custom-middleware)
  - [**Express regular workflow**](#express-regular-workflow)
- [**Database**](#database)
  - [**MongoDB**](#mongodb)
    - [**MongoDB key features**](#mongodb-key-features)
    - [**MongoDB BSON vs Relational Database**](#mongodb-bson-vs-relational-database)

# **Back-end theory**

## **How the web works**

Everything starts from the URL bar of our browsers. When we type a URL in our browser, we are actually requesting some data from a server on which our intended website is hosted. The server will then respond to our request, and the response will contain the webpage that we requested. This process is called the **request-response model** or the **client-server architecture**. This is the fundamental concept of the whole web. But let's look deeper into this.

Every URL (imagine `https://www.google.com/maps`) has its HTTP or HTTPS, which is the **protocol** used for the connection. The URL also contains the **domain name** which is `google.com`. It also has the **resource** name at the end `/maps`. The domain name is not the actual address of the server that we are trying to access. It is actually a name by which we can find the real **IP address** through **DNS lookup**.

So here are the 5 steps involved in a request-response cycle:

1. When we request a URL in the browser, the browser makes a request to a **DNS**. This special server will find the real IP address that matches the web address we typed in the URL bar of our browser. This happens through our **ISP**. The real IP address (something like `https://216.58.211.206:443`) is returned to our browser, and our browser will call it. This URL now contains, again, the protocol, the **IP address** and the **port number**. Remember that this port number is not about the resource that we request.
2. A **TCP/IP** socket connection is established between the server and the client. This is a 2-way connection that will remain live until all the files of the website are transferred. TCP stands for **Transmission Control Protocol**, and IP stands for **Internet protocol**. Together, they are **communication protocols** that define how data should travel across the web.

   - The job of TCP is to break the request/response into thousands of small chunks called packets before they are sent. Once these chunks arrive at their destination, TCP will re-assemble them into the original request/response. This makes the travel happen as fast as possible.
   - The job of IP is to send and route all of the packets through the internet. It ensures that all of them arrive at a specific destination, using IP addresses on each packet.

3. Our **HTTP request** is sent to the server through the TCP/IP connection. HTTP stands for **Hyper-Text Transfer Protocol**. So this is yet another communication protocol. A communication protocol is a set of rules that allows two or more parties to communicate. In the case of HTTP, it is a protocol that allows clients and web servers communicate by sending request and response messages. We also have HTTPS. It is basically the same as HTTP, but it is **encrypted** using **TLS** or **SSL**. This is how a request message looks like:

```js
Get /maps HTTP/1.1 // start line: HTTP method + request target + HTTP version
// -------------------- request headers
Host: www.google.com
User-Agent: Chrome/4.7
Accept-Language: en-US
// ------------------------------------
<BODY>
```

> **_Note_** | We, as developers, don't write these requests. However, it is important to know about them.

> **_Note_** | There are many different types of HTTP methods. The most common ones are: GET, POST, PATCH, DELETE, etc.

- The **request target** is what tells the server which resource we are asking. If the resource part of the URL is left empty, we will be leaded towards the website's root, which would be the homepage.

- **Request headers** are some information that we send along with the request to the server. There are many different headers available.

- **Request body** would also be available if we are sending some data to the server, for example, from an HTML form.

4. Once the request hits the server, the server will start working on it and when the results are ready, it will send them back as a **HTTP response**. The HTTP response message is quite similar to the HTTP request:

```js
HTTP/1.1 200 OK // start line: HTTP version + status code + status message
// -------------------- request headers
Date: Fri, 18 Jan 2021
Content-Type: text/html
Transfer-Encoding: chunked
// ------------------------------------
<BODY>
```

- **Response headers** are actually written by backend developers and sent in the response.

- **Response body** is also written and sent by backend developers. The body should usually contain the HTML of the website, or JSON data of an API.

> **_Note_** | in reality, when we request a website, there will be lots of requests and responses between the server and the client. The first request will get responded by the initial HTML file. This file will get scanned for assets like JavaScript files, CSS files, images, etc. For each of these assets the browser will make a new HTTP request to the server. So the request-reponse cycle happens for every single file in the website. These requests can be inspected in the **Chrome dev tools**, on the **Network tab**.

> **_Note_** | multiple responses can happen at the same time, but the amount is limited, since it can slow down the connection.

5. When all the files have arrived at the client, the website is rendered according to the HTML, CSS, and JavaScript code.

## **Web server**

A web server is actually a computer connected to the internet. This server stores the files of a website (HTML, CSS, JavaScript, images, etc.), and runs a **HTTP server**. It can also include a web application. There are 2 types of servers: static and dynamic.

### **HTTP server**

A HTTP server is an application capable of understanding URLs, listening to requests and delivering responses. It is the HTTP server that communicates with the browser through requests and responses. So it acts as the bridge between the frontend and the backend of a web application.

Once the request hits the server, an event is fired, which triggers a response from the HTTP server. The HTTP server is usually designed to respond in different ways to different request URLs (refer to [**Routing**](#routing)).

#### **Routing**

Routing basically means implementing different actions for different requests. Requests are actually composed of 2 parts: URL, and HTTP method. So we should be able to analyze the request URL and act based on it.

In huge applications, routing can become very complicated, and for these situations, we might use a NodeJS library called [**Express**](#express-framework).

For simpler routing in practice projects we can use NodeJS itself and also the [**URL**](#url-module) core module, which enables us to analyse the request URL.

##### **_Query_**

Query is a series of characters inserted into the request URL after a `?` mark, determining different parameters in the URL that can be used by the server to decide and act upon.

```
Request URL:
127.0.0.1:8000/product?id=0
```

#### **Static web server**

A static web server only includes website **static files** and a **HTTP server**. It is only capable of serving these static files to the client via HTTP. So the content of the files, and therefore what is rendered on the page is the same whenever you go to the website. A static web server is all you need if you want to host a simple website. However, to create dynamic web applications that interact with databases, we should use a **dynamic web server**.

#### **Dynamic web server**

In websites that are backed by a dynamic web server, we no longer have static frontend files. Instead, we have some templates that will get populated with the up-to-date data coming from the server. In addition to these template files and a HTTP server, a dynamic server also includes a **web application**. All these three parts interact with each other and provide dynamic contents based on interaction with a **database**. NodeJS is capable of establishing a dynamic web server.

In dynamically rendered wesites (also called **server-side rendered**), frontend files are generated dynamically on the server-side based on some templates, so the website is actually built on the server-side. Once front-end files are made ready according to the exact data received from the server, they will then be sent to the browser just to be rendered.

#### **API**

API stands for **Application Programming Interface**. An API is a service from which we can request some data. It is a piece of software that can be used by another piece of software to allow applications to talk to each other.

The word **application** in API can include many things such as:

- NodeJS `fs` or `http` APIs, also known as Node APIs
- Browser's DOM API
- Methods exposed to the public in OOP
- Web APIs

API-powered websites have an API (a dynamic server) on the backend that provides some data usually in the **JSON** format. Instead of generating frontend files on the server-side based on template files, the JSON data is directly sent to the browser. Once the browser receives this data, it renders the data based on the template files provided beforehand and builds the website. These websites are also called **client-side rendered**. In these systems, what is done on the backend is called _building the API_, and what is done on the frontend is called _consuming the API_.

The huge Advantage of making websites API-powered is that endless number of apps can be created to consume the same API. So we would not be limited to only one context, like the browser.

There is a popular API architecture called REST.

##### **REST architecture**

REST stands for Representational States Transfer is way of building web APIs in a logical way making them easy to consume. REST architecture is used to making the usage of the API easy and smooth.

To build a REST API we need to follow some principles:

1. Separate API into logical resources: all data that is going to be shared in the API, should be divided into logical resources. A **resource** is an object or any representation of something which has data associated to it. Any information that can be _named_ (not verb) can be a resource. Example: foods, users, reviews.
2. Expose structured, resource-based URLs: we need to expose the APIs data using some URLs that clients can send requests to. For example, `https://www.roos.com/foods` is a URL and `/foods` at the end is called an **endpoint**.
3. Use HTTP methods (verbs): endpoints should only contain resource names and not the actions that can be performed on them. The verbs or actions (CRUD) are already defined by HTTP methods.

   - `GET`: used to perform _read_ operation on data. It is usually responded with data retrieved from database. If the endpoint only contains the name of the resource, the response would contain all the data from that resource. But if a certain document is needed, usually an identifier is inserted with a `/` after the resource name. The identifier can be an ID or a name (`roos.com/foods/4`)
   - `POST`: used to perform _create_ operation. It enables the user to send data to server, so to create a document in our database. In this case no ID should be sent. The server should figure out an ID for the new document.
   - `PATCH` or `PUT`: both used to update documents. The URL should contain an identifier for the specific document that is going to be updated. With PUT, the client is supposed to send the entire updated object, but with PATCH they should only send the specific part of the document that is changed.
   - `DELETE`: used to delete a documents. The URL should contain an identifier for the specific document that is going to be deleted. Usually, users have to be **authenticated** to be able to do this request.

> **_Note_** | sometimes we need to perform operations that are not CRUD. In these cases, we should be creative with naming our endpoints. This applies to, for example, login or search operations.

> **_Note_** | REST architecture is also capable of performing CRUD operations that combine two or more resources.

4. Send Data as JSON: JSON is a very light-weight data interchange format which is heavily used by Web APIs. The JSON data is usually formatted as JSend before being sent as a response to the client. The JSend format wraps the JSON data in another object, in which `status` and `data` fields are added. The status field contains a string that informs the client whether the request was a success or not. The data field will be an object containing the JSON data in it. This is done for some security issues and is called enveloping.
1. Must be stateless: all state is handled on the client side. It means that each request must contain all the information necessary to be processed. The server should not have to remember previous requests. Example: `loggedIn` or `currentPage`.

##### **_JSON_**

JSON is a very light-weight data interchange format which is heavily used by Web APIs. The strucure in which data is written into a JSON file is very similar to a JavaScript object. The only difference is that in JSON, keys must be strings. It is also very typical for values to be strings, but they can actually be also numbers, boolean, other objects or even arrays of values.

But in order for a JSON data to be usable in JavaScript, it should first be parsed into actual JavaScript data structures.

```js
const parsedData = JSON.parse(jsonData);
```

## **MVC architecture**

MVC stands for Model, View, Controller. These are the three parts of this architecture, each assigned to hold certain functionalities.

- **Model:** concerned with everything about **application's data** and the **business logic**.

  - Business logic is all the code that solves the actual business problem. It is the code directly related to business rules, how the business should work, and business needs. For example, in a restaurant website, business logic will be concerned with creating orders, adding or removing foods from the menu, allowing users to write reviews about their orders, ensuring only authenticated users can access certain pages, etc.

- **Controller:** concerned with handling application's requests, interact with models, and send back responses to the client. All this is called **application logic**.

  - application logic is the code that is only concerned with the application implementation, not the underlying business problem that we are attempting to solve. Application logic is the logic that makes the application work. For exmaple, most of application logic is concerned with managing requests and responses. It is more about the technical stuff. Or if we have the View layer, application logic will act as a bridge between business logic and presentation logic.

- **View:** The view layer is necessary if we have a graphical interface, which is the case if we are doing frontend development or if we are building a server-side rendered website. In the last case, the view layer will contain the templates used to generate the website pages that we are going to send back to the client as response. This is called the **presentation logic**.

Using the MVC architecture allows us to write a more modular application, which makes our application easier to maintain and scale.

> **_Note_** | There is principle in MVC architecture called **fat models/thin controllers**, meaning that we should offload as myuch logic as possible to the models, and keep controllers as simple as possible.

### **MVC in an Express application**

As always, everything starts with a request. Then:

1. The request will hit one of our routers. Remember that we have one router for each resource. The goal of a router is to delegate the request to the correct handler function, which is stored in one of the controllers. We have one controller for each resource.
2. Depending on the request, the controller might need to interact with one of the models, for example, to retrieve certain documents from the database or to create a new one. And there is one model for each resource. After the interaction with the model is finished, the controller might be ready to send back a response to the client, maybe containing the data. But if we want to render a website on the server, there is one more step involved here.
3. Controller will select one of the view templates and inject the data into it. We have one view for each page.
4. The rendered website will then be sent back to the client as a response.

# **Introduction to NodeJS**

NodeJS is a **JavaScript runtime** built on Google's open-source **V8 JavaScript engine**.

- **JavaScript runtime:** when using JavaScript in a browser, the browser is the JavaScript runtime. NodeJS is another JavaScript runtime that allows us to execute JavaScript code outside of browser. It acts as an environment in which a JavaScript program can be executed.
- **V8 JavaScript engine**: Actually executes the JavaScript code in NodeJS runtime. It is where JavaScript code is parsed and executed.

Having JavaScript outside of a browser in a stand-alone environment (NodeJS), we can do things that are completely impossible when JavaScript is limited to the browser, like accessing the file system and networking capabilities. This makes NodeJS a great candidate to be used as a web server, and therefore on the server-side of web development.

## **NodeJS advantages**

1. NodeJS is **single-threaded** and based on an [**event-driven**](#the-event-driven-architecture), **non-blocking I/O model**, making it very light-weight and efficient.

   - In NodeJS `process`, which is where our application runs, there is only one single thread (i.e. where our code is executed in the machine's processor). All users accessing our application will use the same single thread. In this situation, if one user make the application run a synchronous code, all other users would have to wait until that code is done executing before they could use the application. This is why we developers use lots of asynchronous code, and therefore, callbacks in NodeJS applications in order to implement the non-blocking I/O model. In this approach, we off-load heavy tasks to background processes, so that all users can use the application at the same time, without blocking each other. After the background processes are done, specified callbacks will be called to act in the main execution thread. This is what makes NodeJS applications highly performant and scalable. However, while using lots of callbacks, we should always avoid **callback hell** using ES6 **promises** or ES8 **async/await**.

2. NodeJS is perfect for building fast and scalable data-intensive applications. Therefore, NodeJS can be used to build:

   - API with database behind it (preferably NoSQL)
   - Data streaming (like YouTube)
   - Real-time chat application
   - Server-side web application

> **_Note_** | In some cases, where the application needs to perform super heavey server-side processing, NodeJS is not a good choice. These include image manipulations, video conversion, file compression, etc. For these cases, we usually use Python, PHP, Rybu on Rails, etc.

> **_Note_** | Companies like Netflix, Uber, PayPal, Ebay, and many others have started using Node in production.

3. There is a huge library of open-source packages (NPM) available.
4. NodeJS has a very active developer community.

## **Node architecture**

The NodeJS runtime has several dependencies. But the most important ones are _V8 JavaScript engine_ and **Libuv**.

- **V8 JavaScript engine:** The V8 engine is written in JavaScript and C++. Without V8, Node would have no way of understanding JavaScript.
- **Libuv:** a C++ open-source library focused on asynchronous I/O, providing Node with access to the underlying computer operating system, file system, networking, etc. Libuv is also responsible for the implementation of the **event loop** and the **thread pool**.

  - Event loop is responsible for handling easy tasks, like executing callbacks and network I/O.
  - Thread pool is for more heavy work, like file access or compression etc.

* **HTTP-Parser**
* **c-ares:** for DNS request stuff.
* **OpenSSL:** for cryptography.
* **Zlib:** for compression.

Therefore, NodeJS is actually written in both JavaScript and C++, but it enables a nice layer of abstraction, so that we developers would be able to write Node applications in pure JavaScript.

### **Threads, the thread pool, and the event loop**

When we use Node on a computer, it means that there is a Node **process** running on that computer. A process is a program in execution. Actually, in Node, we have access to a `process` variable. In this process, NodeJS runs in a **single thread** (i.e sequence of instructions). We can think of a thread as a box where our code is executed in a computer's processor. Since Node runs in a single thread regardless of the number of users, it is very easy to block this thread.

In other languages like PHP running on an Apache server, a new thread is created for each user. This would be a very resource-intensive solution, but it eliminates the risk of blocking the execution thread.

Here are the steps involved when we start a Node application:

1. **Top-level code**, which is all the code not inside any callback function is executed.
2. All the required **modules** are actually imported.
3. Event **callback functions** are registered.
4. Finally, the **event loop** starts running. Event loop is where most of the work is done in a Node application. However, some tasks are too heavy to be executed in the event loop, and they will block the event loop. This is where the thread pool comes in.

#### **The thread pool**

Thread pool gives us 4 additional threads completely separated from the main single thread. We can configure it up to 128 threads, but usually 4 is enough. The event loop automatically offloads heavy tasks to the thread pool. Heavy tasks that are usually offloaded to the thread pool include:

- File system APIs
- Cryptography
- Compressions
- DNS lookups

#### **The event loop**

This is where all the application code that is inside **callback functions** run. Some of these codes might get offloaded to the thread pool, but that decision is up to the event loop.

Since the event loop is actually the beating heart of a Node application, and considering the fact that the event loop is responsible for executing code inside callback functions, then we can say the NodeJS is built around callback functions. This is becasue Node uses an [**Event-driven architecture**](#the-event-driven-architecture): events are emitted (for example, for HTTP requests, timers expired, files finished reading), event loop picks them up, and then callbacks are called. Event loop kind of **orchestrates** everything.

The event loop has multiple **phases** and each phase has a **callback queue**. Here the 4 most important phases of the event loop:

1. **Expired timer callbacks:** if there are callback functions attached to timers that just expired, like `setTimeout()`, these are the first ones to be processed by the event loop. If a timer expires later during the time when other phases of the event loop are in progress, then its callback would have to wait until the event loop returns to this phase again. It works like this in all 4 phases.
2. **I/O polling and callbacks:** polling means looking for new I/O events that are ready to be processed and putting them into the callback queue. In the context of a Node application, I/O is related to stuff like networking and file access. Most of our code will probably get executed in this phase.
3. **`setImmediate` callbacks:** `setImmediate` is a special type of timer that we can use if we want to process callbacks immediately after the I/O polling phase.
4. **Close callbacks:** in this phase, all close events are processed, for instance, when a web server shuts down. At this stage, the even loop checks whether there are any expired timers (at phase 1) or any I/O task pending, and if there are not any, it will simply exit the program. But if there are any, it will go on to the next cycle and start from the related phase.

Besides the callback queues of the four phases mentioned above, there are 2 other queues. If there are any callbacks in any of these two queues, they would be executed right after the current phase of the event loop, instead of watining for the next entire cycle of the event loop.

- **`process.nexttick()` queue:** `process.nexttick()` is a function that we can use when we really need to execute a certain callback right after the current event loop phase.
- **Other microtasks queue:** mainly for resolved promises

**_In conclusion:_** The event loop is what makes asynchronous programming possible in NodeJs. It takes care of all incoming events and orchestration by offloading heavy tasks to the thread pool. We also need the event loop, becasue a Node application runs in a single thread. This makes Node so light-weight and scalable, but at the same time it has the risk of blocking the single thread. As a NodeJS developer, it is your responsibility to avoid blocking the event loop. Here are a few guidelines on how to achieve that:

- Don't use the **synchronous** version of functions in `fs`, `crypto`, and `zlib` modules in callback functions. Remember that it is ok to use synchronous code as top-level code, since it is executed before event loop starts.
- Don't perform complex calculations, for instance, loops inside loops.
- Be carefu with JSON in large objects.
- Don't use too complex **regular expressions**, for instance, nested quantifiers.

#### **The event-driven architecture**

In NodeJS there are special objects called **Event emitters** (instances of the `EventEmitter` class). These objects emit named events when important things happen (like a request hitting the server, or a timer expiring, or a file finished reading) in a Node application. These events can then be picked up by event listeners that we developers set up with callback functions. The event listeners will react to the named events by calling the callback functions we defined.

> **_Note_** | The event emitter logic is called the **observer pattern** in JavaScript programming in general. It is a popular pattern with many use cases. The idea is that there is an **observer**, which is the event listener, that will observe the subject that is going to emit an event. The opposite of this pattern includes functions calling other functions. The benefit of this pattern is that everything is more **de-coupled**. Otherwise, for instance, functions from the `fs` module would call functions from the `http` module. Instead, these modules are de-coupled and self-contained, each emitting events that other functions even from other modules can respond to. The pattern also makes it easy to react to the same event multiple times. We would only have to set up multiple listeners.

## **Environment variables**

NodeJS or Express applications can run in different environments. The most important ones are **development** and **production** environments. Based on the environment, we might use different databases, or turn logging on or off, or activate debugging or such stuff. These different settings will be based on environment variables. So environment variables are **global variables** that are used to define the environment in which the application is running.

By default, [Express](#express-framework) sets the environment to development. We can take a look at it:

```js
console.log(app.get("env")); // development
```

NodeJS itself sets a lot of environment variables:

```js
console.log(process.env);
```

These environment variables are accessible in any file, and they come from the [**Process**](#process-module) core module.

### **Environment variables and Express**

Many packages in Express depend on an environment variables called `NODE_ENV`. It is a conventional name for a variable that should determine in which environment the application is currently running.

However, Express does not define this variable automatically. We have to do it manually. We have 2 ways of doing this:

1. **Using the terminal:** just as we start our application using a command like `nodemon server.js`, we should prepend the variable and its value to the command in the terminal:

```
NODE_ENV=development nodemon server.js
```

> **_Note_** | this solution seems not to work on Windows

2. **Create a configuration file:** we create a file called `config.env` in the root directory of our project. In this file we can store any environment variables we need:

```
NODE_ENV=development
PORT=3000
USERNAME=omid
PASSWORD=12345
```

To connect this config file to the NodeJS application, we use the [**dotenv**](#dotenv-module) module. We should install it using NPM:

```
npm install dotenv
```

and then require it, usually, in the `server.js` file since that is where we deal with environment variables.

```js
const dotenv = require("dotenv");
```

Then to establish the connection we use the `config()` method on the `dotenv` object. The method accepts an object in which we should define the `path` variable and set it to the directory of the `config.env` file.

```js
dotenv.config({ path: "./config.env" }); //EXTREMELY IMPORTANT: this connection should be established before requiring app.js into server.js

const app = require("./app");
```

This will finally read our variables from the config file and save them into NodeJS environment variables. So these variables will also be accessible from any file without having to require or define anything anywhere.

> **_Note_** | it is a convention to use all uppercase variable names.

> **_Note_** | in order to add some syntax highlighting to the config file text, you can install a VS Code extension called **dotENV**.

> **_Note_** | we usually use environment variables as configuration settings for our application. For stuff that might change based on the environment, we might add variables environments. We might also store some sensitiv data like passwords and usernames using environment variables in the config file.

## **Running JavaScript outside the browser**

NodeJS, as a JavaScript runtime, actually enables us to run JavaScript outside the browser. So we are no longer limited to the browser as JavaScript runtime.

### **Interacting with Node in Terminal**

In order to start working with Node in the terminal (VS Code) we use the `node` command in the termina. This will open Node REPL (Read, Eval, Print, Loop).

```
node
```

This enables us to write normal JavaScript code in the terminal.

For instance, we can define a variable:

```
const name = 'omid'
```

Then we can retrieve the value of this variable by writing its name:

```
name
```

We can also do any type of expression:

```js
7 + 3; //returns 10
```

We can use `_` as a variable that holds our last numeric result. For instance, after the calculation example above, `_` holds 10.

To exit REPL, there are different ways. We can use `.exit` command or press `Ctrl+d`.

```
.exit
```

By pressing the Tab key on the keyboard, Node lists all the global variables that are available. We can also see `fs` and `crypto` in this list, which are two important Node modules.

Also, by pressing the Tab key after writing a constructor function like `String.` in the terminal, a list of methods available on this constructor will be printed.

### **Creating a Node application**

We create a JavaScript file where we then write some JavaScript code. In order to execute this JavaScript file, we need to type the `node` command in the terminal, and after that, write the name of the file that we want to execute.

**`index.js`:**

```js
const hello = "Hello world";
console.log(hello);
```

**Terminal**:

```
node index.js
```

After the file is executed, the execution process is stopped, simply because there is nothing left to run in this file. It is the event loop that decides to shut down the application after executing all there is to execute. (refer to [event loop](#the-event-loop).)

## **Introduction to NodeJS modules**

In a NodeJS module system, each JavaScript file is treated as a module. NodeJS uses the **CommonJS** module system which does the import/export operations using `require()`, `exports.`, and `module.exports` syntax.

### **The `require` mechanism**

First remember that in NodeJS, every single JavaScript file is treated as a module.

When we use the `require()` function to require a module, a couple of steps happen:

1. Path to the required module is resolved and the file is loaded. In order to decide which module should be loaded, Node takes a few steps:

   - When the require function receieves the module's name, it will first try to load a core module with that name. It will automatically find the path to that module and then load it.
   - If the path starts with `./` or `../` it means that it is a relative path to a developer module, so Node will try to load that.
   - If there is no file with that name (remember that we don't write the `js` extention at the end of file name), Node will try to find a folder with `index.js` and load it.
   - Finally, if the required module is neither a core nor a developer module, Node will assume it is a module from NPM and go to `node_modules/` path and try to find the module there.
   - If the module cannot be found anywhere, an error is returned and the execution of our application will stop.

2. Wrapping: after the module is loaded, it will be wrapped in an IIFE that will provide us access to a couple of special objects.

```js
(function (exports, require, module, __filename, __dirname) {
  // argument [require]: function to require other modules
  // argument [module]: reference to the current module
  // argument [exports]: reference to module.exports, used to export object from a module
  // argument [__filename]: abs path of the current module's file
  // argument [__dirname]: directory name of the current module
  // -----------------------------------------------------
  // module code lives here
});
```

We can prove the existence of this wrapper function by inspecting the `arguments` in any module. So we would be able to see the 5 arguments of the wrapper function:

```js
console.log(arguments);
```

We can also inspect the wrapper function in the console in any module. To do this we should require the `module` module, and look at the `wrapper` property.

```js
console.log(require("module").wrapper);
```

This has two advantages: first, important objects like `require` are accessible in all modules. Second, all top-level variables in each module remains private and scoped only to the current module.

3. Executing the module's code: code put in the modules wrapper function is executed.
4. Returning exports: the `require` function returns **exports** of the required module as the `module.exports` object. Refer to [different ways of exporting](#different-ways-of-exporting) from a module.
5. The entire module gets cached. If you require the same module multiple times, you will always get the same result. The code in the module is only executed in the first call. In subsequent calls the results are retrieved from cache.

The `require()` function is not a native JavaScript function. So how do we have access to it all over our Node application?

### **NodeJS module types**

#### **1. Core modules**

these are modules that are already installed on NodeJS and we can use them simply by requiring them into a script file.

```js
const <variable-name> = require('<module-name>');
```

#### **2. Our own modules**

Every single JavaScript file in a NodeJS application is treated as a module. Modules are used in NodeJS to export functionalities from one module and import them into another module.

##### **Different ways of exporting**

- **`module.exports`:** If you want to export only one single variable, like one class or one function, you can use this syntax:

```js
// Exporting from 'module-1.js'
module.exports = (argument) => {
  // function expression code
};
```

To import, we actually import the whole module into another file, and give it a name there. We then have acceess to what this module returns on that variable.

```js
const variable1 = require("./<module-path>");
```

- **`exports.`:** If you want to export multiple named variables, like multiple functions, you can add them as properties to the `exports` object. you can use this syntax:

```js
exports.variableName1 = (argument) => {
  //function expression code
};

exports.variableName2 = (argument) => {
  //function expression code
};
```

To import, we actually import the whole module into another file, and give it a name there. We then have access to each of these variables as properties on that variable.

```js
const variable2 = require("./<module-path>");

variable2.variableName1(argument);
variable2.variableName2(argument);
```

We can also use **destructuring** as we rqeuire the module.

#### **3. 3rd-Party modules**

These are modules that are not installed on NodeJS by default. We can use these modules either as **regular dependencies** or **development dependencies**.

- Regular dependencies are a package of code upon which we build our own application, and our application needs it to work. For example, [Express](#express-framework) is a regular dependency.
- Development dependencies are packages that we use to make the development process easier. For example, [Nodemon](#nodemon) is a dev dependency. Our application does not rely on this type of package to run correctly.

##### **Installing 3rd-party modules**

In order to be able to install and use NPM packages, we should first initialise NPM using this command in the terminal:

```
npm init
```

This will create a file called `package.json`, containing information about our project, including the list of dependencies. After this, to install a regular dependency in NPM, we use this command in the terminal:

```
npm install <package-name>
```

To install a dev dependency in NPM, we use the `--save-dev` flag in the regular NPM installation command:

```
npm install <package-name> --save-dev
```

> **_Note_** | the two types of installation mentioned above are also called **local** installations, as opposed to **global** installations. In order to use some locally installed packages we need to insert some script into our `package.json` file. However, globally installed packages does not need this. They can simply run from the terminal.

To install a dev dependency **globally** in NPM, we use the `--global` flag in the normal NPM installation command. This type of installation is usually used for packages that are not specific to one single project, instead, it is to be used in all projects. _Nodemon_ is one of these packages.

```
npm install <package-name> --global
```

> **_Note_** | development dependencies are often installed globally.

After installing the 3rd-party module, we would have to `require` it into any file where we need it.

```js
const <variable-name> = require('<module-name>');
```

#### **Package versioning and updating**

[empty]

## **NodeJS core and 3rd-party modules**

### **Process module**

**`core`**

This module sets a lot of variable environments for NodeJS. This core modules does not even need to be required into any file. We have access to it everywhere. We can take a look at the environment variables it sets:

```js
console.log(process.env);
```

### **Dotenv module**

**`3rd-party`**

Used to connect a `config.env` file to the Node application. Refer to [environment variables](#environment-variables).

### **FS module**

**`core`**

This core module allows us to interact with files in the file system using a Node application.

In order to use FS module in a Node application, we first need to `require` it in a specific JavaScript file.

```js
const fs = require("fs");
```

#### **Reading files**

In order to read files with the FS module, we can use two FS functions:

**`.readFileSync()`**: this is the synchronous version of FS reading functionality.

- Accpets two arguments:

  1. Path to the file that is going to be read.
  2. Character encoding of the file: this is usually `utf-8` if the file only contains english language characters.

- Returns the content of the file.

```js
const textIn = fs.readFileSync("./txt/input.txt", "uft-8");
```

**`.readFile()`**: this is the asynchronous version of FS reading functionality.

- Accpets two arguments:

  1. Path to the file that is going to be read.
  2. Character encoding of the file.
  3. Callback function: has access to two arguments.

     - error
     - data

- Returns the content of the file.

```js
const textIn = fs.readFile("./txt/input.txt", "utf-8", (err, data) => {
  if (err) return console.log(err);
  console.log(data);
});
```

> **_Note_** | the `./` characters at the beginning of the file path refers to the location where we are running the terminal. So if we run the terminal in the root folder of our project, everything is fine, but if we run it somewhere else, for instance, on the desktop, then `./` will represent the desktop location. The solution to this problem is a variable called `__dirname`. This variable always refer to the location where the script that is being executed is located.
>
> ```js
> fs.readFile(`${__dirname}/txt/input.txt`);
> ```
>
> Exception to this rule is the `require()` function. The `./` characters in the file path passed into this function always translates to the directory of the script that is being executed, and not to where we are running the terminal.

> **_Note_** | in case the content of a file should be sent back as a response to a request sent by the client, it is more efficient to perform the reading process **synchronously** before the server is even created. We would read and store the content of the file into a variable, and the web server would simply send the content that is already read.
>
> This applies to HTML template files that should be dynamically filled and sent back to the client as response. So the content of all template files should be read and stored in a variable, and they would be filled with the related data provided by the server and sent back to the client when requested. Just remember to set `Conetnt-type` header to `text/html`. (refer to [.writeHead()](#methods-for-sending-response) method.) See code example below:

```js
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
```

#### **Writing files**

In this situation, we usually produce or already have a data that we want to write into a file.

**`.writeFileSync()`**: this is the synchronous version of FS writing functionality.

- Accpets two arguments:

  1. Path to the file that is going to be written into. If the output file does not exist in the file system, the function will automatically create it for us.
  2. Data that is going to be written. Can be a variable holding the data.

```js
const textIn = fs.writeFileSync("./txt/input.txt", "uft-8");
const textOut = `This is what we know about Avocado: ${textIn}\nCreated on ${Date.now()}`;

fs.writeFileSync("./txt/output.txt", textOut);
```

**`.writeFile()`**: this is the asynchronous version of FS writing functionality.

- Accpets two arguments:

1. Path to the file that is going to be written into. If the output file does not exist in the file system, the function will automatically create it for us.
2. Data that is going to be written. Can be a variable holding the data.
3. Character encoding of the output file
4. Callback function: has access to one argument, which is the error object, if an error happens in the writing process.

```js
const textOut = "This is what we know about Avocado";

fs.writeFile("./txt/output.txt", textOut, "utf-8", (err) => {
  console.log("File written.");
});
```

> In order to write a JavaScript object to a JSON file, we should `staingify` the object that is going to be passed into the `.writeFile()` method.

```js
fs.writeFile("<file-path>", JSON.stringify(data), (err) => {
  res.status(201).json({
    status: "success",
    data: {
      data,
    },
  });
});
```

### **HTTP module**

**`core`**

This core module enables networking capabilities for us.

In order to use FS module in a Node application, we first need to `require` it in a specific JavaScript file.

```js
const http = require("http");
```

#### **Creating a web server**

A web server is actually an application that can listen for requests and respond to them. (refer to [web server](#web-server) and [Routing](#routing))

We should create a JavaScript file and in there, we create a web server. Creating a web server basically includes 2 steps:

1. **Creating a server** using the `.createServer()` method on the `http` module. The method accepts a callback function that gets called whenever a request hits the server. This callback function has access to 2 arguments:

   - **Request object:** includes all kinds of stuff like the request URL, request headers, etc.
   - **Response object:** includes a bunch of tools for sending out the response, like `.end()` method.

```js
const server = http.createServer((req, res) => {
  res.end("Hello from the server!");
});
```

The method finally returns the server that we can store in a variable.

2. **Starting a server**, so that we can listen to incomming requests. To do this we call the `.listen()` method on the server that we created. The method accepts three arguments:
   - **Port number:** the port is a sub-address on a certain host. We usually use 8000 or other numbers.
   - **Host:** it is the IP address of the host. If we skip defining this parameter, it will by default be set to local host, but we can also explicitly define the local host for it. The standard IP address for local host is `127.0.0.1`.
   - **Callback function (optional):** it is called as soon as the server starts.

```js
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to incoming requests");
});
```

Now we have to run this JavaScript file in the terminal.

```js
node index.js
// Listening to incoming requests
```

This will execute the server codes we wrote, and as a result, the file will keep running becasue we have told it to listen for requests. It is the **event loop** that prevents the execution from stopping. We can now go to the browser and enter URL `127.0.0.1:8000`. The browser will then show the respond we designed for any request that hits our server:

```
Hello from the server!
```

> **_Note_** | if now we change something in the code, we would have to use the terminal to stop the application from running (`Ctrl+c`), and then execute it again. This reset process can be done automatically by an NPM package called **nodemon**.

#### **Methods for sending response**

**`.writeHead()`**: used to set status code and setting response headers. (refer to [HTTP headers](#http-headers))

- Receives 2 arguments:

  1. status code
  2. [response headers](#standard-http-response-headers): should be passed into the method as an object.

```js
res.writeHead(404);
res.writeHead(404, {
  "Content-type": "text/html", // client will now expect an HTML response.
});
```

> **_Note_** | headers should always be defined before the response is sent, for example using the `.end()` method.

**`.write()`**: usually used in streams in order to write a chunk of data received from a readable stream. (refer to [Streams](#streams-in-practice) and consider the **back pressure** problem.)

```js
const readable = fs.createReadStream("test-file.txt");
readable.on("data", (chunk) => {
  res.write(chunk);
});
```

**`.end()`**: used to send plain text responses. Receives a string that will be sent to the client as response.

```js
const server = http.createServer((req, res) => {
  res.end("Hello from the server!");
});
```

It can also be used with streams in order to end a request-response cycle after the steam is finished. (refer to [Streams](#streams-in-practice) and consider the **back pressure** problem.)

> Remember that you should always send a response to a client request in order to end a request-response cycle. Otherwise, the request will be timed out and this is a bad experience for your client.

##### **Standard HTTP response headers**

1. **`'Content-type'`**: defines the format of the response that is being sent to the client. 'text/html' or 'application/json'.

### **URL module**

**`core`**

This core module enables us to analyze the request URL, in order to parse different paramteres from the URL into an object.

In order to use URL module in a Node application, we first need to `require` it in a specific JavaScript file.

```js
const url = require("url");
```

#### **Inspecting the request URL**

Whenever a request hits the server, we have access to a `url` property on the request object. So we can inspect it wherever we have access to the request object, like in the callback function of the [`.createServer()`](#creating-a-web-server) method.

`req.url` contains the piece of URL after the host address, starting with a slash character. For instance, `127.0.0.1:8000/overview` will be represented by `req.url` as `/overview`.

```js
const server = http.createServer((req, res) => {
  console.log(req.url);
  // returns:
  // /
  // /favicon.ico
});
```

#### **Parse URL parameters**

In order to capture URL paramaters and store them in variables in an object we can use the `.parse()` method from the `url` module. The method accepts first, the request URL, and second, a boolean value determining whether or not to parse the [query](#query) into an object.

```
Request URL:
127.0.0.1:8000/product?id=0
```

```js
const query = url.parse(req.url, true);
console.log(query);
// Query: {id: '0'}
// pathname: '/product'
```

This returns an object in which there are many properties including a `Query` property, which itself is an object, containing the parameters specified in the URL. It also includes a `pathname` property containing the path after the host address.

### **Slugify module**

**`3rd-party`**

It is used to make more readable URLs based on names.

Sincs this is a 3rd-party module, we should first install it in NPM:

```
npm install slugify
```

We will then have to import this module in any script file that we want to use:

```js
const slugify = require("slugify");
```

#### **Using slugify**

Basically, what slugify does is that it provides us with a `slufigy()` function can convert any given string to another formatted string. The function receives two arguments:

1. String
2. Formatting options: this would be passed into the function as an object of options.

   - `replacement`: using a string, determines what character should spaces be replaced with. default is dash (`-`).
   - `remove`: using a regular expression, determines which characters should be removed from the given string.
   - `lower`: using a boolean, determines whether the given string should be converted to lowercase or not.

```js
console.log("Fresh Avocados", {
  lower: true,
});
// fresh-avocados
```

### **Nodemon module**

**`3rd-party`**

It is used to automatically restart the NodeJS application as we save any changes that we implemented in our code. This package is usually installed globally since it is used in all projects.

```
npm install nodemon --global
```

In order to make Nodemon execute our application we use this command in the terminal:

```
nodemon index.js
```

This will execute our script file and keep watching for any changes that we implement to the files in our working directory. Once it detects any changes, it will restart our script file after changes are saved.

> **_Note_** | if we install Nodemon locally, we would not be able to run it from the terminal. Instead, we have to specify an NPM script in our `package.json` file.
>
> ```json
> "scripts": {
>  "start": "nodemon index.js"
> }
> ```
>
> Then in order to run this script, we use the terminal:
>
> ```
> npm run start
> ```
>
> This will execute the `start` script implemented in the `package.json` file.

## **Streams**

Streams are used to process (i.e. read and write) data piece by piece (chunks), without completing the whole read or write operation, and therefore, without keeping all the data in memory.

For example, the action of reading a file using streams includes reading part of the data, do something with it, free up the memory, and repeat this until the entire file has been processed. This is the principle that companies like YouTube and Netflix has based their services upon.

Streams are perfect for handling large amounts of data, for instance, videos. Streaming makes data processing more efficient in terms of memory. Steams are every where in Node core modules.

Note that streams are instances of the `EventEmitter` class, meaning that they can emit and listen to named events mentioned in the table below.

In NodeJS there are 4 fundamental types of streams:

| Type              | Description                                   | Example                               | Events            | Functions                |
| ----------------- | --------------------------------------------- | ------------------------------------- | ----------------- | ------------------------ |
| Readable streams  | we can read (consume) data from               | `http` requests, `fs` read streams    | `data`, `end`     | **`.pipe()`**, `.read()` |
| Writable streams  | we can write data to                          | `http` responses, `fs` write streams  | `drain`, `finish` | `.write()`, `.end()`     |
| Duplex streams    | both readable and writable                    | `net` web sockets, `fs` write streams |                   |                          |
| Transform streams | duplex that transform data as written or read | `zlib` Gzip creation                  |                   |                          |

> **_Note_** | events and functions mentioned in the table above are for **consuming** streams that are already implemented like the ones mentioned in the _Examples_ column. For instance, Node implemented HTTP requests and responses as streams, so we can consume them. We could implement our own streams and consume them the same events and functions.

### **Streams in practice**

To understand how to work with steams in practice, we are going to follow a simple example. In this example, we want to serve a huge text file to the client as a request hits the server.

First, we are going to implement this without using streams. So we read the file into a variable, and send it to the client once the reading is done.

```js
const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  fs.readFile("test-file.txt", (err, data) => {
    if (err) console.log(err);
    res.end(data);
  });
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
```

As the second solution, we are going to use streams. So in this case, we don't actually need to read the file into a variable. Instead, we will create a readable stream. Then as we receive each chunk of data, we send it to the client as a response, which is a writable stream.

```js
server.on("request", (req, res) => {
  const readable = fs.createReadStream("test-file.txt");
  readable.on("data", (chunk) => {
    res.write(chunk);
  });

  readable.on("end", () => {
    res.end();
  });

  // on readable streams, we also have access to an 'error' event:
  readable.on("error", (err) => {
    console.log(err);
    res.statusCode = 500;
    res.end("File not found!");
  });
});
```

There is a problem with this approach. The readable stream is much faster than sending the response writable stream over the network. This will lead to a problem called **back pressure**. Back pressure happens when the response cannot send the data nearly as fast as it is receiving it. So here comes the third solution, involving the use of the `.pipe()` method.

#### **The best solution**

The `.pipe()` method is available on all readable streams, allowing us to pipe the output of a readable stream into the input of a writable stream. The method accepts as an argument, a writable (or duplex or transform) stream which, in this case, is the `response` object.

```js
server.on("request", (req, res) => {
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
});
```

## **HTML templating**

HTML templating mainly includes updating parts of an HTML file based on data provided by a server. The updated HTML file is then sent back by the server to the client as a response to a specific request.

> **_Note_** | remember that in these cases we should determine the `Content-type` header as `text/html` before sending the response using the `.end()` method. (refer to [.writeHead()](#methods-for-sending-response) method.)

### **Implementing placeholders**

In practice, we implement some placeholders in the HTML file that will get replaced dynamically by data coming from the server. The placeholder can be any set of characters. It just has to be something that is unique throughout the HTML code, so that it could be detected and replaced easily with code.

For instance, If we have this HTML code:

```html
<h2 class="product__name">Fresh Avocados</h2>
```

We can implement placeholders like this:

```html
<h2 class="product__name">{%PRODUCTNAME}</h2>
```

> **_Note_** | replacements can be done all over the HTML file. There is no limit. It can also be done for class names. The HTML file is just a text file. So if we can detect a special string anywhere in the HTML, we can replace it with anything.

Implementing placeholders for class names is usually used to make an HTML element appear/disappear according to data coming from the server:

```html
<div class="product__organic"><h5>Organic</h5></div>
<div class="product__organic {%NOT_ORGANIC%}"><h5>Organic</h5></div>
```

#### **Placeholders for templating unknown amount of data**

In case we want to render a webpage that presents a certain number of things, but we don't know how many things, we can make a template file for one single thing, and then implement a placeholder in the HTML file where all things are going to be rendered. This placeholder will be replaced by a string built through accumulating HTML code of one thing after another, usually based on an array of data coming from the server. On this data array the `.map()` and finally the `.join()` method would be used to create the final HTML code string.

### **Replacing placeholders**

Replacing placeholders is done using simple JavaScript methods that act on strings. The replcement is usually done by a separate function that we define specifically to take care of this job.

```js
const replaceTemplate = (template, product) => {
  let output = template.replace(/{%PRODUCT%}/g, product.name);
  output = template.replace(/{%IMAGE%}/g, product.image);

  if (!product.organic)
    output = template.replace(/{%NOT_ORGANIC%}/g, "not-organic");

  return output;
};
```

> **_Note_** | notice how we use a regular expression to specify the placeholder that should be replaced. This will make it so that all occurences of the placeholder will be replaced by the specified data. Ohterwise, only the first occurence would be replaced and the rest would be left unchanged. The `g` flag in the regular expression stands for **global**.

# **Express framework**

**`3rd-party module`**

Express is a minmal NodeJS framework written completely in NodeJS, which means that it is built on top of NodeJS as a higher level of abstraction. This allows rapid development of NodeJS applications. It also makes it easier to organize our application into the MVC architecture.

Express has a very useful set of features:

- complex routing
- easier handling of requests and responses
- middleware
- server-side rendering, etc.

The essence of express development is to understand and utilize the [request-response cycle](#middleware-and-request-response-cycle).

As a 3rd-party module, we first need to install Express using NPM.

```
npm install express
```

We then have to `require` it in any file where we want to use it:

```js
const express = require("express");
```

## **Middleware and request-response cycle**

Once our Express app receives a request, it will create a **request** and a **response** object. These objects are then used and processed to generate a meaningful response, which will be eventually sent back to the client.

The process mentioned above invloves middleware manipulating the request and the response object or execute any code we want. So middleware does not always work on the two objects, but they are usually intended to do so. It is called middleware because it is executed between receiving a request and sending the response.

In Express, nearly everything is a middleware. Because nearly all the functionalities that we define are executed between receiving a request and sending the response. So even in route definitions, our route handler functions are middleware. They are middleware that are only executed for ceratin routes.

All the middleware together that we use in our application is called the **middleware stack**. The order of middleware execution is defined by the order in which middleware are defined in the code. We can think of the middleware stack as if the request and the response objects go through each middleware, where they are processed or where some other code is executed. At the end of each middleware, a `.next()` function is called, passing the request and response objects on to the next middleware. This happens with all the middleware until we reach the last one. The last middleware function is usually a **route handler function**. This middleware will not call the `.next()` function at the end. Instead, it finally sends the response data back to the client. This is where a request-response cycle is finished.

You can checkout available middleware on the Express website at the _Resrouces_ tab.

### **Implementing middleware**

In order to implement a middleware in Express, we use the `.use()` method on the `app` variable. The method can accept two arguments:

- A route: if a route is defined in the method, then the middleware will only apply to requests hitting that specific route. If no route is defined, the middleware will simply apply to all requests hitting the server.
- A callback function that has access to the request and response objects, and also the `next()` function.

```js
app.use("<route>", (req, res, next) => {});
```

> It essentially matters where you place your middleware in your code. It should be placed before the final route handler functions, otherwise the middleware will not run.

## **Starting a server**

To start a server with Express, we first need to call `express()` and store it into a variable, usually called `app`.

```js
const app = express();
```

Then to start listening to requests:

```js
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
```

> **_Note_** | It is a good practice to have one separated file for all server configuration code, and another file as the main application file which is mainly concerned with our middleware stack.
>
> In this structure, the `app` variable should be exported from the `app.js` file, and it should be imported in the `server.js` file.
>
> Note that the server file, in addition to the server configuaration, will also include database configurations, error handling stuff, and environment variables. Keep in mind that with this file structure, the entry point of our program execution will be the `server.js` file. So the script inserted into the `package.json` file would be updated to `nodemon server.js`.

**`server.js`:**

```js
const app = require("./app");

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
```

Next, we should define routes for our application.

## **Defining routes**

In order to implement routing, we should determine URL and the HTTP method.

- The HTTP method is defined by a method that we use on the `app` variable according to the HTTP method that we are aiming for. We can choose between `.get()`, `.post()`, `.patch()`, `.delete()`.
- The URL is then defined in the HTTP method as the first argument. The second argument would a callback function that would be executed as a response. This callback function, again, has access to the **request** and the **response** object.

```js
app.get("/", (req, res) => {
  res.status(200).send("Hello from the server-side");
});
```

> **_Note_** | The request and response objects are a bit different in Express. They have a lot more data and methods available on them.

We can also define the route in the `.route()` method, and then attach and chain HTTP methods to it.

```js
app.route("api/v1/foods").get().post();
app.route("api/v1/foods/:id").get().patch().delete();
```

### **Implementing Routers and mounting**

This is mainly done in order to nicely separate our code into different files that would fit into the **MVC architecture**, so that we would have separate files only containing routes for different resources, and then also separate files that only contain route handler functions, and one main file, usually called `app.js` that is mainly responsible for our middelware stack and routers mounted for each resource.

We first need to implement a separate router for each resource.

To create a new router:

```js
const foodRouter = express.Router();
```

Now to connect this new router to our application (`app`), we use a middleware since the new `foodRouter` router is actually a middleware.

```js
app.use("api/foods", foodRouter);
```

So this new router in this example, will only run if a request comes to `/api/foods`.

The new router can then be used instead of the `app` variable for the route handler functions that relate to a specific resource. Notice how the `api/foods` route is now the root URL for the new router. Therefore, the routes for the new router should be updated to the new root. The new router is actually a sub-application. This process of joining new routers to the main router is called **mounting**.

```js
foodRouter.route("/").get().post();
foodRouter.route("/:id").get().patch().delete();
```

> **_Note_** | normally, new routers are created in different files, for instance `foodRoutes.js`, and they are imported in the main `app.js` file, where they are mounted to the main router. In the separate files, the new routers are usually called just `router` and not something like `foodRouter`. This way, the `app.js` file is mainly used for middleware implementation. Keeping this file structure, we would also have to separate route handler functions in different files, for example `foodController.js`. This file structure would fit into the MVC architecture.

**`foodController.js:`**

```js
exports.getAllFoods = (req, res) => {
  // retrieving logic
};
```

**`foodRoutes.js:`**

```js
const express = require("express");
const foodController = require("./controllers/foodController");
const router = express.Router();

router.route("<route>").get(foodController.getAllFoods);
// other defined routes

module.exports = router;
```

**`app.js:`**

```js
const foodRouter = require("./routes/foodRoutes");
```

> **_Note_** | an HTTP method can accept more than one handler function. They just have to be separated from each other with a comma.

> The `app.js` file is normally used only for declaring middlewares that should be applied to all the routes. Again, a global middleware should be placed before all the sub-applications - that is, middlewares that are actually routers to the sub-applications.

```js
router.route("<route>").get(foodController.checkId, foodController.getFood);
```

## **Methods on response**

**`.status`:** used to determine the status code of the response. Accepts number as status code.

**`.send`:** used to send back plain text responses. Accepts a string.

**`.json`:** used to send back JSON data in the response. Accepts a regular JavaScript object. It will be automatically converted to JSON. This method automatically sets the `Content-Type` header to `application/json`.

## **Responding to URL parameters**

When attempting to retrieve a special data and not just all the data of a resource, the user would determine a parameter in the URL, and we should be able to detect and react to it.

For instance, the request URL would look like this:

```
127.0.0.1:3000/api/foods/5/10/2
```

In order to be able to detect the `/5` at the end of the URL, we should implement the routing as displayed below. Then the detected parameters would be accessible on the `params` property of the request object.

```js
app.route("/api/foods/:id/:x/:y").get((req, res) => {
  console.log(req.params); // { id: '5', x: '10', y: '2' }
});
```

### **Optional parameter**

The previous way of route implementation would make it so that the URL must contain these identifiers, otherwise the request would be responded with error. But in order to make it optional, we can use a `?` mark at the end of each parameter in the URL.

```
127.0.0.1:3000/api/foods/5
```

```js
app.route("/api/foods/:id?/:x?").get((req, res) => {
  console.log(req.params); // { id: '5', x: undefined }
});
```

## **Popular middleware**

### **Body parser**

**`Express`**

This Express middleware is used because Express does not put the body data in the request object automatically. We use this middleware to do so.

```js
app.use(express.json());
```

Now the data that the user sends with their request is available on the `body` property of the request object.

```js
app.route("/api/foods").post((req, res) => {
  console.log(req.body);
});
```

### **Param middleware**

Param middleware only runs when we certain parameters are present in the URL. For example, if we receive a request on this URL:

```
127.0.0.1:3000/api/foods/:id?
```

Param middleware is usually used to take the task of checking certain parameters away from route handler functions which are mainly concerned with other functionalities.

> **_Note_** | since it is a middleware, we should be careful about its placement in our code. Additionally, as a middleware, it has access to the 3 arguments that all middleware have, but also yet another argument which is the value of the parameter.

```js
router.param("id", (req, res, next, val) => {
  console.log(`Food id: ${val}`);
  next();
});
```

> The callback function defined for the param middleware can be defined separately in the controller file. Then we would only have to refer to that function here in the param middleware declaration.

### **Static**

**`Express`**

This is another built-in Express middleware that enables us to serve static files, like HTML files.

```js
app.use(express.static(`${__dirname}/public`));
```

With this middleware, we are now able to access static files stored in a `public` folder in this case. For example, if not want to access the `overview.html` file in this directory, we would have to type this URL in the browser:

```
127.0.0.1:3000/overview.html
```

Notice how we omited the `public` directory in the URL. It is because when we open up a URL that the application cannot find in any of our defined routes, it will look for it in the `public` folder because we have told it to do so in the static middleware. Then it kind of sets the `public` directory as the root.

### **Morgan**

**`3rd-party`**

This is a 3rd-party middleware used to perform some logging operation. It enables us to see request data right in the console.

In order to use this middleware, we first need to install it using NPM. Although the middleware is used to make developing easier, we use its code in our program, so it is not to be installed as a development dependency, but a regular dependency.

```
npm install morgan
```

We should then require it into the file where we want to implement it:

```js
const morgan = require("morgan");
```

We can then implement the middleware as:

```js
app.use(morgan("dev"));
```

The morgan function can accept a string argument, determining the format of the log. There are a couple of options available: `combined`, `dev`, `common`, `short`, `tiny`.

Logs produced by this middleware can also be saved into a file and used as a history.

## **Creating custom middleware**

To implement custom middleware, we still need to use the `.use()` method on the `app` variable. As mentioned before, the method accepts a **route** and a **callback function** that has access to the **request** and **response** objects, along with the **`next()`** function. If no route is defined, the middleware will apply to all incoming requests.

At the end of each middleware, the `next()` function should be called. Otherwise, the request-response cycle would get stuck in the current middleware, and the request would never be responded.

```js
app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next();
});
```

This example middleware will apply to all the requests because we did not define any route for it.

Obviously, since we have access to the request and response objects, we can manipulate them in our middleware.

```js
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
```

Now as the request object is passed on to the next middleware and route handler functions, it will carry this new property that we added to it.

> Remember that it matters where you place your middleware in the code. If should be placed before final route handler functions, otherwise the final route handler function will send back the response and end the request-response cycle. This will cause the middleware not run. Therefore, it is kind of obvious that we need to place our **global middleware** - that is, middleware that has no defined route and will run for each and every request - before all of our route handler functions.

## **Express regular workflow**

When we want to start an Express project, these are the usual steps that we take:

1. Create the `package.json` file. We run the `npm init` command in the terminal.
2. Install Express using NPM. We run `npm i express`. We may want to use version 4 since it is the most stable version (`npm i express@4`). But the Express team has been working on version 5. There are not a lot of changes implemented though. This will create the `node_modules` folder in our project root.
3. Create `app.js` file. It is a convention to place all the Express configuration in a file called `app.js`. We should `require` Express in the `app.js` file in order to be able to work with it.

```js
const express = require("express");
```

4. Call the `express` variable and assign its result to another variable which is conventionally called `app`. `express` is a function that, upon calling, will add a bunch of methods to the `app` variable.

```js
const app = express();
```

5. Use `.listen()` method on the `app` variable to start up a server. This method accepts first the port number, and second a callback function that will get called as soon as the server starts listening.

```js
app.listen(3000, () => {
  console.log("App running on port 3000");
});
```

6. Define [routes](#defining-routes). Routing means to determine how an application will respond to a client request on a specific **URL** with a specific **HTTP method**.
7. Define your [middlewares](#implementing-middleware). You certainly cannot define all the middleware you need right in the beginning. Define the ones you currently need to run for your requests and routes before the final route handler function is executed. Then as you move foreward in developing your projects, you will need to add more middleware.
8. Define neccessary [variable environments](#environment-variables) in a `config.env` file in the root directory and connect it to your Node application using the [dotenv](#dotenv-module) package.

This is the regular file structure that you should follow in your project:

```
[Project root]
- controllers (dir)
    tourController.js
    userController.js
- node_modules (dir)
- public (dir)
- routes (dir)
    tourRoutes.js
    userRoutes.js
app.js
server.js (entry => npm script: "nodemon server.js")
config.env
package.json
package-lock.json
.prettierrc
```

# **Database**

There are two types of databases:

1. NoSQL
2. Relational: this is the more traditional type of database.

## **MongoDB**

In MongoDB, each database can contain one or more **collections** (similar to **tables** in relational databases). Each collection can contain one or more data structures called **documents** (similar to **rows** of a table in relational data bases).

Each document contains data about one single entity (e.g one food, one user, one review, etc.) and it stores data in BSON format (similar to JSON) which makes it easy to work with. The collection is like a parent structure that contains all these entities.

### **MongoDB key features**

1. Document based: stores data as documents with field-value pair structure (NoSQL).
2. Scalable: easy to distribute data across multiple machines as your users and amount of data grows.
3. Flexible: No document data schema required before filling it with data. Each document can have different number and type of fields.
4. Performant: because of embedded data models, indexing, sharding, flexible documents, native duplication, etc.
5. Free and open-source, published under SSPL license.

### **MongoDB BSON vs Relational Database**

BSON is the data format that MongoDB uses for data storage. It is basically like JSON, but it is typed, meaning that all values will have a data type. So all MongoDB documents will be typed, which is different from JSON. But similar to JSON, BSON documents has fields, and they store value in key-value pairs.

Here are a set of features available in MongoDB due to BSON that relational databases don't have:

- **Multiple values for one field:** In a relational database, each field is called a **column**. Each column can have only 1 value. In BSON, however, we can have multiple values stored in an array for only one field.

- **Embedding/De-normalizing:** In MongoDB we have the concept of embedded documents, which we don't have in relational databases. For instance, we can have multiple review documents in an array, all stored in one _reviews_ field. So embedding means to include related data into a single document. This allows for quicker access and easier data models. We might, of course, need to **normalize** data in some situations. This is how data is always modeled in relational databases. In relational databases we can never embed data. The solution would be to create a whole new table for the related data.

Here are 2 more things about the BSON format:

1. Maximum size for each document is currently 16 mb.
2. Each document contains a unique ID which acts as the primary key of the document. This ID is of type `ObjectID` and it is automatically generated when it is created.
