# Recon

To exploit web applications efficiently, a wide array of skills is required. On the one hand, a hacker needs knowledge of network protocols, software development techniques, and common vulnerabilities found in various types of applications. But on the other hand, the hacker also needs to understand the application they are targeting. The more intimate this knowledge is, the better and more applicable it will be.

The hacker should understand the purpose of the application from a functional perspective.

Without deep understanding of the target application from a nontechnical perspective, it is actually difficult to determine what data and functionality matter.

- Who are its users?
- How does the application generate revenue?
- For what purpose do users select the application over competitors?
- Who are the competitors?
- What functionality is found in the application?

Ultimately, web application reconnaissance is about collecting data and building a model that combines a web application’s technical and functional details in a way that allows you to fully understand the purpose and usage of a web application.

information is key — regardless of if it is technical in nature or not.

## Web application mapping

You should learn how to build up a map that represents the structure, organization, and functionality of a web application. It is important to note that this should generally be the first step you take before attempting to hack into a web application.

We will use the term "map" here to define the data points collected regarding the code, network structure,
Web Application Mapping and feature set of an application. You will learn how to acquire the data required to fill a map in the next few chapters.

For robust applications, or applications you intend to test frequently and over long periods of time, you probably want a more robust solution to create and develop your map. Any format of mapping should be sufficient as long as it is easily traversable and capable of storing relevant information and relationships.

## Finding subdomains

In order to scope out and test API endpoints, we should first be familiar with the domain structure a web application uses. In today’s world it is rare for a single domain to be used to serve a web application in its entirety. More often than not, web applications will be split into at minimum client and server domains, plus the well-known "https://www" versus just "https://."

Take `https://www.mega-bank.com` as example. We are particularly curious if MegaBank has any other internet-accessible servers linked to the mega-bank.com domain name.

The first thing we should do is perform some recon and fill our web application map up with a list of subdomains attached to `mega-bank.com`. Most large consumer companies actually host a variety of subdomains attached to their primary domain. These subdomains are used for hosting a variety of services from email, to admin applications, file servers, and more.

There are many ways to find this data, and often you will have to try several to get the results you are looking for.

### Browser's built-in network analysis tools

To view these requests as they are being made, we can use our own web browser’s network tools, or a more
powerful tool like **Burp**, **PortSwigger**, or **ZAP**.

### Public records

A good hacker can take advantage of this fact and find many interesting tidbits of information that could lead to an easy attack down the line.

Some data that I’ve found on the web while performing penetration tests in the past includes:

• Cached copies of GitHub repos that were accidentally turned public before being turned private again
• SSH keys
• Various keys for services like Amazon AWS or Stripe that were exposed periodically and then removed from a public-facing web application
• DNS listings and URLs that were not intended for a public audience
• Pages detailing unreleased products that were not intended to be live
• Financial records hosted on the web but not intended to be crawled by a search engine
• Email addresses, phone numbers, and usernames

This information can be found in many places, such as:

• Search engines
• Social media posts
• Archiving applications, like archive.org
• Image searches and reverse image searches

When attempting to find subdomains, public records can also be a good source of information because subdomains may not be easily found via a dictionary, but could have been indexed in one of the services previously listed.

### Search engine caches

Fortunately, Google offers special search operators for power searchers that allow you to increase the specificity of your search query. We can use the `site:<my-site>` operator to ask Google to only query against a specific domain:

```
site:mega-bank.com log in
```

Doing this against a popular site will usually return pages upon pages of content from the main domain, and very little content from the interesting subdomains. You will need to improve the focus of your search further to start uncovering any interesting stuff.

Use the minus operator to add specific negative conditions to any query string. For example, `-inurl:<pattern>` will reject any URLs that match the pattern supplied. An example of a search that combines the Google search operators `site:` and `-inurl:<pattern>` can work to a great extent.

This technique can be used to reduce the number of search results returned, and to search specific subdomains while ignoring specific keywords.

We can use the operator `-inurl:<pattern>` to remove results for the subdomains we are already familiar with, like www. Note that it will also filter out instances of www from other parts of a URL, as it does not specify the subdomain but the whole URL string instead:

