- [OS management commands](#os-management-commands)
  - [Update all packages](#update-all-packages)
- [Filesystem commands](#filesystem-commands)
  - [Understanding relative and absolute paths](#understanding-relative-and-absolute-paths)
  - [Listing all directories and files](#listing-all-directories-and-files)
  - [Traversing the filesystem](#traversing-the-filesystem)
    - [Change directory](#change-directory)
    - [Go up to the parent directory](#go-up-to-the-parent-directory)
    - [Go to home directory](#go-to-home-directory)
  - [Creating and removing files and folders](#creating-and-removing-files-and-folders)
    - [Create files](#create-files)
      - [Creating files using redirection](#creating-files-using-redirection)
    - [Create folders](#create-folders)
    - [Remove folders or files](#remove-folders-or-files)
- [3rd-party packages](#3rd-party-packages)
  - [WGET](#wget)

# OS management commands

## Update all packages

To update all your apps (packages) you first need to get a list of upgradable apps using this command:

```bash
sudo apt update
```

Then you can use this command to upgrade them all:

```bash
sudo apt upgrade
```

# Filesystem commands

## Understanding relative and absolute paths

When using relative paths to navigate through the file system, the place you end up at depends on your current working directory. Absolute paths always start with `/` or `~` meaning the the root directory. From there, you will continue to write the path to where you want to go. Here are some commands with absolute paths:

```bash
cd ~/Desktop
# or
cd /Desktop

mkdir /[folder-name]/[file-name]
```

## Listing all directories and files

To list all the directories and files located in the current position of the terminal you can use this command:

```bash
ls
```

To make the list include full information even about the hidden files you can use the `-all` option:

```bash
ls -all
```

## Traversing the filesystem

### Change directory

To change the directory at which the terminal is running you can use this command:

```bash
cd [directory-path]
```

### Go up to the parent directory

To move up to the parent directory of the current directory you can use this command:

```bash
cd ..
```

If you need to move up multiple levels:

```bash
# moving up 3 levels
cd ../../..
```

### Go to home directory

To move all the way up to the home directory you can use this command:

```bash
cd home
# or
cd
```

## Creating and removing files and folders

### Create files

To create a new empty file you can use this command:

```bash
touch [file-name].[file-extension]
```

To create multiple files you can use this command:

```bash
touch
```

> Note: inserting file extension is not necessary in Linux

#### Creating files using redirection

### Create folders

To create a new empty folder you can use this command:

```bash
mkdir [folder-name]
```

To create multiple folders you can use this command:

```bash
mkdir [folder-name] [folder-name] [folder-name]
```

To create nested folders you can use the `-p` option in this command:

```bash
mkdir -p [folder-name]/[folder-name]/[folder-name]
```

> Note: If you want to create a folder with spaces in their name like `Web Development` you should put the name inside `''`.
>
> ```bash
> mkdir 'folder name'
> ```

### Remove folders or files

To remove a folder (directory) you should first position the terminal in the parent directory and then use this command:

```bash
rm [folder-name]
rm [file-name].[file-extension]
```

You can also use these commands to delete multiple files:

```bash
rm [file-name].[file-extension] [file-name].[file-extension]
```

You can also perform deletions from anywhere else in the filesystem. In this case you would have to write the path to the file:

```bash
rm /somefolder/anotherfolder/[file-name].[file-extension]
```

# 3rd-party packages

## WGET

wget is a GNU free software package that is used for retrieving files over the web.

(link: https://askubuntu.com/questions/32850/what-download-managers-are-available-for-ubuntu)

```bash
wget [your-download-link]
```

If your download has stuck or paused for any reason, you can use the `-c` option to resume it:

```bash
wget -c [your-download-link]
```
