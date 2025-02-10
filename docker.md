# What is Docker?

It is a container technology, a tool for creating and managing containers. But what is a container?

In software development, a container is a standardized unit of software, it is a package of code along with dependencies and tools that are needed to run that code. For instance, if you are building a NodeJS application, with a container built with Docker you could have your application source code in that container as well as the NodeJS runtime and any other tools that are needed to run your code. The key feature of a container is that **the same container always yields the exact same application and execution behavior**, no matter where or by whom it might be executed.

Containers are self-contained and isolated. Things inside one container don't get mixed up with things in another container. This container can be shipped anywhere.

Docker is just a tool for building these containers. Today, container support is built into modern operating systems and Docker can be installed on nearly all of them.

Docker simplifies the creation and management of containers. You don't need Docker to create containers, but it really makes it easy for us to do so.

# Why Docker and containers?

There is one important question to answer: Why would we want **independant, standardized application packages**?

1. We almost always have different development and production environments. Take a NodeJS application as an example. In this application you wrote some code that requires NodeJS version 14.3 to run successfully. You might have this version installed on your local machine, but if you then take this application and deploy it to a remote machine or a server where it should be hosted, then on that server you might have an older version of NodeJS installed. This will break your code. It won't work there, although it works fine on your machine. So having the same exact development environment as in production can be worth a lot. This is what Docker and containers can help you with.
2. You might work on a team or company. Maybe you, as a member of this team, have not worked with NodeJS for rather a long time and you didn't need to update your NodeJS version. However, if you are going to collaborate with your team on that NodeJS project, you should have the exact same environment as your teammates. It should be easy to share a common development environment and setup.
3. Even if you are working on your own, Docker and containers can help you a lot. If you have multiple projects, you might endup with clashing versions. One project uses Python version 2, and another project uses another version. This means that when you want to work on each project, you have install the proper version of Python. That does not make sense! When switching between projects, tools used in one project should not clash with tools of another project.

With containers, we utililze built-in OS container support. Then we run a tool called the Docker engine on top of it. Based on the Docker engine we can start our containers. These containers don't include a whole operating system inside of them. They are very light-weight and optimized.

The good thing with containers is that you can configure and describe them with a configuration file. You can then share this file with others so they can recreate the container, or you can also build the container into something called an `image` and share that image with others to ensure that they are also able to run your project in the same environment.

# Docker desktop and toolbox

You need to install Docker on your OS to be able to work with containers. There are different installation manuals depending on your operating system.

> Linux natively supports Docker engine and you can directly install the engine on this OS. Docker Desktop and Docker Toolbox are tools that help you bring Docker to life on non-Linux operating systems.

# Docker tools and building blocks

1. Docker engine
2. Docker desktop
3. Docker hub: a service that allows us to host our images in the cloud so we can easily share them with other poeple and other projects.
4. Docker compose: a tool that builds up on Docker making managing more complex multi-container projects easier.

# Creating a simple container

You are now provided with the source code of a NodeJS project and you want to run it on your local machine. To do this without Docker and containers, you would have to go to NodeJS website, install NodeJS, and then in the terminal running at the project directory, using this command:

```
npm install
node app.mjs
```

But with Docker, everything is going to be different. We would like to run this code in a container. To do that, we first need to create an **image**, because **containers** are always based on images.

To create an image, you should create a file in the root directory of the project and name it `Dockerfile`. In this file, you should describe how your container in the end should be set up.

```Dockerfile
<!-- Dockerfile -->
FROM node:14-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "app.mjs" ]
```

Details about this instruction file will be discussed later. The next step is to build the image using this command at the intergrated terminal of VS code:

```
docker build .
```

What happens now is that Docker will try to build the container based on the image file (Dockerfile) you provided. It will first try to get the Node runtime version 14. Then it will set up an image for a container to be launched with all the instructions being executed inside the image.

Finally after the build command is finished executing, Docker will give you the ID of the image file that is created. You can then use this ID in the terminal and run a container based on it.