```
site:mega-bank.com -inurl:www
```

You can also use multiple `-inurl:` search patterns:

```
site:mega-bank.com -inurl:www -inurl:mobile
```

### Accidental archives

Public archiving utilities like archive.org are useful because they build snapshots of websites periodically and allow you to visit a copy of a website from the past. `archive.org` strives to preserve the history of the internet, as many sites die and new sites take their domains. Because Archive.org stores historical snapshots of websites, sometimes dating back 20 years, the website is a goldmine for finding information that was once disclosed (purposefully or accidentally) but later removed.

Generally speaking, search engines will index data regarding a website but try to crawl that website periodically to keep their cache up to date. This means that for relevant **current data** you should look in a search engine, but for relevant **historical data** you might be better off looking at a website archive.

When looking for subdomains, historical archives often disclose these via hyperlinks that were once exposed through the HTML or JS but are no longer visible in the live app.

We can automate the discovery of subdomains from an archive with these simple steps:

1. Open 10 archives from 10 separate dates with significant time in between.
2. Right-click “View source,” then press Ctrl-A to highlight all HTML.
3. Press Ctrl-C to copy the HTML to your clipboard.
4. Create a file on your desktop named legacy-source.html.
5. Press Ctrl-V to paste the source code from an archive into the file.
6. Repeat this for each of the nine other archives you opened.
7. Open this file in your favorite text editor (VIM, Atom, VSCode, etc.).
8. Perform searches for the most common URL schemes:
   • http://
   • https://
   • file://
   • ftp://
   • ftps://

You can find a full list of browser-supported URL schemes in the specification document at `https://www.iana.org/assignments/uri-schemes/uri-schemes.xhtml`, which is used accross all major browsers to define which schemes should be supported.

### Zone Transfer Attacks

A zone transfer attack is a kind of recon trick that works against improperly configured Domain Name System (DNS) servers. Instead, it’s just a information-gathering technique that takes little effort to use, and can give us some valuable information if it is successful. At its core, a DNS zone transfer attack is a specially formatted request on behalf of an individual that is designed to look like a valid DNS zone transfer request from a valid DNS server.

DNS zone transfers are a standardized way that DNS servers can share DNS records. Records are shared in a text-based format known as a **zone file**.

Zone files often contain DNS configuration data that is not intended to be easily accessible. As a result, a properly configured DNS master server should only be able to resolve zone transfer requests that are requested by another authorized DNS slave server. If a DNS server is not properly configured to only resolve requests for other specifically defined DNS servers, it will be vulnerable to bad actors.

We can find the DNS used by a specific website by:

```
host -t NS digikala.com
```

The expected output would be:

```
digikala.com name server u.ns2.digikalacloud.com.
digikala.com name server f.ns1.digikalacloud.com.
```

Then you can execute the Zone Transfer Attack:

```
host -l digikala.com f.ns1.digikalacloud.com
```

You should get a result like this if the DNS is configured improperly:

```
Using domain server:
Name: ns1.bankhost.com
Address: 195.11.100.25
Aliases:
digikala.com has address 195.250.100.195
digikala.com name server ns1.bankhost.com
digikala.com name server ns2.bankhost.com
mail.digikala.com has address 82.31.105.140
admin.digikala.com has address 32.45.105.144
internal.digikala.com has address 25.44.105.144
```

A properly configured server will give a different output when you request a zone transfer:

```
Using domain server:
Name: ns1.secure-bank.com
Address: 141.122.34.45
Aliases:

: Transfer Failed.
```

### Brute forcing subdomains

As a final measure in discovering subdomains, brute force tactics can be used. These can be effective against web applications with few security mechanisms in place, but against more established and secure web applications we will find that our brute force must be structured very intelligently.

Let’s build up a brute force algorithm in two steps using JavaScript. Our script should do the following:

1. Generate a list of potential subdomains.
2. Run through that list of subdomains, pinging each time to detect if a subdomain is live.
3. Record the live subdomains and do nothing with the unused subdomains.

We can generate subdomains using the following:

