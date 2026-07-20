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
