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

> Server names can also include wildcard characters, like `*` which will make `*.mydomain.com` accessible through all of its sub-domains including `www.mydomain.com`.

You can then define the `root` directive, which is the root path from which nginx will be serving requests, or interpretting static requests from. For instance, if a request hits the server requesting `images/cat.png`, by default, nginx will look for it in the root path `[root-path]/images/cat.png`. Knowing from before that have creatad a directory for our web server static files at `/sites/demo`, this would be the path that we will assign to the `root` direcive.

Now that you have altered the default nginx configuration file you have to `reload` the nginx service to make it work as you just configured it:

```
systemctl reload nginx
```

Note that the `reload` command is a lot more preferrable over the `restart` command because the `reload` will prevent any downtime. If the configuration contains any errors, the reload job will fail without taking down the current nginx running instance. The `restart` command however, will first stop the current running instance of nginx, then try to load the new configuration, and if there are any errors, refuse to start nginx back up. So your service will remain down.

> You can check your configuration file against any possible errors using the `nginx -t` command.

If you now try to approach the server's IP address using the browser, you will see a raw HTML page with no styling applied. You might think the stylsheet is not loaded, but it actually is. The problem is that nginx is sending the wrong **mime type** for the stylesheet. You can confirm this using this curl:

```
cur -I http://167.99.93.26/style.css
```

This will return the `Content-Type` header as `text/plain` which should not be. To fix this you should provide nginx with content types for given file extensions. This can be done using another context called `types`. Then you can define the relevant mime types like this example:

```nginx
events {}

http {

    types {
        text/html html;
        text/css css;
    }

    server{
        listen 80;
        server_name 167.99.93.26

        root /site/demo
    }
}
```

But there is an easier way to do this. Nginx allows you to include separate pieces of configuration from several files. One of those files that already exists within the nginx installation is the `mime.types` file. You can check the nginx directory to find it:

```
ls -l /etc/nginx
```

This file includes a rather complete list of mime types defined. You can `include` this file into your configuration with a relative path to this file. Remember the file is located in the same directory where the configuration file exists, so the relative path would be very simple - the file name itself:

```nginx
events {}

http {

    include mime.types;

    server{
        listen 80;
        server_name 167.99.93.26

        root /site/demo
    }
}
```

After reloading the nginx service, you will now receive the HTML page with correct styles.

## The location context

We are going to learn how to use location blocks to define and configure the behavior of specific URIs or requests. This is the most used block in any nginx configuration file. Basically, a location block intercepts a request based on its URI and then does some things other than just serving a matching file relative to the root directory. So with the configuration that we have set up until now, if someone tries to approach a path (like `167.99.93.26/greet`) under our machines IP address, they will get a _404 - Not found_ page.

Inside a location block, you can do many things. For the most simple thing, you can use the `return` directive which receives first a response status code, and then the response data which in this case will be a simple string.

```nginx
events {}

http {

    include mime.types;

    server{
        listen 80;
        server_name 167.99.93.26

        root /site/demo

        location /greet {
            return 200 'Hello from nginx /greet location.'
        }
    }
}
```