> You need to publish the port that you have described for your container, on which your application is going to listen. This is done using the `-p` flag. Otherwise, by default, there is no connection between our local machine's operating system and the container. The container exposes port `3000` and you would most probably like your local machine's `3000` port to connect to the containers port. So it would be a `-p 3000:3000` in the command.

```
docker run -p 3000:3000 <image-id>-<name>
```

> The name after the version could be `alpine` for light-weight node packages.

You can now go to `localhost:3000` route in your browser and see the application running. You application is now running inside a container.

In order to stop the container you can open up another terminal session and use this command to list all the active containers:

```
docker ps
```

This will return all the information related to the active containers along with their randomly generated names. A list of active Docker containers is also visible in the Docker desktop applications, under `Containers` section.

Then to stop a specific container from running you can use the container's name in the `docker stop` command:

```
docker stop <container-name>
```

This might take a few seconds before the container is stopped.

In the rest of the course we are going to learn:

1. Fundamental concepts of images and containers
2. Data and volumes: learn how to manage data in containers and how to ensure that data persists if a container shuts down and restarted or removed in the middle.
3. Containers and networking: learn how multiple containers can communicate with each other. You might be building an application where you have Node REST API in one conatiner, and a ReactJS front-end in another container. You need to have these containers talk to each other.
4. Mutil-container projects
5. Docker-compose: makes managing containerized applications much easier.
6. Utility containers
7. Deploy docker containers (AWS)
8. Kubernetes: learning what problems Kubernetes solves.
9. Data and volumes in Kubernetes
10. Networking in Kubernetes
11. Deploying Kubernetes cluster

# Docker images and containers

We are going to learn 3 main parts:

1. Two core conecpts: images and containers
2. Using pre-built and custom images
3. Creating and managing containers

You learned that containers are small packages that contain both your application and the entire environment for running that application. It is a unit of software.

But when you work with Docker you also need to know about images, since images are the blueprints or templates for containers. It is actually the image that contains the code and the required tools to execute the code. It is the container that runs and executes the code.

These two concepts together allow us to create one image file, but run multiple containers on different machines or servers. So the image is that sharable package with all the instruction and all the code, and the container will be the concrete running instance of the image. This is the **core and fundamental concept** on which Docker is built.

## Using external (pre-built) images

In addition to creating your own images, you can use already existing (pre-built) images. You can get these images from Docker hub. You can find the Node Docker image which you can use to build a Node application.

You can use the official Node Docker image in general when working with Docker, but you can also especially use it right away to get started with images and containers here.

To do this you can open up the terminal, navigate to any directory, and run this command:

```
docker run node
```

This command will use the official Node image on Docker hub to create a container based on this image. Containers are the running instances of images. The node image contains the Node installation. Then you can run the image to run the application or simply run the Node interactive shell (REPL).

After the installation is complete, you see nothing special in the terminal. There is container currently running based on the image, but the container is not really doing much. Node is just a software and we can execute Node to get an interactive shell, but **by default, a container is isolated from the surrounding environment**. Just because an interactive shell is running inside of a container does not mean that this shell is exposed to us as a user. Nonetheless, this user was not created. The interactive shell exposed by Node, is not automatically exposed by the container to us. You can change this by using special flags on the `docker run` command.

```
docker run -it node
```

The `-it` flag tells Docker that we want to expose an interactive session from inside the container to our hosting machine. This way you will now enter the interactive Node terminal.

> It is important to note here that right now Node is not running on your machine. This is coming from the Node container, and the interesting fact about it is, again, you don't need to have a local installation of Node on your local machine to be able to run this container.

So we now understand that images are used behind the scenes to hold all the logic and the code that a container needs. Then we create instances (containers) of that image using the `docker run` command.

## Building your own image

Most of the times, you don't want to just download and run an image that gives you an interactive shell. Instead, typically you build up on those base images to create you own images. For instance, you can build up on the official Node image to then execute certain NodeJS code. This is a scenario where you need to build your own image because your exact application with your code does not exist on Docker hub, unless you share it there.