```js
/*
 * A simple function for brute forcing a list of subdomains
 * given a maximum length of each subdomain.
 */
const generateSubdomains = function (length) {
  /*
   * A list of characters from which to generate subdomains.
   *
   * This can be altered to include less common characters
   * like '-'.
   *
   * Chinese, Arabic, and Latin characters are also
   * supported by some browsers.
   */
  const charset = "abcdefghijklmnopqrstuvwxyz".split("");
  let subdomains = charset;
  let subdomain;
  let letter;
  let temp;
  /*
   * Time Complexity: o(n*m)
   * n = length of string
   * m = number of valid characters
   */
  for (let i = 1; i < length; i++) {
    temp = [];
    for (let k = 0; k < subdomains.length; k++) {
      subdomain = subdomains[k];
      for (let m = 0; m < charset.length; m++) {
        letter = charset[m];
        temp.push(subdomain + letter);
      }
    }
    subdomains = temp;
  }
  return subdomains;
};
const subdomains = generateSubdomains(4);
```

This script will generate every possible combination of characters of length `n`, where the list of characters to assemble subdomains from is `charset`. The algorithm works by splitting the charset string into an array of characters, then assigning the initial set of characters to that array of characters.

Next, we iterate for duration length, creating a temporary storage array at each iteration. Then we iterate for each subdomain, and each character in the charset array that specifies our available character set. Finally, we build up the temp array using combinations of existing subdomains and letters.

Now, using this list of subdomains, we can begin querying against a top-level domain (.com, .org., .net, etc.) like mega-bank.com. In order to do so, we will write a short script that takes advantage of the DNS library provided within Node.js—a popular JavaScript runtime.

```js
const dns = require("dns");
const promises = [];
/*
 * This list can be filled with the previous brute force
 * script, or use a dictionary of common subdomains.
 */
const subdomains = [];
/*
 * Iterate through each subdomain, and perform an asynchronous
 * DNS query against each subdomain.
 *
 * This is much more performant than the more common `dns.lookup()`
 * because `dns.lookup()` appears asynchronous from the JavaScript,
 * but relies on the operating system's getaddrinfo(3) which is
 * implemented synchronously.
 */
subdomains.forEach((subdomain) => {
  promises.push(
    new Promise((resolve, reject) => {
      dns.resolve(`${subdomain}.mega-bank.com`, function (err, ip) {
        return resolve({ subdomain: subdomain, ip: ip });
      });
    }),
  );
});
// after all of the DNS queries have completed, log the results
Promise.all(promises).then(function (results) {
  results.forEach((result) => {
    if (!!result.ip) {
      console.log(result);
    }
  });
});
```

After a short period of waiting, we will see a list of valid subdomains in the terminal:

```
{ subdomain: 'mail', ip: '12.32.244.156' },
{ subdomain: 'admin', ip: '123.42.12.222' },
{ subdomain: 'dev', ip: '12.21.240.117' },
{ subdomain: 'test', ip: '14.34.27.119' },
{ subdomain: 'www', ip: '12.14.220.224' },
{ subdomain: 'shop', ip: '128.127.244.11' },
{ subdomain: 'ftp', ip: '12.31.222.212' },
{ subdomain: 'forum', ip: '14.15.78.136' }
```

### Dictionary attacks

Rather than attempting every possible subdomain, we can speed up the process further by utilizing a dictionary attack instead of a brute force attack. Much like a brute force attack, a dictionary attack iterates through a wide array of potential subdomains, but instead of randomly generating them, they are pulled from a list of the most common subdomains.

the top 25 most common subdomains are as follows:

```
www
mail
ftp
localhost
webmail
smtp
pop
ns1
webdisk
ns2
cpanel
whm
autodiscover
autoconfig
m
imap
test
ns
blog
pop3
dev
www2
admin
forum
news
```

The dnscan repository on GitHub hosts files containing the top 10,000 subdomains that can be integrated into your recon process thanks to its very open GNU v3 license. You can find dnscan’s subdomain lists, and source code on GitHub at `https://github.com/rbsec/dnscan`.

For large lists, like dnscan’s 10,000 subdomain list, we should keep the data separate from the script and pull it in at runtime. This will make it much easier to modify the subdomain list, or make use of other subdomain lists. Most of these lists will be in .csv format, making integration into your subdomain recon script very simple:

