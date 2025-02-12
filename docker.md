- [What is Docker?](#what-is-docker)
- [Why Docker and containers?](#why-docker-and-containers)
- [Docker desktop and toolbox](#docker-desktop-and-toolbox)
- [Docker tools and building blocks](#docker-tools-and-building-blocks)
- [Creating a simple container](#creating-a-simple-container)
- [Docker images and containers](#docker-images-and-containers)
  - [Using external (pre-built) images](#using-external-pre-built-images)
  - [Building your own image](#building-your-own-image)
  - [Running a container based on your image](#running-a-container-based-on-your-image)
  - [Images are read-only](#images-are-read-only)
  - [Image layers](#image-layers)
    - [One important optimization potential](#one-important-optimization-potential)
  - [Managing images and containers](#managing-images-and-containers)
    - [Stopping and restarting containers](#stopping-and-restarting-containers)
    - [Attached and detached containers](#attached-and-detached-containers)
    - [Entering interactive mode](#entering-interactive-mode)
    - [Deleting images and containers](#deleting-images-and-containers)
      - [Removing stopped containers automatically](#removing-stopped-containers-automatically)
  - [A look behind the scenes: inspecting images](#a-look-behind-the-scenes-inspecting-images)
  - [Copying files into and from a container](#copying-files-into-and-from-a-container)
  - [Naming and tagging containers and images](#naming-and-tagging-containers-and-images)
  - [Sharing images](#sharing-images)
    - [Pushing images to Docker hub](#pushing-images-to-docker-hub)
    - [Pulling images from Docker hub](#pulling-images-from-docker-hub)
- [Managing data and working with volumes](#managing-data-and-working-with-volumes)
  - [Data categories](#data-categories)
    - [Analyzing a real-world application](#analyzing-a-real-world-application)
  - [Volumes](#volumes)
    - [How not to use volumes](#how-not-to-use-volumes)
    - [Named volumes](#named-volumes)
  - [Bind mounts](#bind-mounts)
  - [Arguments and Environment variables](#arguments-and-environment-variables)
- [Networking cross-container communication](#networking-cross-container-communication)
  - [Three types of container communication](#three-types-of-container-communication)
    - [Container-www connection](#container-www-connection)
    - [Container-localhost connection](#container-localhost-connection)
    - [Container-container connection](#container-container-connection)
      - [Docker networks](#docker-networks)
      - [Final considerations](#final-considerations)
- [Building multi-container applications](#building-multi-container-applications)
  - [Dockerizing the database](#dockerizing-the-database)
  - [Dockerizing the backend app](#dockerizing-the-backend-app)
  - [Dockerizing the frontend](#dockerizing-the-frontend)

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

## Managing images and containers

Let's focus on core configuration features on images built into Docker:

1. Images can be **tagged**: naming the images
2. Images can be **listed**: list images created in the past
3. Images can be **analyzed**: to inspect images
4. Images can be **removed**

Let's also learn about containers:

1. Containers can be **named**
2. Containers can be **configured in detail**
3. Containers can be **listed**
4. Containers can be **removed**

> Remember that on any Docker command you can add `--help` to see all available options.

### Stopping and restarting containers

To list all the running container you can use this command:

```
docker ps
```

To list all the containers no matter if they are running or stopped, you can use this command:

```
docker ps -a
```

You can restart a stopped containerl. You don't always need to run a new container. With `docker run` you create a new container. Sometimes you don't want to create a new container. If nothing has changed about your image (dependencies and source code and other settings), you don't need to create a new container. You can simply restart an existing container. To do this you can observe stopped containers using the `docker ps -a` command. To start an already existing container which is currently stopped:

```
docker start <container-name>
```

> Staring a container this way would not freeze your current terminal session. Instead, it gets back to activate your terminal. But the application is running and your server is up. To know more about this status, go to the next section ([Attached and detached containers](#attached-and-detached-containers)).

> You can also use the `--help` on the `docker ps` command to see all available options on it.

### Attached and detached containers

You saw re-running a prevsiouly stopped container will not freeze the terminal session while also running the container. However, when you use `docker run` command, your terminal is blocked while the container is running. What happens in these situations?

This is known as being in **Attached mode** or **Detached mode**. The status you get into with `docker start` is detached mode, while the status with `docker run` is attached mode. You can configure Docker's attached or detached behavior. How are they different and why do they matter?

To understand this, let's take a look at the route handler defined in the server file:

```js
app.post("/store-goal", (req, res) => {
  const enteredGoal = req.body.goal;
  console.log(enteredGoal);
  userGoal = enteredGoal;
  res.redirect("/");
});
```

There is a `console.log` command which is executed whenever a goal is posted. However this log will only appear in the terminal that is in the attached mode, connected to the process that is running by the `docker run` command. In the other terminal connected to the process that is running by `docker start`, the terminal is in detached mode and the log does not appear. Being **attached** means that we are listening to the output of a container.

This might or might not be what you want. You might want to run a conatiner using the `docker run` command, and yet you want to remain in detached mode. You can do this using the `-d` flag on the command.

```
docker run -p 80:8000 -d <image-id>
```

The advantage of detached mode is that you can continue using the same terminal. However, if you still want to look into your running container, you can do it in 2 ways. One way is to use the `docker attach` command along with the container's name.

```
docker attach <container-name>
```

This will attach you to the container from this point on.

Another thing you can do is to print the container's logs using the `docker logs` command along with the container's name.

```
docker logs <conatiner-name>
```

This will print out all the logs that have been generated by the application ever since the container was started. Additionally, if you add the `--follow` or `-f` flag to the command, not only all the logs will be printed out, but also the terminal will enter attached mode and keep listening for the container's output logs.

### Entering interactive mode

Up to this point we have always used Docker for an example project engaged with web development, running a web server, and other processes dealing with incoming requests and stuff. That really is the main selling point of Docker, but it is not all it is used for. Docker works pretty well with other scenarios.

We are now going to use Docker for a Python application that does not in any way rely on a web server or anything like that. This project example is going to take just two user inputs, and print something based on the user inputs.

Again to run this Python application you can install Python on your local machine, but with Docker you don't need to do it. You can run the application inside its own container. And not just that, we also want to see how attached and detached terminals are considered here with this example project. The attached and detached concepts play a more important role in this example since the application needs the user to interact with it. Running the app simply in the backrgound does not work.

Let's first Dockerize the project. Again, let's create a Dockerfile in the root directory of the project.

```Dockerfile
FROM python

WORKDIR /app

COPY . /app

CMD ["python", "rng.py"]
```

Then run the `docker build` command in a terminal session running at the root directory of your local project.

```
docker build .
```

Wait until everything is fetched and the image is created. Then to run a container based on this image, you can again use the `docker run` command. However, since there is no networking matter going on here, you don't need to expose ports and connect to them. But running the command like the one below will return with an error and you will not be able to interact with the application.

```
docker run <image-id>
```

It is true that `docker run` command will keep you attached to the container, so you can listen to outputs printed by the container, but you are not attached to the container in the sense of being able to interact with it. To solve this problem, you can use two flags with this command:

1. `--interactive` or `-i`: This will keep the Standard Input (STDIN) open even if not attached to the container. So you will be able to insert inputs to the container.
2. `--tty` or `-t`: Allocates a pseudo-TTY, meaning that it creates a terminal.

Combining the two flags, we will be able to input something to the container, and we will also have a terminal exposed by the container which is where we enter the input.

> The two flags can be combined into one flag with `-it` syntax.

```
docker run -it <image-id>
```

This will no longer crash in error. It will wait for your input based on the application logic. Once the program is finished executing its logics, the container terminates its process and is no longer live. If you restart the container with its name and the `docker start` command, you will enter detached mode while the container is running. You will not be able to communicate with the running container. How to solve this? There are 2 ways.

You can stop and restart the container using the `-a` flag:

```
docker start -a <container name>
```

However, this will cause the progarm to behave strangly in respect to the its input receiving logic. It is not right. The other way to go is to combine the `-a` flag and `-i` flag.

```
docker start -ai <container-name>
```

This will run the container in the correct interactive and attached mode. This example makes it clear that the attached mode is not just needed for projects where we need to listen to container's outputs, but it is essentially necessary for applications that need to establish interactions through a terminal session. Docker is not just about web servers, web applications and long-running processes. Docker is also about Dockerizing simple utility applications, which needs inputs and produces some outputs.

### Deleting images and containers

As you use Docker and create images and start and stop running containers, you might very well end up with a long list of containers and images on your machine. It is a good idea to clean up from time to time to remove containers that you don't need anymore.

You can remove containers using the `docker rm` command. You can insert multiple container names after this command, each separated by a space from the next, and you will remove them all by one command:

```
docker rm <container-name> <container-name> <container-name>
```

> You cannot use this command to remove a currently running container. This will return with an error. You first need to stop a running container.

We will discover a more elegant way of removing containers that are no longer needed.

Remember you can observe the list of containers on your machine using the `docker ps` command? Well, you can also observe the list of the images existing on your machine by using this command:

```
docker images
```

To remove images from your local machine, you can use this command, for which you can also insert multiple image IDs to remove them in one go.

```
docker rmi <image-id> <image-id> <image-id>
```

> You can only delete images if they are not being used by any running or stopped container. If there is a container that uses an image even if the container is stopped, you first need to remove the container in order to be able to remove the image.

To remove all the images that are not being used by running containers (only running containers?) at the moment, you can use this command:

```
docker image prune
```

#### Removing stopped containers automatically

If you want to run a container but also remove it once it has stopped, you can use the `--rm` flag on the `docker run` command.

```
docker run -p 3000:80 --rm <image-id>
```

Using this command makes sense especially if your container contains a Node server application, where you only stop your container if your code changed, which means that you also need to rebuild your image and start a new container anyway.

## A look behind the scenes: inspecting images

An image contains an application's code and its environment. This is the reason why an image file is usually rethar large in size. The container that runs based on this image file is not that big in size. It is just an extra thin layer above the image. Multiple containers running based on the same image, will share and use the code inside that single image, they will not get their own instance of the code.

If you want to inspect deeper into an image file, you can use this command along with the image ID:

```
docker image inspect <image-id>
```

This returns with a long record of information about the image.

## Copying files into and from a container

You know how to look into an image. But what if you want to look into a container? And not just looking into it, but also add something to or extract something from it.

The `docker cp` command allows you to copy files or folders into a running container or out of a running container. Let's create a folder called `dummy` in the root directory of your project. Then create simple text file `test.txt` in it and write `hello!`.

This file is located on your local machine. It is not inside the container. To copy this file into a running container you can use this command:

```
docker cp dummy/. <container-name>:/test
```

The `docker cp` command receives two arguments: first, the source path from where some files are going to be copied, and second, the destination path inside the container where the files will be copied to.

> The source path in the `docker cp` command can refer to a particular file located inside a folder using this syntax: `dummy/test.txt` or it can refer to everything inside a folder with this syntax: `dummy/.`.

Now how can you confirm that the copying is really executed? You can delete the `test.txt` file and use the copy command with reversed source and destination paths in the syntax:

```
docker cp <container-name>:/test dummy
```

Execute the command and you will see that the text file you just deleted is brought back to your local directory. It is coming from the container. But how is this command useful in any way? There are a couple of things you can do with it:

1. It allows you to add something to a container without restarting the container and rebuilding the image. Let's say you are developing your source code. Normally, you would want to rebuild your image because of that, and restart the container. However, you can also just copy the changed code to the container. But this is not something you do typically because it is very prune to error. You might very easily forget to copy one or more files, and you will end up with an application that behaves strangely. You will learn a better way of updating code in a container without rebuilding the image later...
2. Updating configuration files for a web server which you want to change.
3. Copying something out of a container. If your container generates a bunch of log files, you could use the command to copy these log files to your local machine so you can read them there.

## Naming and tagging containers and images

Up until now, you have always used an ID when you need to refer to an image. You can tag an image and refer to that image by its tag. When you create your own images, they will appear in `docker images` returned list with `REPOSITORY` and `TAG` columns holding `<none>` as value. Also, when you run a conatiner based on an image, the created container gets a randomly generated name.

You can manually give tags to your images. You can manually assign names to your containers. Let's start with containers. You can give containers your custom name using the `--name` flag on the `docker run` command:

```
docker run -p 80:3000 --rm -d --name goalsapp 4f382e3a7047
```

Then you can stop this container with the name that you already know about:

```
docker stop goalsapp
```

For images, when you create them using the `docker build .` command, they are given a randomly generated ID. You can also tag images. It works similar to names for containers. However, an image tag consists of 2 parts:

1. Name: repository of your image, acting as a group name if you are going to have different, more specialized images (determined by tags).
2. Tag: the tag name is separated from the repository name by a `:`.

Why an image tag should consist of 2 parts? Because of a simple reason: With the name part, you can create a group of images. For example, the NodeJS image tag can be `node:14`. For public pre-built images existing on Docker hub, you can go to their page to see which tags are supported.

To specify a tag for an image that you are going to create, you can use the `-t` flag along with the tag on the `docker build` command:

```
docker build -t goals:latest .
```

You can now run a container based on this image using this command:

```
docker run -p 80:3000 --rm -d --name goalsapp <image-tag>
docker run -p 80:3000 --rm -d --name goalsapp goals:latest
```

## Sharing images

You can share your images and containers with others. This 'others' could be other members of your team, or servers on which you want to deploy your containers. We well talk about deployment later.

Everyone who has an image, can create containers based on the image. So you don't really share containers, but you share images with other people.

### Pushing images to Docker hub

When it comes to sharing images you have 2 ways of doing it:

1. You can share the Dockerfile. If you have the Dockerfile and the source code of an application you can build your own image (using `docker build .`) and use it to run a container. This is not happening when you are basing your image on, for example, the Node official image. You are not downloading the Node's Dockerfile.
2. You can share a built image. This way the image can be downloaded and a conatiner can be executed instantly; no build step required. This is how you typically share images with other people. To share Docker images, you can push them to Docker hub or any private registry of your choice. To do this you can push and pull images by using these commands:

```
docker push <image-name>
docker pull <image-name>
```

For example, if you want to share your Node example project, you can go to Docker hub and create a new empty repository. You should then establish a link between the remote repository on Docker hub and your local Docker system. To do this, your image name should consist of two parts:

1. Your Docker hub username followed by a `/`
2. The repository name you created on Docker hub

So you would have to build an image with this name for example:

```
omidarmat/node-hello-world
```

So you can either build your image and give it the proper name using the `-t` flag on `docker build` command. Or you can observe your previously created images and take the one that you want to push, rename or tag it with the proper name using the `docker tag` command. This command takes first, the image tag that already exists on your machine, and second, the image tag or name that you want to give it.

```
docker tag goals:latest omidarmat/node-hello-world
```

This would essentially create a clone from the image that exists on your machine.

> You can also optionally provide a tag with `:` for the new image name.

Then you can push this image using the `docker push` command.

```
docker push omidarmat/node-hello-world
```

However, this command might return with an 'Access denied' error. Your local Docker system does not know if you are in any way related to the remote repository to which you are pushing. So you would have to log in first.

```
docker login
```

This will then ask you for your `Username`. (omidarmat)

Then you will be asked for your `Password`.

> You might not need to do this login process if you logged in to Docker hub via Github.

Finally, you can push your image to Docker hub using the `docker push` command.

### Pulling images from Docker hub

To simulate using your shared image by others, go on and remove all the images on your local machine using this command:

```
docker image prune -a
```

Let's now download the image that you pushed in the previous section.

```
docker pull omidarmat/node-hello-world
```

You will see in the process logs that Docker will, by default, use the `latest` tag on this image.

> Pulling public images from Docker hub does not require you to be logged in.

You can ignore using the `docker pull` command to download an image and then run a conainer based on it. You can directly use `docker run` command with the image's name. Docker will first look into your machine and if it does not find an image with the given name, it will automatically go to Dockerhub and grab the image and pull it on to your system, and then it will run a container based on it. So you could simply write this even if the image does not exist on your machine:

```
docker run omidarmat/node-hello-world
```

> If you have an image with the same name on your machine, Docker will not check if your local image is up-to-date and in sync with the latest version of the image available on Docker hub. In this case, you would have to first get the updated image using `docker pull` and then run your container on it.

# Managing data and working with volumes

You have now learned about images and containers. Now you are going to learn how to manage your data inside images and containers. Of course, we already had data in our images and containers up to this point, for example, the code. But turns out that there are different kinds of data. We will face problems with the other kinds of data.

So you are going to learn how images and containers can **manage data** in different ways and how you can connect to different folders. You will specifically learn about the concept of **volumes**. You are also going to learn about **arguments** and **environment variables**, and see how you can use them in images and containers.

## Data categories

There are different kinds of data:

1. Application: code and environment which is written and provided by you (as developer) and added to an image and container during the `build` phase. Once this data is added to the image, it is fixed and cannot be changed; images are **read-only**. So this data is only stored in an image.
2. Temporary application data: this is mainly application user inputs. This data is fetched and produced during the time that the container is running. It is stored in memory or temporary files. This kind of data is **dynamic** and changing (**read-write**), and it is also cleared regularly. So this data is stored in the container.
3. Permanent application data: this can be user accounts stored typically in a database. This kind of data needs to persist. This kind of data is fetched and produced during the time that the container is running. It is stored in files or a database. This data must not be lost if the container stops or restarts. This is also a **read-write** data, it should be permanent and it is stored in **containers** with the help of **volumes**. Volumes is a key concept built into Docker.

Here is a summary table:

![docker](/images/docker/docker-01.jpg)

### Analyzing a real-world application

This example project is about a NodeJS server file that receives user feedback and store it. You can Dockerize the application and run it by creating this Dockerfile in the projects root directory:

```Dockerfile
FROM node:14-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 80
CMD ["node", "server.js"]
```

You can then build your image and give it a name:

```
docker build -t feedback-node .
```

Then you can run a container based on it:

```
docker run -p 3000:80 -d --name feedback-app --rm feedback-node
```

When this applications, you can submit a feedback to it. This will store your feedback in the `feedbacks` path in a `txt` file named by the title of your feedback. So if you submit a feedback with the title _Awesome_, you can access that feedback on `localhost:3000/feedback/awesome.txt`. However, you will not be able to see this file on your local project's `feedback` folder. Why? This data is stored in the container's file system, not on your local machine's file system. The container has the structure of your local project's file system (because of `COPY . .` command), but everything is now happening inside the container, and therefore files fetched by the running container are stored in the container's file system and not leaked outside. Now if you stop this container, because of the `--rm` flag in it running command, it will be removed and therefore all the data stored in it will also be removed. But if you stop a container, not remove it, run it again and you will still have that data inside your container.

> Reminder: The same kind of thing happens when you change something in your source code and, by default, the container will not reflect that until the image is rebuilt with the new source code.

So it is very important to review and keep in mind: **THERE IS NO CONNECTION BETWEEN YOUR IMAGE/CONTAINER AND YOUR LOCAL FILE SYSTEM. YOU INITIALIZE THE IMAGE ONCE, YOU COPY A SNAPSHOT OF YOUR FILES TO THE IMAGE, BUT THEREAFTER THERE IS NO CONNECTION BETWEEN THEM.**

So the main problem is that when a container is removed, all data stored on it while running, will be removed with it. However, in reality you are going to remove containers quite a bit, but you also don't want to lose that data. What is the solution? Let's learn about Docker **volumes**.

## Volumes

Volumes help us with persisting data. But let's understand what volumes are and how they work.

Volumes are folders on your host machine - your computer (not in the container, not in the image) - which are mounted - meaning that is made available or mapped - into containers. You make Docker aware of volumes and they will be mapped to folders inside a container. Changes in either of these folders will be reflected in the other one.

> This is different from the `COPY . .` command result. The copy instruction takes just a snapshot from your local file system and put it inside a container.

Because of this mechanism, volumes allow you to persist data. Volumes persist and continue to exist even if a container is shut down and removed. If you add a volume to a container, the volume will not be removed when its container is removed. Containers can write data to and read data from volumes.

### How not to use volumes

One of the easiest ways of adding a volume is to add a instruction to the Dockerfile. You can use the `VOLUME` command. This command takes in an array of strings, which specify the different paths inside a container file system.

In the example project, we store feedback text files inside the `feedback` folder inside the container. So since the working directory of the container is the `/app` folder, the feedback folder would have to be referred to by `/app/feedback`:

```Dockerfile
FROM node:14-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 80
VOLUME ["/app/feedback"]
CMD ["node", "server.js"]
```

The path inserted into the `VOLUME` command refers to the **container's** file system. How can you control the destination path on your local machine? We can control it or we can let Docker control it. In this example, we will let Docker do it. So you can now rebuild your image with this Dockerfile and run a container on it:

```
docker build -t feedback-node:volumus .
docker run -d -p 3000:80 --rm --name feedback-app feedback-node:volumus
```

You can now access the app on `localhost:3000` and submit an entry. However, if you stop and remove this container, and run another container on the same image, you will see that you lost the data again! So how is this `VOLUME` thing helping us preserving the data?

### Named volumes

With Docker we have two external data storage mechanisms: **Volumes** and **Bind mounts**. Let's focus on volumes now.

There are two types of volumes. Currently, we are using **anonymous** volumes. We also have **named** volumes. In both cases, Docker sets up some folder and path on your local machine (you don't know where when it is anonymous), and the only way for us to get access to these volumes is with the help of `docker volume ls` command. Using it right now will return a table with one single volume with an encrypted name, because we didn't give a name to the volume. Note that this volume is there as long as your container is existent. If you remove the container, you will lose this volume.

Now let's go for named volumes. Both anonymous and named volumes share one key concept (also in common with mounts). As a reminder, a volume is a defined path in the container that is mapped to some specific path on your local machine. For instance, `/some-path` on your local machine is mapped to `/app/data` on the container. This helpful, but if only the volumes could survive container deletions. The good news is that, with named volumes, that can happen. Named volumes survive container terminations. **Therefore, named volumes are great for data that should be persistent, but which you don't need to edit directly.**

You cannot create a named volume inside a Dockerfile. So you can safely remove the `VOLUME` command. Instead, you need to create a named volume when you create a container. To do this you can use the `-v` flag on the `docker run` command. This flag receives first, the volume name, and second, the path in the container to where the volume mapping is attached. The two parts must be separated by a `:`.

```
docker run -d -p 3000:80 --rm --name feedback-app -v feedback:/app/feedback feedback-node:volumus
```

Now if you stop and remove this container, you can see that `docker volumes ls` command will show you that the volume is still there. So if you run another container with the same name and conatiner path for the `-v` flag, you will see that you still have access to the data that was created during the time that the previous container was live.

## Bind mounts

Bind mountes can help us with a different problem. Remember if you change your source code while a container is running, those changes will not be reflected in your application unless you stop that container, rebuild your image and run another container on it. But during development this would be a pain in the ass! This is where bind mountes come to help.

Bind mounts have some similarities with volumes, but there is one key difference. Where volumes are managed with Docker and we don't really know where on our local machine they are, with bind mounts we do know where they are, because we, as developers, set the path to which the container's internal path should be mapped on our local machine. So you can put your source code into a bind mount, and make sure that the container is aware of that bind mount, and that the source code is not copied as a snapshot by the `COPY . .`, but instead from the bind mount. This way, the container will have always have access to the latest version of the source code.

So in conclusion, bind mounts are great for persistent, editable (by you) data; that is, the source code. Again compare it to volumes. Volumes are great for persistent data, but editing that data is not really possible.

But how can we add a bind mount? Again, since a bind mount is related to a container and not an image, it cannot be implemented in the Dockerfile. Instead, it should be implemented in the terminal for the `docker run` command. To do this, you would have to insert another `-v` flag to the command. This one, receives first, the absolute path to the directory of source code, then a `:`, and finally, the path in the container to which you want to map your local source code directory. So this would be the command:

```
docker run -d -p 3000:80 --rm --name feedback-app -v feedback:/app/feedback -v "C:\Users\omida\Desktop\docker-practice
\047-data-volumes-01-starting-setup\data-volumes-01-starting-setup:/app" feedback-node:volumus
```

> Note that there are two `-v` flags. The first one is a named volume to persist user input data. The second one is a bind mount to track source code changes.

> If the absolute path to the local source code directory has some special characters or some white spaces, you might want to wrap the whole bind mount flag value inside `" "`.

> There is one important thing to remember: You should make sure Docker has access to the directory which you are sharing as a bind mount. You can do this by accessing the `Settings` of Docker, and going under `Resources` section. (You probably don't need to do anything if you are on windows.)

Now if you run this command, you see that the container will not start. Actually, the container seems to start and shut down immediately afterwards. You can re-run the container without the `--rm` flag in order to preserve it even if it shuts down. Then inspect the container's logs using the `docker logs feedback-app`.

You will see that Docker has failed because it could not find the `express` module. What is wrong? This has something to do with the bind mount.

Remember what we did with the bind mount command? We copied everything inside the project root directory to the `/app` directory inside the container. We are actually replacing everything inside `/app` of the container with everything inside the project's root directory. So this command is actually overwriting three layers of Dockerfile commands:

```Dockerfile
COPY package.json .
RUN npm install
COPY . .
```

We are actually getting rid of the `node_modules` folder in the container's `/app` directory. We don't have the `node_modules` folder in our local directory either. So the `/app` directory inside the container will lose it also, and it would have none of the dependencies the applciation needs. How should you fix it?

We can tell Docker that there are certain parts inside the container's file system that should not be overwritten from outside - in case we have such a clash. This is done by an **anonymous volume**. This is done by adding yet another `-v` flag to the `docker run` command. Look at the final `-v` flag:

```
docker run -d -p 3000:80 --rm --name feedback-app -v feedback:/app/feedback -v "C:\Users\omida\Desktop\docker-practice\047 data-volumes-01-starting-setup\data-volumes-01-starting-setup:/app" -v /app/node_modules feedback-node:volumus
```

> Note that with bind mount in place, you actually don't need to include the `COPY . .` command layer inside the Dockerfile. However, we only use the bind mound in the terminal command when we are developing the project. Remember that we use bind mount to reflect source code changes in the running container. In production, there would be no code changes, so you would not need a bind mount. In production you always want a snapshot of your code in the running container.

> You don't actually need to `COPY` everything (`.`) from your local project directory into the image. You can safely ignore some files by listing them inside a `.dockerignore` file that you can create inside the root directory of your project. For instance, you almost always want to ignore the `node_modules` folder if you have executed `npm install` on your local project.

```
<!-- .dockerignore -->
node_modules
```

## Arguments and Environment variables

Docker supports **build-time** arguments (ARG) and runtime environment variables (ENV).

Arguments allow you to set flexible bits of data (variables) in your Dockerfile which you can use to plug different values into certain Dockerfile instructions based on arguments that are provided with the `--build-arg` flag.

Environment variables are available inside a Dockerfile and also in application code. You can set them with the `ENV` command inside a Dockerfile, and then provide concrete values for that environment variable with the `--env` option on `docker run` command.

Environment variables and arguments allow you to build more flexible images and containers, because you won't have to hardcode everything into them. Instead, you can set them **dynamically** when you build an image or run a container.

As an example, in the source code of the `server.js` file of the sample project, you see this code:

```js
app.listen(80);
```

The port on which a webserver listens for requests can be set via an environment variable. You can replace the hardcoded `80` with an environment variable in your code using `process.env.PORT`, and then set it using Docker. So you can update the code above as:

```js
app.listen(process.env.PORT);
```

Now to set the `PORT` environment variable with Docker, you can announce it in the Dockerfile.

```Dockerfile
# other command layers
COPY . .
ENV PORT 80
EXPOSE $PORT
```

You can now rebuild your image:

```
docker build -t feedback-node:env .
```

And then run a container again:

```
docker run -d --rm -p 3000:80 --name feedback-app -v feedback:/app/feedback -v "..." -v /app/node_modules -v /app/temp feedback-node:env
```

But you are not limited to the value you have set for `ENV PORT` in the Dockerfile. You can stop this container, and set another value (for example, `8000`) for it when you are running another container using the `--env` flag on `docker run` command.

```
docker run -d --rm -p 3000:8000 --env PORT=8000 --name feedback-app -v feedback:/app/feedback -v "..." -v /app/node_modules -v /app/temp feedback-node:env
```

And note that you don't need to rebuild your image since you didn't change your Dockerfile. You set the environment variable in the terminal run command.

> You can also use `-e` instead of `--env`. You can also use multiple `-e` or `--env` flags if you need to set multiple environment variables. You can also set your environment variables in an `.env` file located at the root directory of your project, and then refer to the file using the `--env-file` flag on the `docker run` command. This is probably the best way to go.

```
docker run -d --rm -p 3000:8000 --env-file ./.env --name feedback-app -v feedback:/app/feedback -v "..." -v /app/node_modules -v /app/temp feedback-node:env
```

Now let's see how we can use arguments in connection with environment variables. You set the `ENV PORT` to `80` in the Dockerfile. It is a hardcoded default value. You can still make `80` be dynamically accepted by Docker using arguments.

```Dockerfile
# other commands
ARG DEFAULT_PORT=80
ENV PORT $DEFAULT_PORT
EXPOSE $PORT
# other commands
```

You can now build more than one instances for your image, each for a different mode; `web-app` and `dev`. The `DEFAULT_VALUE` provided to the Dockerfile can be used for the `web-app` image, and for the `dev` image you can set a different default value using the `--build-arg` flag on the `docker build` command.

```
docker build -t feedback-node:web-app .
docker build -t feedback-node:dev --build-arg DEFAULT_PORT=8000 .
```

So now you have two images based on the same Dockerfile. You can now be more flexible in creating images.

# Networking cross-container communication

Now that you know how you can persist data with containers, you need to learn about networks and how you can network multiple containers and make them communicate with each other. This section is mainly concerned with connecting containers to external networks, and also connecting containers together.

## Three types of container communication

### Container-www connection

Imagine you have a container with your application inside it, and this application needs to talk to an API at some URL like `some-api.com/` out in the WWW. So your application needs to be able to send requests to the API on the web.

### Container-localhost connection

Sending HTTP requests is not the only type of connection needed for a Dockerized app inside a conatiner. Your application might also need to communicate with some other service on your local machine which might not be Dockerized.

Take the example project of this section as example. This project is a web application running on our local machine, connecting to a database that is also running on our local machine. It also connects to an API on the web, but we don't need to wory about that since it already works fine and we don't need to do anything about it.

At this stage, we want to Dockerizing our web server application. So our web application will run inside a container, but the database would still be live on our local machine and not inside a container. In other words, the database will not be Dockerized in this example. We will take care of that in the next part. We just want to establish a connection between a Dockerized web application and a non-Dockerized database running on the local machine.

Let's build an image based on the Dockerfile existing inside the project files:

```Dockerfile
FROM node
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD ["node", "app.js"]
```

Using this terminal command:

```
docker build -t favorites-node
```

> We didn't provide a tag for the image name, so we are actually using `latest` as default tag.

Then run a container on this image:

```
docker run --name favorites --rm -p 3000:3000 favorites-node
```

Your container will start and crash immediately. You can see the error since we did not use the `-d` flag on the `docker run` command. It is due to database connection failure. So the application inside the container could not connect to our database running on our local machine. You can inspect the server code and you see that we are trying to connect the server to database using connection URL `mongodb://localhost:27017/swfavorites`. This connection was not successful and therefore the the `app.listen(3000)` code did not execute, which in turn, caused the container to crash. How can we establish this connection?

It turnes out that for this type of communication, Docker is capable of parsing and understanding `host.docker.internal` string in the connection URL used to connect to a locally running database. Go ahead and replace `localhost` with this domain, and it will be translated to `localhost` by Docker: `mongodb://host.docker.internal:27017/swfavorites`

```js
mongoose.connect(
  "mongodb://host.docker.internal:27017/swfavorites",
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(3000);
    }
  }
);
```

Obviously, for this to work, you need to have the MongoDB server installed and running on your machine. The other better way to make this whole application work, is to have the MongoDB server run inside another container. This way, you would have to establish connection between two containers; one container for your web application, and one for your database instance. This leads us to the 3rd type of communitaion, which is container-container connection.

### Container-container connection

Your application in a container might need to communicate with another application in another container. For example, your web server application might want to talk to a database instance running in another container. Building applications with multiple containers is quite a common scenario. This will free you from having to install the database server manually on your local machine. Docker container of the database will take care of that.

> With Docker containers it is strongly recommended that each container be responsible for only one thing. So your server application must run in one container, and your database in another.

So now, for the first time, we are going to create and run 2 containers at the same time, and these two containers should be able to communicate with each other.

To run a container for MongoDB, you don't need to write a Dockerfile and create an image based on it. The MongoDB image file is available on Docker hub, ready to be downloaded and used. That is an official MongoDB image. So let's run a container based on this official image:

```
docker run -d --name mongodb mongo
```

You can observe the running container using the `docker ps` command. You now need to alter the web application code to be able to connect to this database container. This is the tricky part. Referring back to the previous section, `host.docker.internal` no longer works in this scenario. You can use the `docker container inspect` command to inspect the database container we just executed:

```
docker container inspect mongodb
```

In the information returned by this command, you should be able to find an `IPAddress`under`NetworkSettings` property. It is something like `172.17.0.2`. This is the IP address of the database container. You can use it to connect to this container. Go ahead and replace `host.docker.internal` string with this IP address in the database connection URL in the server code.

```js
mongoose.connect(
  "mongodb://172.17.0.2:27017/swfavorites",
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(3000);
    }
  }
);
```

You can now rebuild the web server application image, since you just altered its source code, and then run a container on it.

```
docker build -t favorites-node .
docker run --name favorites -d --rm -p 3000:3000 favorites-node
```

You should now be able to observer two containers running on your machine that are actively communicating with each other. However, it was not quite a convenient process to go through, since we had to inspect into the database container to find the IP address, and then replace it in the connection URL, and in turn, rebuild your server application image frequently. There should be a more elegant way of doing this. It turnes out there is: **Docker networks**.

#### Docker networks

With Docker, you can create networks. When you have multiple containers, you can put all these containers in a network by inserting `--network` option on the `docker run` command. This will automatically perform IP lookup and resolving process (we did it manually in the previous section) to create a network through which containers can connect to each other.

To implement this networking system of Docker, go ahead, stop and remove both conatiners first. Now let's start MongoDB image container with the `--network` flag. Now there is a twist here. Unlike volumes, that are automatically created when you use `-v` flag in the `docker run` command, you have to create networks manually before you run a networked container. So you first need to use `docker network create` command to create a network and assign a name to it.

```
docker network create <network-name>
docker network create favorites-net
```

You can also observe your networks using the `docker network ls` command. You will see some default networks created by Docker, which you can ignore.

You can then refer to your network in the `docker run` command.

```
docker run -d --name mongodb --network favorites-net mongo
```

Now your database container is running and connected to your network. Now if you run your server application container also connected to this network, how will these containers be able to talk to each other? We should somehow get rid of hardcoding `172.17.0.2` IP address of the database from the connection URL. Docker should automatically configure that for us. It turnes out this is pretty simple. If two containers are parts of the same network, you can simply refer a container by mentioning its name. So in the connection URL, you would just have to write the database container's name which is `mongodb` as you named it when running it.

```js
mongoose.connect(
  "mongodb://mongodb:27017/swfavorites",
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(3000);
    }
  }
);
```

Docker will automatically translate `mongodb` to the database container's IP address.

> It is important to understand here that Docker will NOT alter your source code under the hood. It will not change `mongodb` in your connection URL. Instead, Docker owns the environment in which your application runs. So if an HTTP request leaves your application's continer, Docker detects it and then, it will parse and understand your URL.

You can now rebuild your server application image since you altered its code:

```
docker build -t favorites-node .
```

And then run a conatiner on it, this time putting this container in the `favorites-net` network too. Remember both containers should be parts of the same network.

```
docker run --name favorites --network favorites-net -d --rm -p 3000:3000 favorites-node
```

> In the `docker run` command for a container, you only need to expose connection ports if you need to connect to that container from your local machine. Note that we didn't need to expose a connection port for the the database container, since we didn't need to connect to this container from our local machine. The database containers was only meant to be accessed by our web application container and this connection is established via Docker network.

#### Final considerations

There are some matters for which you can optimize this network of containers a bit. For instance, you always lose
all the data stored in the database whenever you shut down its container. You can fix this with volumes. But we will deal with this and some other things when we are going to build a multi-container application in the next section.

# Building multi-container applications

We are now going to build a more realistic application. Most applications involve multi services running on separate containers: database, backend web server, frontend. You are now going to practice what you learned in the previous section. You are not going to learn anything new here.

The example project that we are going to work on in this section involves three parts:

1. Database: A MongoDB database that stores data generated by our application
2. Backend web app: A NodeJS REST API that exposes no GUI, but simply accepts and returns simple JSON data
3. Frontend app: A React SPA

This is pretty common pattern in designing different parts of a whole project. Our backend web app will comminucate with the database, and our frontend app will communicate with the backend web app. Here is the overall file structure of the application:

```
root:
+ backend
+ frontend
```

To run this whole application without any use of Docker, you would have to first, move into the `backend` directory and run `npm install`. Then you can run `node app.js` to run the backend application. In a second terminal, you can move into the `frontend` directory, and again run `npm install`. Then you can run the frontend app using `npm start` to (utilize a 3rd-party package under the hood and) run the app. Notice that these two processes are fully detached from each other and they are not connected by default.

You can now access the fronend app on `localhost:3000`. The backend app is running on `localhost:80`. You must also have MongoDB server installed and running on your machine for the whole packaged application to work. However, having to do this all manually is really frustrating. We can do this using Docker.

To Dockerize the whole application you will have three containers:

1. Database: Data should survive on container removal. Also, access to the database should be limited to specific users. The official Mongo database image that we are going to use gives us the option to add user access credentials.
2. Backend: Data should survive on container removal, not user input data that are going to be stored on database, but the logs that are generated by the backend application. These are stored in `access.log` file located inside `/logs` directory at the project root. This file should persist and should not be lost if the backend container is stopped and removed. In addition, for more convenient development process, source code changes should be immediately reflected in the running container.
3. Frontend: Again for more convenient development process, source code changes should be immediately reflected in the running container.

You don't need to learn anything new to implement all these requirements in Dockerizing this project, but it would be very challenging since there are a lot of requirements and syncing them together might be really hard.

## Dockerizing the database

Let's go for it. First, let's run a container for the database. We are going to use the official Mongo image according to all the requirements we mentioned. There is one important twist here. For this current stage, since the backend app is not yet Dockerized, it will still try to access the database on `mongodb://localhost:27017/course-goals` as indicated in the backend `app.js` file. To make this work, we would have to publish a `27017` port from the database container to the same port of our local machine. So we would have to use the `-p` flag in the `docker run` command for the database container.

> Remember that we can only do this if the Mongo official image does expose this port for us, and it turnes out it does. Refer to Mongo official page on Docker hub.

```
docker run --name mongodb --rm -d -p 27017:27017 mongo
```

If you now want to try the project to see if backend and database can communicate with each other, you should stop and restart the node server in its terminal.

## Dockerizing the backend app

To dockerize the backend app, you should first create a `Dockerfile` in the backend root. Let's now write the command layers:

```Dockerfile
FROM node:14-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 80
CMD ["node", "app.js"]
```

Before you go on and build your image file based on this Dockerfile, you must update your backend code to account for the Dockerized backend, because the backend code is still compliant with the non-Dockerized locally-running backend app. It still tries to connect to the database container throught `mongodb://localhost:27017/course-goals`. This needs to change. Currently, since we are exposing the `27017` port from the Mongo container to our local machine's `27017` port, the connection between the database and the backend app would be stablished based on a container-localhost connection type. So you are good to go with `host.docker.internal` in the database connection URL.

```js
mongoose.connect(
  "mongodb://host.docker.internal:27017/course-goals",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error("FAILED TO CONNECT TO MONGODB");
      console.error(err);
    } else {
      console.log("CONNECTED TO MONGODB");
      app.listen(80);
    }
  }
);
```

Let's now build an image based on the backend Dockerfile:

```
docker build -t goals-node .
```

And now you can run a container on it. We need to consider the requirements.

```
docker run --name goals-backend --rm goals-node
```

Everything works fine and database connection is successfully established. But now we have another problem. The frontend app cannot connect to the backend container, since we did not expose any port from the backend container. So let's stop the current backend container.

```
docker run --name goals-backend --rm -d -p 80:80 goals-node
```

Now the frontend non-Dockerized locally-running app can connect to the backrnd app on port `80`.

## Dockerizing the frontend

Create a Dockerfile first in the project root. Let's now write command layers:

```Dockerfile
FROM node:14-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

> The last command `CMD` runs a script attached to a 3rd-party library that was installed by the `RUN npm install` command.

You can now build your image:

```
docker build -t goals-react .
```

Then run a container on this image:

```
docker run --name goals-frontend --rm -d goals-react
```

[continue from 4:43 of 088 video]