Let's take a dummy NodeJS project that we want to run in a Docker container. This project containes a `package.json` file which describes the Node application. This file has nothing to do with Docker, but specifies the dependencies that our application needs to execute. If you want to run this application locally, you would have to install NodeJS on your local machine. Then in a terminal openned in your project directory, you can use the `npm install` command to install the project dependencies, and finally use `node server.js` to run the application.

So what? are you going to install separate programming language engines and runtimes on your machine anytime you are going to work on a new project? It doesn't make sense. So let's see how we can create our own image that uses the base NodeJS official image.

First, you need to create a file called `Dockerfile` in the root directory of your project.

> In order for VS Code to be able to help you in writing the contents of the Dockerfile

The `Dockerfile` will contain the instructions for Docker to build our image. Typically, you start this file with the `FROM` command. This command allows you to build your own image up on another base image. This command tells Docker that you want to start by pulling in the `node` image to create your own image.

```Dockerfile
FROM node
```

The image that you write for the `FROM` command, would be located either on your local machine or on Docker hub. If you have previously executed a container based on this same image, it would exist on your local machine. Whenever you execute a container based on some base image, that image is downloaded and cached locally by Docker.

As for the next step, you would like to tell Docker which files that exist in your local project directory, should go into the image. For this, you can use the `COPY` command. The copy command receives two paths as arguments. First path is the source path, the path outside the image on your machine, where the files that should be copied into the image exist. Writing `.` for this path would tell Docker to find all the folders, files and sub-folders at the same directory where the Dockerfile is located (excluding the Dockerfile itself); most probably the root directory of your local project. The second path, the destination path argument specifies the directory inside the image where those files should be stored.

> Every image has its own internal file system, totally detached from your local file system. It is a good practice not to set the root directory of the image as the destination path. It is better to send files to a particular folder under the root directory of the image file system. You can call this folder anything you want, for example `/app`. Note that this folder will be created inside the image file system if does not already exist.

```Dockerfile
FROM node

COPY . /app
```

As for the next step, you would need to run `npm install` command. For a Dockerfile this would have to be written as `RUN npm install`. This is to install the application's dependencies based on the instructions provided by the `package.json` file. However, this command runs at the image file's **working directory**. The image's default working directory is the image's root directory, but it actually must run at the directory where the project files are located and that is the `/app`. So we would have to chanage the image's working directory beforehand. This should be done right after the `FROM` command. This would change all the commands location

> With this change, you can also update the `COPY` command and change it's second path argument to `.`. However, it is optional. Some prefer to keep the code more readable.

```Dockerfile
FROM node

WORKDIR /app

COPY . /app

RUN npm install
```

Finally, you would want to run your server. Without Docker, that would mean that you have to use the `node server.js` in the terminal at the root directory of your project. But it does not mean that your can use `RUN node server.js` in the Dockerfile also. It is incorrect, because this command would run when the image is being built. All of the commands written inside the Dockerfile are instructions for Docker for setting up the image. The image, is the template for the container. The image is not what you run in the end. You run a container based on an image. You would like to run your server file inside a container, not inside an image. This would make it so that if you run multiple containers, multiple server files would have to be started, not just one server file in the image. So instead of `RUN` command, you would have to use the `CMD` command in the Dockerfile as below. The `CMD` command would not run when the image is being created, but only when a container is started based on the image. For `CMD` command, the syntax is a bit different:

```Dockerfile
FROM node

WORKDIR /app

COPY . /app

RUN npm install

CMD ["node", "server.js"]
```

Now if you try to run Docker and build the container based on this image, you would not yet be able to see your application. If you take a look at the server file of the project, when the server is working, it listens on port `80`. But when this server is running inside a container, it is fully isolated from its environment. The container should also expose this port so that we would be able to access the server file. To do this, you can use the `EXPOSE` command before the `CMD` command.

```Dockerfile
FROM node:14-alpine

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 80

CMD ["node", "server.js"]
```