```js
const dns = require("dns");
const csv = require("csv-parser");
const fs = require("fs");
const promises = [];
/*
 * Begin streaming the subdomain data from disk (versus
 * pulling it all into memory at once, in case it is a large file).
 *
 * On each line, call `dns.resolve` to query the subdomain and
 * check if it exists. Store these promises in the `promises` array.
 *
 * When all lines have been read, and all promises have been resolved,
 * then log the subdomains found to the console.
 *
 * Performance Upgrade: if the subdomains list is exceptionally large,
 * then a second file should be opened and the results should be
 * streamed to that file whenever a promise resolves.
 */
fs.createReadStream("subdomains-10000.txt")
  .pipe(csv())
  .on("data", (subdomain) => {
    promises.push(
      new Promise((resolve, reject) => {
        dns.resolve(`${subdomain}.mega-bank.com`, function (err, ip) {
          return resolve({ subdomain: subdomain, ip: ip });
        });
      }),
    );
  })
  .on("end", () => {
    // after all of the DNS queries have completed, log the results
    Promise.all(promises).then(function (results) {
      results.forEach((result) => {
        if (!!result.ip) {
          console.log(result);
        }
      });
    });
  });
```

Because the dictionary approach is much more efficient than the brute force approach, it may be wise to begin with a dictionary and then use a brute force subdomain generation only if the dictionary does not return the results you are seeking.

## API analysis

### Endpoing discovery

The HTTP specification defines a special method that only exists to give information about a particular API’s verbs. This method is called OPTIONS, and should be our first go-to when performing recon against an API. We can easily make a request in curl from the terminal:

```
curl -i -X OPTIONS https://api.mega-bank.com/users/1234
```

If the OPTIONS request was successful, we should see the following response:

```
200 OK
Allow: HEAD, GET, PUT, DELETE, OPTIONS
```

Generally speaking, `OPTIONS` will only be available on APIs specifically designated for public use. So while it’s an easy first attempt, we will need a more robust discovery solution for most apps we attempt to test. Very few enterprise applications expose `OPTIONS`.

Let’s move on to a more likely method of determining accepted HTTP verbs. The first API call we saw in our browser was the following:

```
GET api.mega-bank.com/users/1234
```

We can now expand this to:

```
GET api.mega-bank.com/users/1234
POST api.mega-bank.com/users/1234
PUT api.mega-bank.com/users/1234
PATCH api.mega-bank.com/users/1234
DELETE api.mega-bank.com/users/1234
```

With the above list of HTTP verbs in mind, we can generate a script to test the legitimacy of our theory.

```js
/*
 * Given a URL (cooresponding to an API endpoint),
 * attempt requests with various HTTP verbs to determine
 * which HTTP verbs map to the given endpoint.
 */
const discoverHTTPVerbs = function (url) {
  const verbs = ["POST", "GET", "PUT", "PATCH", "DELETE"];
  const promises = [];
  verbs.forEach((verb) => {
    const promise = new Promise((resolve, reject) => {
      const http = new XMLHttpRequest();
      http.open(verb, url, true);
      http.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded",
      );
      /*
       * If the request is successful, resolve the promise and
       * include the status code in the result.
       */
      http.onreadystatechange = function () {
        if (http.readyState === 4) {
          return resolve({ verb: verb, status: http.status });
        }
      };
      /*
       * If the request is not successful, or does not complete in time, mark
       * the request as unsuccessful. The timeout should be tweaked based on
       * average response time.
       */
      setTimeout(() => {
        return resolve({ verb: verb, status: -1 });
      }, 1000);
      // initiate the HTTP request
      http.send({});
    });
    // add the promise object to the promises array
    promises.push(promise);
  });
  /*
   * When all verbs have been attempted, log the results of their
   * respective promises to the console.
   */
  Promise.all(promises).then(function (values) {
    console.log(values);
  });
};
```

The way this script functions on a technical level is just as simple. HTTP endpoints return a status code alongside any message they send back to the browser. We don’t actually care what this status code is. We just want to see a status code.

### Authentication mechanisms

Guessing the payload shape required for an API endpoint is much more difficult than just asserting that an API endpoint exists.

