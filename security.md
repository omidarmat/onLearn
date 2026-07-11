# OWASP top 10s

## Web application

- Broken Access Control
- Cryptographic failures
- Injection
- Insecure design
- Security misconfiguration
- Vulnerable and outdated components
- Identification and authentication failure
- Software and data integrity failure
- Security logging and monitoring failures
- Server-side request forgery

### Broken Access Control

Restrictions on what authenticated users are allowed to do are often not properly enforced. Attackers can exploit these flaws to access unauthorized functionality and/or data, such as access other users' accounts, view sensitive files, modify other users' data, change access rights, etc.

### Cryptographic failures

Failure to sufficiently protect data in transit or rest from exposure to unauthorized individuals. This can include poor usage of encryption or the lack of encryption all together.

### Injection

Injection flaws, such as SQL, NoSQL, and LDAP injection occur when untrusted data is sent to an interpreter as part of a command or query. The attacker's hostile data can trick the interpreter into executing unintended commands or accessing data without proper authorization.

### Insecure design

Failing to build security into the application early in the design process through a process of thread modeling, and secure design patterns and principles.

### Security misconfiguration

Security misconfiguration is commonly a result of insecure default configurations, incomplete or ad hoc configurations, open cloud storage, misconfigured HTTP headers, and verbose error messages containing sensitive information.

### Vulnerable and outdated components

Components, such as libraries, frameworks, and other software modules, run with the same privileges as the application. If a vulnerable component is exploited, such an attack can facilitate serious data loss or derver takeover.

### Identification and authentication failure

Application functions related to authentication and session management are often implemented incorrectly, allowing attackers to compromise passwords, keys, or session tokens, or to exploit other implementation flaws to assume other users' identities temporarily or permanently.

### Software and data integrity failure

Code or infrastructure that does not properly protect against integrity failures like using plugins from untrusted sources that can lead to a compromise.

### Insufficient logging and monitoring

Insufficient logging and monitoring, coupled with missing or ineffective integration with incident response, allows attackers to further attack systems, maintain persistence, pivot to more systems, and tamper, extract, or destroy data.

### Server-side request forgery

SSRF occurs when an application fetches resources without validating the destination URL. This can be taken advantage of by an attacker who is able to enter a destination of their choosing.

# Application security terms and definitions

## Security

Security is anything we do to protect an asset that is vulnerable to some attack, failure, or error.

## Assets

An asset is anything you deem to have value:

- An asset may be valuable because it holds its value
- An asset may be valuable because it provides access to value
- An asset may be valuable because it produces value

## Vulnerability

A vulnerability is any weakness in an asset that makes it susceptible to attack or failure.

## Attack

An attack is any intentional action that can reduce the value of an asset.

## Failure and errors

Failures and errors are unintentional actions that can reduce the value of an asset.

## Threats

Attacks, failures, and errors are actions that we collectively refer to as threats.

# "Anything" in security

Security, and more specifically cybersecurity, can be understood as a set of goals. These goals are specifically defined by how we measure an asset's value. How does value define our security goals? The goal of security is to protect an asset's **value** from threats. Value is important because not everything is valued the same and requires the same level of protection.

## Finding your security goals

- Determining what assets we want to protect
- Learn how the asset works and interacts with other things
- Determine how our asset's value is reduced directly and indirectly

These will form the steps to mitigate the threats.

# Application security goals

We must consider the unique nature of IT assets and capabilities when considering security goals.

From a high level, there is 3 main goals that we are trying to achieve:

1. Confidentiality: Ensures that sensitive information is accessible only to authorized individuals. When we protect something that holds value, we're maintaining its confidentiality.
2. Integrity: Ensures that data is accurate and unaltered, safeguarding it from unauthorized modifications, deletions, or corruptions. When we protect something that produces value, we're maintaining its integrity.
3. Availability: Ensures that data and services are accessible to authorized users when needed. When we protect something that provides access to value, we're maintaining its availability.

Collectively, these are known as the CIA triad.

## Security principles

Security principles aid in selecting or designing the correct mechanisms to implement our gloas.

Here is a list of security principles:

1. Economy of mechanism: It means keeping it simple. Also means complexity is the enemy of security.
2. Fail-Safe defaults: It means that fail and error scenarios should fall back to the most secure option.
3. Complete mediation: It means that we check every access to a resource for authority.
4. Open design: It means there is no security through obsecurity.
5. Separation of privilege: It means that two keys are more secure that one. So two keys should be used in any kind of high-value transaction.
6. Least privilege: It means that you should have access to do just what is needed to do your job, and no more.
7. Least common mechanism: It means that we are reducing the shared components in a system since that provides the opportunity for information leaks or inappropriate accesss.
8. Psychological acceptability: It means that the systems need to be designed so that people's expected behaviors provide security. If security is hard, people will find other ways.