This is the final setup for the image file. Let's now see how we can use and run it.

## Running a container based on your image

In order to run a conatiner based on your image file (Dockerfile), you are going to use the terminal at the root directory of your local project:

```
docker build .
```

The `.` at the end of this command tells Docker where it can find the Dockerfile. Dot means that the Dockerfile is located in the same directory where the terminal is running. You can see the output log as:

```
[1/4] FROM docker.io/library/node:14-alpine@sha256:434215b487a329c9e867202ff89e704d3a75e554822e07f3e0c0f9e606121b33

CACHED [2/4] WORKDIR /app

[3/4] COPY . /app

[4/4] RUN npm install
```

You can then use this command in the same terminal to run the built container:

```
docker run <image-id>
```

The project will run along with its sever file. But you see that you still cannot access the server on port `localhost:80`. Why? You have `EXPOSE 80` command in your Dockerfile, but this is only for documentation purposes. It does not really do anything. It is a good practice to add it to your Dockerfile, but you need to do more. In the `docker run` command, you have to specify on which port of your local machine you need access provided to the server inside the container. That is done by the `-p` flag. The `-p` flag receives 2 port numbers: first, the port number on your local machine from which you are going to access the container, and second, the port number that the container should expose from the server file running inside it. So the flag would be `-p 3000:80`.

Let's first stop the running container. To do this you can open another terminal at the same directory and use `docker ps` command to observe which container you need to stop right now. You want the running container's name. Then you can use this command to stop the running container. It will a few seconds.

```
docker stop <conatiner-name>
```

Then use this command to run the container:

```
docker run -p 3000:80 <image-id>
```

You can now access the server inside the running container using `localhost:3000` on your machine in a browser.

## Images are read-only

Images are read-only. Why it matters? Let's say you previously executed a container of your project on your machine, you stopped it, and now you are editing your code. You run your container again, but your don't see your last changes reflected in this newly executed container! So you changed you code, and restarted your container, so why aren't the changes showing up? To understand this you have to understand how images work.

Remember that your applications source code were copied into the `/app` folder in your container's file system. This was done by the `COPY . /app` command. This copy was a snapshot of your code at the time of copying. Now after you edit your source code, you need to rebuild your image to have your updated source code copied into the image. We will find out an elegant and faster way of doing this. So, images are read-only.

For now, to fix this problem, you can rebuild your image using the `docker build .` command again. Then run your container like before, with the new image ID.

## Image layers

Images are layer-based. When you build or re-build an image, only the instructions that have changed, along with all the instructions after them are re-evaluated.

So if you run a container based on your current image, stop the container, implement NO change, and try to rebuild the image, you will see that the image creation process is done superfast, because Docker understands that nothing has changed. So it uses everything from **cache** instead of doind them all again.

This is called a **layer-based architecture**. Each instruction in your image file is a layer. An image is based on multiple layers of instruction. When you run a conatiner based on the image, this container adds an extra layer on top of the image which is the `CMD` instruction that runs the application. Apart from this final layer, all other layers that relate originally to the image file instructions, are only re-evaluated if Docker detects a change in them.

For instance, just like the example from the previous section, if you change your source code and rebuild the image, Docker would take the `node:14-alpine` image from cache since that didn't change. But the command after that, which is the `COPY` command will be re-executed since it has changed because of the change you implemented in the source code. Also, all the commands after the copying will be re-executed, because cannot know if they will return same or different results based on the change in the source code. So if one layer is changed, all subsequent layers are re-executed.

### One important optimization potential

Imagine that you have only altered your source code and for this change, you have not added any dependencies to your project. This means that for running the application, you don't need to run the `npm install` command. But how would you tell Docker not to re-execute this command layer?

After setting up the `WORKDIR` of your image to `/app`, if you `COPY` the `package.json` file to the working directory, then `RUN npm install`, and only after that, implement `COPY . /app`, Docker could understand when it should run `npm install` and when not.

```Dockerfile
FROM node:14-alpine

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 80

CMD ["node", "server.js"]
```