It’s usually best to start with common endpoints that can be found on nearly every application: sign in, sign up, password reset, etc. These often take a similarly shaped payload to that of other apps, since authentication is usually designed based on a standardized scheme.

if we can reverse engineer the type of authentication used and understand how the token is being attached to requests, it will be easier to analyze other API endpoints that rely on an authenticated user token. Here is a table of major authentication schemes:

| Authentication scheme      | Implementation details                                                                 | Strengths                                                                    | Weaknesses                                                                      |
| -------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| HTTP Basic auth            | Username and password sent on each request                                             | All major browsers support this natively                                     | Session does not expire; easy to intercept                                      |
| HTTP Digest authentication | Hashed `username:realm:password` sent on each request                                  | More difficult to intercept; server can reject expired tokens                | Encryption strength dependent on hashing algorithm used                         |
| OAuth                      | "Bearer" token-based auth; allows sign in with other websites such as Amazon -> Twitch | Tokenized permissions can be shared from one app to another for integrations | Phishing rist; central site can be compromised, compromising all connected apps |

If we log in to `https://www.mega-bank.com` and analyze the network response, we might see something like this after the login succeeds:

```
GET /homepage
HOST mega-bank.com
Authorization: Basic am9lOjEyMzQ=
Content Type: application/json
```

We can tell at first glance that this is HTTP basic authentication because of the Basic authorization header being sent. Furthermore, the string `am9lOjEyMzQ=` is simply a base64-encoded `username:password` string.

In the browser console, we can use the built-in functions btoa(str) and atob(base64) to convert strings to base64 and vice versa. If we run the base64-encoded string through the atob function, we will see the username and password being sent over the network:

```js
/*
 * Decodes a string that was previously encoded with base64.
 * Result = joe:1234
 */
atob("am9lOjEyMzQ=");
```

Because of how insecure this mechanism is, basic authentication is typically only used on web applications that enforce SSL/TLS traffic encryption. This way, credentials cannot be intercepted midair—for example, at a sketchy mall WiFi hotspot.

This means that if we ever run into another endpoint that is not returning anything interesting with an empty payload, the first
thing we should try is attaching an authorization header and seeing if it does anything different when we request as an authenticated user.

### Endpoint shapes

After locating a number of subdomains and the HTTP APIs contained within those subdomains, you should begin determining the HTTP verbs used per resource and adding the results of that investigation to your web application map.

#### Application-specific shapes

Application-specific shapes are much harder to determine than those that are based on public specifications. To determine the shape of a payload expected by an API endpoint, you may need to rely on a number of recon techniques and slowly learn about the endpoint by trial and error.

If you know the name of a variable expected in the payload, but not a value, then you may be able to brute force the request by repeating it with variations until one sticks. Obviously, brute forcing values is slow manually, so you want a script to speed up the process. The more rules you can learn about an expected variable, the better.

## Identifying thrid-party dependencies

During reconnaissance you will likely encounter many third-party integrations, and you will want to pay a lot of attention to both the dependency and the method of integration. Often these dependencies can turn into attack vectors; sometimes vulnerabilities in such dependencies are well known and you may not even have to prepare an attack yourself but will instead be able to copy an attack from a Common Vulnerabilities and Exposures (CVE) database.

### Detecting client-side frameworks

Usually all three of these are easy to detect, and if you can pin down the version number, you can often find a combination of applicable ReDoS, Prototype Pollution, and XSS vulnerabilities on the web (in particular with older versions that have not been updated).

#### Detecting SPA frameworks

The largest SPA frameworks on the web as of 2019 are (in no particular order):

• EmberJS (LinkedIn, Netflix)
• AngularJS (Google)
• React (Facebook)
• VueJS (Adobe, GitLab)

##### EmberJS

EmberJS is quite easy to detect because when EmberJS bootstraps, it sets up a global variable `Ember` that can easily be found in the browser console:

```js
Ember.VERSION;
```

##### AngularJS

Older versions of Angular provide a global object similar to EmberJS. The global object is named `angular`, and the version can be derived from its property `angular.version`. AngularJS 4.0+ got rid of this global object, which makes it a bit harder to determine the version of an AngularJS app. You can detect if an application is running AngularJS 4.0+ by checking to see if the `ng` global exists in the console.

