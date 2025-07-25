# Building Nginx from source

First, don't forget to update your system:

```
sudo apt-get update
```

Head to `nginx.org` and navigate to `download` page. You will be using the **Mainline version** and copy the source code link to use it in terminal:

```
wget [download-link]
```

This will get you a `tar.gz` file which you can then extract using this command:

```
tar -zxvf nginx-1.13.10.tar.gz
```

Within the extracted directory, the first step is to configure the source code for the build. To do this you should use the `./configure` script in this source code directory. The problem is that when you try to execute this file using this command:

```
./configure
```

You will probably receive an error saying "C compiler cc is not found." So you would have to install a C compiler. To do this you can use:

```
apt-get install build-essentials
```

If you now compile Nginx again, you will see another error saying `the HTTP rewrite module requires the PCRE library`. This is the regular flow of building Nginx from source.

Now to install this along with some other important libraries you can use:

```
suto apt-get install libpcre3 libpcre3-dev zlib1g zlib1g-dev libssl-dev
```

Now running `./configure` will get done with no errors. This means that you can now compile the source code. However, before that, you still need to add some custom configuration flags. You can see a list of available flags using `./configure --help`. You can also find more information on them on `nginx.org` navigated to `documentation` page, and then to _Building nginx from srouce_ section.

Let's now set a few common flags on the configuration:

```
.configure --sbin-path=/usr/bin/nginx --conf-path=/etc/nginx/nginx.conf --error-log-path=var/log/nginx/error.log http-log-path=var/log/nginx/access.log --with-pcre --pid-path=/var/run/nginx.pid
```

where:

- `--sbin-path=/usr/bin/nginx` refers to the location of nginx executable which is used to start and stop nginx servers. The `usr/bin` is the conventional path in Ubuntu for executables.
- `--conf-path=/etc/nginx/nginx.conf` refers to the location on nginx configuration files.
- `--error-log-path=var/log/nginx/error.log` and `http-log-path=var/log/nginx/access.log` refer to the location of error and access log files.
- `--with-pcre` tells nginx to use the system's PCRE library for regular expressions.
- `--pid-path=/var/run/nginx.pid` refers to the process ID path which we need to know when configuring an nginx system service later on.

> The main benefit of building nginx from source is that you can add custom modules like `pagespeed` and `SSL`, or to essentially extend nginx functionality.

> Nginx modules exist in 2 forms: **bundled modeules** (like `gzip`, `spdy`, `ssl`, `geoip`) that come with the nginx source itself, and **3rd-party modules**. This 3rd-party modules are developed and maintained by 3rd-party developers and need to be downloaded and compiled with nginx to use.

You can also add bundled modules using additional flags in the `./configure` command. You can see a comprehensive list of availabled modules by navigating to `documentation` page of `ngingx.org` and scrolling to the _Modules reference_ section.

We are now going to use the `ssl` bundled module, enabling you to use HTTPS on your web server. This modules is actually the reason for which we installd `libssl-dev` library before. To add this, you can use the `--with-http_ssl_module` flag.

```
.configure --sbin-path=/usr/bin/nginx --conf-path=/etc/nginx/nginx.conf --error-log-path=var/log/nginx/error.log http-log-path=var/log/nginx/access.log --with-pcre --pid-path=/var/run/nginx.pid --with-http_ssl_module
```

This will complete configuration process with no errors.

You can now compile this configuration using `make` command. This might take quite a bit of time. You can then install the compiled source using `make install`.

To check if configuration files exist in the location you configured before:

```
ls -l /etc/nginx
```

You should see a list of all nginx files. You should also be able to see your nginx version with:

```
nginx -V
```

You can now run nginx using the simple command below. No errors should occure.

```
nginx
```

To check the nginx running process by:

```
ps aux | grep nginx
```

You can also navigate to the IP address assigned to your machine (might be `167.99.93.26`) to see if nginx is actually serving the holding page. Nginx is now listening on `HTTP` port `80`.

## Creating a system service to manage nginx

We are going to add nginx to your system as a `systemd` service, which is a newer and more popular standard these days.

> Note that `systemd` is available only since Ubuntu `15.0.4`.

