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