> The `return` directive can also receive a URI as its second argument if you give it a status code of the `300` family variant, which will make it act as a [rewrite](#rewrites-and-redirects) in nginx.

> Don't forget to reload nginx after any change you apply to the configuration file.

### Different ways of matching URIs in location blocks

There are several ways of matching URIs in location blocks, which are prioritized by nginx when a request arrives at the server. Here is a quick list of these different matchings from the highest priority to the lowest:

1. Exact match `= /uri`: matching only `/uri` and nothing else.
2. Preferential prefix match `^~ /uri`: which is basically the same as prefix match but considered with higher priority over regular expression matches.
3. Regular expression case-sensitive match `~ /uri[0-9]`: matching a URI that has `uri` followed by any number between 0 and 9. Using `~*` before the URI regex will make it case-insesitive. If, by any chance, two case-sensitive and case-insensitive regular expressions match a request URI, the first one declared in the configuration file will take precedence.
4. Prefix match `/uri`: matching URIs starting with `/uri`. So `/uri/more` will also match.

### Named location

This simply means to assign a name to a location context. Then using a directive such as [`try_files`](#the-try_files-directive) to refer to that location by its name, ensuring no re-evaluation has to happen on the final argument of the `try_files` directive, but instead just a definite call to the location.

```nginx
location @friendly_404 {
    return 404 "Sorry, that file could not be found.";
}
```

Refer to this location in a `try_files` directive like:

```
try_files $uri /thumb.png @friendly_404
```

## Nginx variables and conditionals

There two types of variables in nginx:

1. Variables you can set yourself with `set $var 'something';` directive
2. Variables pre-defined by nginx such as `$http`, `$uri` and `$args`. You can find a list of these variables in the `documentation` page of `nginx.org` website, inside the _Alphabetical index of variables_ document.

### Nginx native variables and conditionals

Native nginx variables can be extremely useful. For instance, you can see their values returned by a location block like this:

```nginx
events {}

http {

    include mime.types;

    server{
        listen 80;
        server_name 167.99.93.26

        root /site/demo

        location /inspect {
            return 200 "$host\n$uri\n$args"
        }
    }
}
```

Now as you navigate to `167.99.93.26/inspect` address (don't forget to reload nginx), you will receive this text on the browser screen:

```
167.99.93.26 (host)
/inspect (uri)
```

So the `$args` variable has no value since the request has no query string. If you try to approach `167.99.93.26/inspect?name=omid` you will get:

```
167.99.93.26 (host)
/inspect (uri)
name=omid (args)
```

You can also access an expected URI query parameter using a variation of the `$args` variable as `$arg_[parameter-name]`:

```nginx
events {}

http {

    include mime.types;

    server{
        listen 80;
        server_name 167.99.93.26

        root /site/demo

        location /inspect {
            return 200 "Name: $arg_name"
        }
    }
}
```

Again matching URI `167.99.93.26/inspect?name=omid` will give you:

```
Name: omid
```

Nginx also allow you to use some basic conditionals which are commonly used along with some of the native variables. What you should keep in mind is that **using nginx conditionals inside location contexts are highly discouraged, as it can lead to unexpectd behavior by nginx.** Now to demonstrate the use of conditionals in nginx take this example:

```nginx
events {}

http {

    include mime.types;

    server{
        listen 80;
        server_name 167.99.93.26

        root /site/demo

        if($arg_apiKey != 1234) {
            return 401 "Incorrect API key."
        }

        location /inspect {
            return 200 "Name: $arg_name"
        }
    }
}
```

In this example, if a user tries to access our server without providing the `1234` API key in the URI as a query parameter, they will receive 401 response.

### User-defined variables and conditionals

Variables in nginx can be set to simple strings, integeres, or booleans. Conditionals can come into play with user-defined variables also. Take this example:

```
events {}

http {

    include mime.types;

    server{
        listen 80;
        server_name 167.99.93.26

        root /site/demo

        set $weekend 'No';

        if($date_local ~ 'Saturday|Sunday') {
            set $weekend 'Yes';
        }

        location /is_weekend {
            return 200 "$weekend"
        }
    }
}
```

So we first defined the `$weekend` variable and set it to `No`. Then we match the current date (using nginx native variable `$date_local`) against `Saturday` or `Sundary` regex, and if it matches we re-set the `$weekend` variable to `Yes` and then print it in the response given to `/is_weekend` request URI.

## Rewrites and redirects

There are 2 directives you can use to implement a rewrite in nginx.

1. `rewrite [pattern] uri`
2. `return [status-code] uri`

> Note that the `return` directive can only accept a URI as its second argument only if it is given a status code of `300` variant. All 300 variants refer to some sort of redirect.

Let's see an example where you can use a rewrite or redirect. Currently, as you navigate to `167.99.93.26/thumb.png` you will be served with the static image file placed inside the root directory defined in the nginx configuration file. If you want this file to also be served for requests with `/logo` URI, you can use a rewrite.

```
events {}

http {

    include mime.types;

    server{
        listen 80;
        server_name 167.99.93.26

        root /site/demo


        location /logo {
            return 307 /thumb.png
        }
    }
}
```

> You can also use a complete URI with protocol, host, etc., but a relative URI is fine in this case since we are redirecting to the same host as the request is coming from.

If you now try to navigate to `167.99.93.26/logo` you will see that the URL of your browser changes (redirects) to `/thumb.png`. This is the essential difference between rewrites and redirects. So a redirect simply tells the client where to go instead. A rewrite, on the other hand, mutates the URI internally, so the URL in the browser won't change.

Let's now try a rewrite directive. Inside the server context, before matching any URIs in location contexts, we will use a `rewrite` directive. The directive can accept a regular expression with which you can match the request URI, and then the URI to which you want to rewrite.

```
events {}

http {

    include mime.types;

    server{
        listen 80;
        server_name 167.99.93.26

        root /site/demo

        rewrite ^/user/\w+ /greet;


        location /greet {
            return 200 "Hello user."
        }
    }
}
```

> When a request URI gets re-written, it gets re-evaluated by nginx as a completely new request. This makes rewrites very powerfull but also requires more resources than a `return` redirect.

Now navigating to `167.99.93.26/user/omid` will cause the request URI to be re-written **internally** to `/greet` and intercepted by the `/greet` location context.

With rewrites, you can also capture certain parts of the original request URI using standard regular expression capture groups. To do this, you can wrap the word after the `/user/` path and refer to it with its index in the rewritten URI. Then you can define an exact match location context to respond to a specific URI like `/greet/omid`:

```
events {}

http {

    include mime.types;

    server{
        listen 80;
        server_name 167.99.93.26

        root /site/demo

        rewrite ^/user/(\w+) /greet/$1;


        location /greet {
            return 200 "Hello user."
        }

        location = /greet/omid {
            return 200 "Hello user."
        }
    }
}
```

while the more general `/greet` location context will intercept the URI related to other users.

### Passing optional flags to rewrites

There are some flags you can pass to a `rewrite` directive. Here we are going to examine one called `last`. Passing this to a `rewrite` directive will make that rewrite be performed as the final rewrite on the given URI. For instance:

```
events {}

http {

    include mime.types;

    server{
        listen 80;
        server_name 167.99.93.26

        root /site/demo

        rewrite ^/user/(\w+) /greet/$1;
        rewrite ^/greet/omid /thumb.png;


        location /greet {
            return 200 "Hello user."
        }
    }
}
```

Navigating to `/users/omid` will rewrite the URI to `/greet/omid`, and then it will once again be rewritten, this time to `/thumb.png`. But if you add the `last` flag to the first rewrite directive:

```
events {}

http {

    include mime.types;

    server{
        listen 80;
        server_name 167.99.93.26

        root /site/demo

        rewrite ^/user/(\w+) /greet/$1 last;
        rewrite ^/greet/omid /thumb.png;


        location /greet {
            return 200 "Hello user."
        }

        location = /greet/omid {
            return 200 "Hello user."
        }
    }
}
```

The second rewrite directive will be ignored for `/user/omid` request URI and it will be intercepted by the `/greet/omid` location context.

### The `try_files` directive

This directive, as with the `rewrite` and `return` directives, can be used in the server context (applying to all coming requests), or inside a location context. This directive makes nginx check for a resource to respond with in any number of locations relative to the root directory, with a final(and only final) argument resulting in a rewrite.

Let's take a look at some examples. First, let's put this `try_files` directive in the server context, applying to all incoming requests:

```
events {}

http {

    include mime.types;

    server{
        listen 80;
        server_name 167.99.93.26

        root /site/demo

        try_files /thumb.png /greet


        location /greet {
            return 200 "Hello user."
        }
    }
}
```

Knowing that `sites/demo/thumb.png` (the root directive value followed by the resource path assigned to `try_files`) does exist, all incoming request will be responded with that file, no matter what the URI will be. If, by any chance, this first argument does not exist, the request URI will be rewritten to `/greet` and therefore intercepted by the related location context defined above.

Typically, `try_files` directive is used with nginx variables. For instance, to first check the request as it is in this directive, you can use `$uri` as the first argument:

```
events {}

http {

    include mime.types;

    server{
        listen 80;
        server_name 167.99.93.26

        root /site/demo

        try_files $uri /thumb.png /greet


        location /greet {
            return 200 "Hello user."
        }
    }
}
```

So now any request URI will be checked for the resource to which the original request URI is pointing. If no files exists, it will attempt to check for the second argument, which is `thumb.png`, and if this does not exist too, the request URI will be rewritten to `/greet`.

Knowing that the last argument of the `try_files` directive is a rewrite, this final argument should ideally be something that **won't ever fail**. This can be one safe approach:

```
events {}

http {

    include mime.types;

    server{
        listen 80;
        server_name 167.99.93.26

        root /site/demo

        try_files $uri /thumb.png /friendly_404

        location /friendly_404 {
            return 404 "Sorry, that file could not be found.";
        }


        location /greet {
            return 200 "Hello user."
        }

    }
}
```

Now if you try to navigate to something that will fail in `try_files` attempts, like `167.99.93.26/nothing`, it will be responded with the `friendly_404` block. You can also confirm the status code using `curl`:

```
curl -I http://167.99.93.26/nothing
```

## Logging

Nginx has essentially two different log types:

1. Error logs: for anything that failed or did not happen as expected
2. Access logs: for all requests that hit the server

Logging is an extremely important aspect of any web server in general. They enable us to find errors or even track down malicious users.

Logging is enabled in nginx by default. Most of the time, leaving the logging configuration as is will be fine. Nevertheless, you should understand how you can alter this configuration, for instance, to disable logs for certain conditions or to create resource-specific logs.

> Remember that we defined the path to our log files when we were building nginx from source (`/var/log/nginx/error.log` and `var/log/nginx/access.log`)

You list the logging directory using this terminal command:

```
ls -l /var/log/nginx/
```

You can also empty each file by first changing to their directory and then using this command:

```
echo '' > access.log
echo '' > error.log
```

> A common misconseption is that 404 responses get logged in the error logs file, which most of the time is not the case. A request that gets properly responded (handled) with 404 will certainly get logged in the access logs and not in the error logs. However, in case the request is not handled and met error, an error will also get logged in the error log file.

You can create custom log files or disabled logging for a given context using `access_log` or `error_log` directives. For instance, take this example where we define a `/secure` location context:

```
events {}

http {

    include mime.types;

    server{
        listen 80;
        server_name 167.99.93.26;

        root /site/demo;

        location /secure {
            access_log /var/log/nginx/secure.access.log
            return 200 "Welcome to secure area."
        }
    }
}
```

Now as you relaod nginx, if you list the content of the `/var/log/nginx` directory, you will see that the new log file is created and ready to receive logs. Now any request that gets intercepted by the `/secure` location context, will put a log in the `secure.access.log` file. You can use `access_log` directive multiple times, one after another.

You can also use `access_log` directive to disable logging for certain requests. This is done by setting this directive to `off`. This can reduce server load and keep log files smaller, especially for websites that undergo heavy usage traffic.

```
events {}

http {

    include mime.types;

    server{
        listen 80;
        server_name 167.99.93.26;

        root /site/demo;

        location /secure {
            access_log off;
            return 200 "Welcome to secure area."
        }
    }
}
```

> Generally, you could disable the majority of the access logs, and leave error logging in place. But this would definitely depend on each individual server requirements.
