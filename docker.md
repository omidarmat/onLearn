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

```docker
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