```js
// returns array of root elements
const elements = getAllAngularRootElements();
const version = elements[0].attributes["ng-version"];
// ng-version="6.1.2"
console.log(version);
```

##### React

React can be identified by the global object React, and like EmberJS, can have its version detected easily via a constant:

```js
const version = React.version;
// 0.13.3
console.log(version);
```

You may also notice script tags with the type `text/jsx` referencing React’s special file format that contains JavaScript, CSS, and HTML all in the same file.

##### VueJS

Similarly to React and EmberJS, VueJS exposes a global object Vue with a version constant:

```js
const version = Vue.version;
// 2.6.10
console.log(version);
```

If you cannot inspect elements on a VueJS app, it is likely because the app was configured to ignore developer tools.

You can flip this property to true in order to begin inspecting VueJS components in the browser console again:

```js
// Vue components can now be inspected
Vue.config.devtools = true;
```

### Detecting JavaScript Libraries

Beyond the major libraries you are better off running a query to see all of the external scripts loaded into the page.

We can make use of the DOM’s querySelectorAll function to rapidly find a list of all third-party scripts imported into the page:

```js
/*
 * Makes use of built-in DOM traversal function
 * to quickly generate a list of each <script>
 * tag imported into the current page.
 */
const getScripts = function () {
  /*
   * A query selector can either start with a "."
   * if referencing a CSS class, a "#" if referencing
   * an `id` attribute, or with no prefix if referencing an HTML element.
   *
   * In this case, 'script' will find all instances of <script>.
   */
  const scripts = document.querySelectorAll("script");
  /*
   * Iterate through each `<script>` element, and check if the element
   * contains a source (src) attribute that is not empty.
   */
  scripts.forEach((script) => {
    if (script.src) {
      console.log(`i: ${script.src}`);
    }
  });
};
```

### Detecting CSS libraries

With minor modifications to the algorithm to detect scripts, we can also detect CSS:

```js
/*
 * Makes use of DOM traversal built into the browser to
 * quickly aggregate every `<link>` element that includes
 * a `rel` attribute with the value `stylesheet`.
 */
const getStyles = function () {
  const scripts = document.querySelectorAll("link");
  /*
   * Iterate through each script, and confirm that the `link`
   * element contains a `rel` attribute with the value `stylesheet`.
   *
   * Link is a multipurpose element most commonly used for loading CSS
   * stylesheets, but also used for preloading, icons, or search.
   */
  scripts.forEach((link) => {
    if (link.rel === "stylesheet") {
      console.log(`i: ${link.getAttribute("href")}`);
    }
  });
};
```

### Detecting server-side frameworks

Detecting what dependencies a server has is much harder, but often not impossible. Sometimes server-side dependencies leave a distinct mark on HTTP traffic (headers, optional fields) or expose their own endpoints. Detecting server-side frameworks requires more knowledge about the individual frameworks being used, but fortunately, just like on the client, there are a few packages that are very widely used. If you can memorize ways to detect the top packages, you will be able to recognize them on many web applications that you investigate.

#### Header detection

Some insecurely configured web server packages expose too much data in their default headers. A prime example of this is the X-Powered-By header, which will literally give away the name and version of a web server

Make any call to one of those vulnerable web servers and you should see a return value like this in the response:

```
X-Powered-By: ASP.NET
```

If you are very lucky, the web server might even provide additional information:

```
Server: Microsoft-IIS/4.5
X-AspNet-Version: 4.0.25
```

#### Default Error Messages and 404 Pages

Some popular frameworks don’t provide very easy methods of determining the version number used. If these frameworks are open source, like Ruby on Rails, then you may be able to determine the version used via fingerprinting. Specific changes from commit to commit on GitHub can be used to fingerprint the version of the framwork that is being used on the server.

Most web servers provide their own default error messages and 404 pages, which continue to be presented to users until they are replaced with a custom alternative by the owner of the web application.

These 404 pages and error messages can expose quite a bit of intelligence regarding your server setup. Not only can these expose your server software, but they can often expose the version or range of versions as well.

### Database detection
