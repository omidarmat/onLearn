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