Creating a `systemd` nginx service will not only allows you to start, stop, restart and reload (configuraiton) nginx in a more standard way, but also make it a lot easier to make nginx **start on boot**.

The fact that we are going to create a system service to manage nginx does not mean that you cannot manage nginx without a system service. The system service is just making everything you can already do, a lot easier. So in order to manage nginx with the simple command line tool you can first list all available nginx commands using `nginx -h`.

To send a signal to the nginx process you can use the `-s` flag. To send it a stop signal:

```
nginx -s stop
```

There is no more detail to this. Let's now add the nginx systemd service. To do this, we are going to add a small script. This script is the same across all operating systems, so you can copy the script from `nginx.com` on the _NGINX Init Scripts_ page. Locate _Systemd_ section on this page, and navigate to the provided link. You can now see the script here with an instruction that says "Save this file as `/lib/systemd/system/nginx.service`".

So go on and create this file in the given location:

```
touch /lib/systemd/system/nginx.service
```

Then copy/paste the script contents using the _nano_ editor:

```
nano /lib/systemd/system/nginx.service
```

Remember to update the `PIDFile` field to the path you used in your configuration. You should also update `ExecStartPre` and `ExecStart` fields to the path you used.

> The init scripts and procedures have undergone several updates since when this tutorial was created. You are now required to use a `.sh` script file to handle this matter. You can find instructions on *https://www.linode.com/docs/guides/installing-nginx-on-ubuntu-12-04-lts-precise-pangolin/*.

You should now be able to control nginx service using systemd with no errors.

```
systemctl start nginx
systemctl stop nginx
```

You can also check the nginx service status:

```
systemctl status nginx
```

At this moment, if the hosting machine shuts down and then come back live, nginx service will not start. To make the nginx service start automatically when the system boots you can use:

```
systemctl enable nginx
```

# Configuration

In this section you are going to learn a whole lot about nginx configuration commands along with some knowledge about its various features and functionalities. Let's first understand some configuration terminology.

## Terminology

The two main terms you should be aware of are: **Context** and **Directive**.

### Directive

Directives are specific configuration options that get set in the configuration files. A Directive always consists of a _name_ and _value_ separated by a space. This is an example:

```nginx
server_name mydomain.com
```

### Context

Context refer to a section in a configuration file enclosed within the area wrapped inside `{ }`. This is an example:

```nginx
http {
    // This is the context area
}
```

Directives are set within contexts. Essentially, context is the same as _scope_. So contexts can be nested, and they can inherit some things from their parents. The top most context is the configuration file itself which is also called the _main context_. This context will hold global directives applied to the _master process_.

Other important contexts include:

- the `http` context for anything http-related.
- the `server` context where you define a virtual host.
- the `location` context which is nested in `server` context for matching URI locations on incoming requests to the parent server context.

## Creating a virtual host

We are going to create a basic virtual host to serve static files from a directory on our server machine. To this you can create a directory at the root of your server like:

```
mkdir /sites/demo/
```

You can provide some simple `index.html` and `style.css` files along with some images you might use in the html file like `thumb.png`.

To establish a simple virtual host you are going to edit the `nginx.conf` file located at `/etc/nginx` directory. This configuration file, by default, serves the nginx default holding page which we are now going to change to our own static page.

Go on and open the `nginx.conf` file in your text editor. Then remove everything in this file to end up with two empty contexts: `events {}` and `http{}`.

> We are not going to add anything to the `events` context in this basic setup, but in order for the configuration file to be considered valid, it should be placed in the file.

To establish a basic virtual host, we need to introduce a `server` context within the `http` context. Each virtual host will have its own `server` context. This context is responsible for listening on a port, (typically `80` for http or `443` for https) on a given address or domain name. You can include a `listen` directive for this purpose.

```nginx
events {}

http {
    server{
        listen 80;
    }
}
```

> Nginx will assume port `80` by default, but it is a good practice to include it anyway.

Next, you should define the server name, wich is the domain, the subdomain or the IP address for which the server context exists. If you don't have a domain name configured, you can simple use the IP address of your server machine. To do this, you can use the `server_name` directive.

```nginx
events {}

http {
    server{
        listen 80;
        server_name 167.99.93.26
    }
}
```
