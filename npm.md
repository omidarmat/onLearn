# Setting global mirror

In order to download NPM packages from a repository other than NPM's native repository, you can use this command to set global mirror setting:

```
npm config set registry https://mirror-npm.runflare.com
```

In order to remove the mirror setting above you can use:

```
npm config delete registry https://mirror-npm.runflare.com
```

If you want to install a specific NPM package from a specific repository:

```
npm install --registry="https://mirror-npm.runflare.com" express
```

> Notice that "https://mirror-npm.runflare.com" is used as example here
