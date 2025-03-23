- [OS management commands](#os-management-commands)
  - [Update all packages](#update-all-packages)
  - [List all installed apps](#list-all-installed-apps)
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
  - [Reading file contents](#reading-file-contents)
    - [Word count and line count](#word-count-and-line-count)
  - [Moving and manipulating files or folders](#moving-and-manipulating-files-or-folders)
  - [Copying files or directories](#copying-files-or-directories)
  - [Renaming files or directories](#renaming-files-or-directories)
  - [Deleting files or directories](#deleting-files-or-directories)
  - [Creating command pipelines](#creating-command-pipelines)
  - [Opening file explorer](#opening-file-explorer)
- [3rd-party packages](#3rd-party-packages)
  - [WGET](#wget)
  - [Wireguard](#wireguard)
    - [Adding an interface and using the VPN](#adding-an-interface-and-using-the-vpn)
    - [Toggling VPN on/off](#toggling-vpn-onoff)
  - [V2RayA](#v2raya)
- [Terminal helper commands](#terminal-helper-commands)
  - [Command manual](#command-manual)
- [The superuser](#the-superuser)

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

## List all installed apps

To receive a list of all the apps already installed on your device you can use this command:

```bash
sudo apt list --installed
```

If you want to know if a specific package is installed on your device you can use this command:

```bash
sudo apt list -a package-name
```

# Filesystem commands

## Understanding relative and absolute paths

When using relative paths to navigate through the file system, the place you end up at depends on your current working directory. Absolute paths always start with `/` or `~` meaning the the root directory. From there, you will continue to write the path to where you want to go. Here are some commands with absolute paths:

```bash
cd ~/Desktop
# or
cd /Desktop

mkdir /directory/file-name
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
cd directory-path
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
touch file-name.file-extension
```

To create multiple files you can use this command:

```bash
touch file-name.file-extension file-name
```

> Note: inserting file extension is not necessary in Linux

> **Note on CASE:** Generally you should try to avoid creating files and folders whose name only varies by **case**. Not only will it help to avoid confusion, but it will also prevent problems when working with different operating systems. Windows, for example, is case-insensitive, so it would treat all three of the file names above as being a single file, potentially causing data loss or other problems.

> **Note on good naming practice:** When you consider both case sensitivity and escaping, a good rule of thumb is to keep your file names all lower case, with only letters, numbers, underscores and hyphens. For files there’s usually also a dot and a few characters on the end to indicate the type of file it is (referred to as the “file extension”). This guideline may seem restrictive, but if you end up using the command line with any frequency you’ll be glad you stuck to this pattern.

#### Creating files using redirection

We can redirect the output from any command that returns an output so that, instead of being printed to the screen, it ends up in a new file. This way we can capture the output of the command as a text file that we can look at or manipulate further. To do this you can use this command:

```bash
ls > output.txt
# or
echo 'This is a test' > test.txt
```

> You can check the content of a text file using the `cat` command:
>
> ```bash
> cat output.txt
> ```
>
> The `cat` command can receive multiple files. It will _concatenate_ the content of the files one after another.

> The output of the `cat` command can also be redirected into a text file.
>
> ```bash
> cat test.txt test_1.txt > combined.txt
> ```

> You can use wildcard characters to include a pattern of file names for the `cat` command, eliminating the need to type all of the file names. `*` means **zero or more characters**. `?` means **any single character**.
>
> ```bash
> echo "test 1" > test1.txt
> echo "test 2" > test2.txt
> echo "test 3" > test3.txt
> cat t* > combined.txt
> ```

Remember that the `>` character overwrites the content of the file each time you use it. To append the redirected output of a command to a previously existing file, you need to use the double version `>>`.

```bash
echo "I have appended this line" >> combined.txt
```

### Create folders

To create a new empty folder you can use this command:

```bash
mkdir directory
```

To create multiple folders you can use this command:

```bash
mkdir directory1 directory2 directory3
```

To create nested folders you can use the `-p` option in this command:

```bash
mkdir -p directory1/directory2/directory3
```

> Note: If you want to create a folder with spaces in their name like `Web Development` you should put the name inside `''`.
>
> ```bash
> mkdir 'folder name'
> ```

### Remove folders or files

To remove a folder (directory) you should first position the terminal in the parent directory and then use this command:

```bash
rm directory
rm file-name.file-extension
```

You can also use these commands to delete multiple files:

```bash
rm file-name.file-extension file-name.file-extension
```

You can also perform deletions from anywhere else in the filesystem. In this case you would have to write the path to the file:

```bash
rm /somefolder/anotherfolder/file-name.file-extension
```

## Reading file contents

To read the content of a text file you can use this command along with the file name:

```bash
cat file-name.txt
```

If the file has too many lines to fit into the terminal screen, the terminal will let you know with a `-more-` text at the end. This is called a _pager_. You can use a better pager called `less`.

```bash
less file-name.txt
```

This will allow you to navigate throught the content of your file using the **arrow keys**, **PgUp**, **PgDn**, **Home** and **End** buttons. You can use `q` to quit the pager and use the terminal for other commands.

### Word count and line count

To read the word count of a text file you can use this command:

```bash
wc file-name.txt
```

To read the line count of a text file you can use the `-l` option on the `wc` command.

```bash
wc -l file-name.txt
```

> Note: When counting the lines in a text file, you can use the `uniq` command to only receive the number of unique lines. But the `uniq` is a standalone command. You cannot simply use it as an option. To do this we should create a [pipeline](#creating-command-pipelines). So we would first `cat` the content of the file, then pipe it into the `uniq` command and then pipe the output of it to the `wc -l` command. Read the code below:

```bash
cat file-name.txt | uniq | wc -l
```

> Note: You may want to display the unique lines of the content of a text file on the screen knowing that the content won't fit in the terminal window. So you would like to use the `less` pager. In this case you can use this code:

```bash
cat file-name.txt | uniq | less
```

## Moving and manipulating files or folders

Let's now look at the sort of day-to-day tasks you might need to perform on multiple files. In practice you'll still most likely use a graphical program when you want to move, rename or delete one or two files, but knowing how to do this using the command line can be useful for bulk changes, or when the files are spread amongst different folders.

To move a file to a folder you can use this command:

```bash
mv file-name.file-extension directory
```

Let's work on an example. We have moved the `comb.txt` file into the `dir1` directory using this command:

```bash
mv comb.txt dir1
```

Then we decide to move the file back to the parent folder. You can use this command:

```bash
mv dir1/* .
```

Where `dir1/*` means everything inside the `dir1` folder and `.` means the current directory.

> Remember that `..` means the parent directory of the current directory.

You can use the `mv` command to move multiple files and folders at once. With this command, the last argument (here `dir2`) is considered the destination directory into which you want to move your other arguments (here `combined.txt`, all files starting with `test_`, and `dir3`).

```bash
mv combined.txt test_* dir3 dir2
```

## Copying files or directories

To copy files or directories, the `cp` command is used with the same syntax as `mv`.

```bash
cp file-name.file-extension directory
```

The copy command can be used to make a copy of a file with a different name:

```bash
cp file-name file-name-2
```

## Renaming files or directories

The traditional Unix command line handles a rename as though you are moving the file from one name to another. So for renaming files you can use the `mv` command again:

```bash
mv file-name file-name-2
# or
mv directory directory-2
```

## Deleting files or directories

To delete one or more files from the current working directory you can use this command:

```bash
rm filename
# or
rm filename directory/filename-2
```

To delete a directory you can use the `rmdir` command:

```bash
rmdir directory
```

In order to delete multiple nested directories you can use the `-p` option. Remember you can use the same option on `mkdir` command to create multiple nested directories.

```bash
rmdir -p directory/directory-2/directory-3
```

But this will only delete the folders if they are all empty. If there is a file in any of them, the command will not work.

> Note: In order to delete non-empty directories you can use the `-r` option on the `rm` command, making it run **recursively**. The `-r` option only works on `rm` and not `rmdir`.

```bash
rm -r non-empty-directory
```

> **IMPORTANT:** The `rm` command does not move deleted files to trash. It remove the files and folders totally.

## Creating command pipelines

Let's explore this concept through an example. Imagine you want to read the number of all the files and folders in the working directory. You can redirect the result of the `ls` command into a text file, and then use the `wc -l` command to read the line count of that text file. However, creating a temporary text file only to delete it later is a bit weird. So bash has provided you with the possibility of doing this without creating the file. What you are doing here is that you pipe the output of one command to input of another command. To do this you can use the `|` character.

```bash
ls | wc -l
```

## Opening file explorer

In order to open file explorer at the directory where terminal is running you can use this command:

```
nautilus .
```

This will engage terminal in a running process and you won't be able to work with it, unless you exit the process using `^c`.

# 3rd-party packages

To manage 3rd-party packages (services etc.) you can use several different commands.

For instance, to see the current status of a service you can use this command:

```
sudo service status <service-name>
```

To make an existing service go active on boot:

```
sudo systemctl enable <service-name>
```

To prevent a service from going active on boot:

```
sudo systemctl disable <service-name>
```

To start a service:

```
sudo systemctl start <service-name>
sudo service <service-name> start
```

To stop a service:

```
sudo systemctl stop <service-name>
sudo service <service-name> stop
```

To restart a service:

```
sudo service <service-name> restart
```

> Depending on the package you are using, you may need to use `service` instead of `systemctl`.

## WGET

wget is a GNU free software package that is used for retrieving files over the web.

(link: https://askubuntu.com/questions/32850/what-download-managers-are-available-for-ubuntu)

```bash
wget your-download-link
```

If your download has stuck or paused for any reason, you can use the `-c` option to resume it:

```bash
wget -c your-download-link
```

## Wireguard

To install wireguard, you need to install the package first. First run:

```bash
sudo apt update
```

Then run:

```bash
sudo apt install wireguard
```

### Adding an interface and using the VPN

To add an interface you can copy your configuration file to the `etc` directory using this command:

```bash
sudo cp /path/to/myConfig.conf /etc/wireguard/
```

As an option, you can rename your configuration file so that you can write a simpler name in your command for toggling the VPN on and off:

```bash
sudo mv /etc/wireguard/myConfig.conf /etc/wireguard/wg0.conf
```

To ensure the configuration file is read-only by the root user you can do this:

```bash
sudo chmod 600 /etc/wireguard/wg0.conf
```

### Toggling VPN on/off

To activate the VPN tunner you can use:

```bash
sudo wg-quick up wg0
```

> Notice the `wg0` configuration name that we can now use in your commands.

You can then get a report of your tunnel using this command:

```bash
sudo wg
```

You can deactivate the VPN tunnel using this command:

```bash
sudo wg-quick down wg0
```

## V2RayA

To start the V2rayA service you can use this bash command:

```bash
sudo systemctl start v2raya
```

After starting, you can go to this url to enable your v2ray config and connect:

```
127.0.0.1:2017
```

Then login with your username and password.

To make the service go active on boot:

```bash
sudo systemctl enable v2raya
```

To stop the V2rayA service you can use this command:

```bash
sudo systemctl stop v2raya
```

To prevent the service from going active on boot:

```bash
sudo systemctl disable v2raya
```

To see the service status you can use:

```bash
sudo systemctl status v2raya
```

# Terminal helper commands

## Command manual

To receive the instruction manual of a specific terminal command you can use the `man` command followed by the command. For instance:

```bash
man uniq
```

# The superuser

**THIS IS AN IMPORTANT SECTION. PLEASE READ IT ALL FOR YOUR SECURITY.**

Where some online instructions require changes to your machine that go beyond modifying a few files in your home directory, you'll inevitably be faced with commands that need to be run as the machine's administrator (or **superuser** in Unix parlance).

The superuser is, as the name suggests, a user with super powers. In older systems it was a real user, with a real username (almost always “root”) that you could log in as if you had the password. As for those super powers: root can modify or delete any file in any directory on the system, regardless of who owns them; root can rewrite firewall rules or start network services that could potentially open the machine up to an attack; root can shutdown the machine even if other people are still using it. In short, root can do just about anything, skipping easily round the safeguards that are usually put in place to stop users from overstepping their bounds.

Of course a person logged in as root is just as capable of making mistakes as anyone else. The annals of computing history are filled with tales of a mistyped command deleting the entire file system or killing a vital server. Then there’s the possibility of a malicious attack: if a user is logged in as root and leaves their desk then it’s not too tricky for a disgruntled colleague to hop on their machine and wreak havoc. Despite that, human nature being what it is, many administrators over the years have been guilty of using root as their main, or only, account.

In an effort to reduce these problems many Linux distributions started to encourage the use of the `su` command. This is variously described as being short for ‘superuser’ or ‘switch user’, and allows you to change to another user on the machine without having to log out and in again. When used with no arguments it assumes you want to change to the `root` user (hence the first interpretation of the name), but you can pass a username to it in order to switch to a specific user account (the second interpretation). By encouraging use of `su` the aim was to persuade administrators to spend most of their time using a normal account, only switch to the superuser account when they needed to, and then use the `logout` command (or Ctrl-D shortcut) as soon as possible to return to their user-level account.

By minimising the amount of time spent logged in as root, the use of `su` reduces the window of opportunity in which to make a catastrophic mistake. Despite that, human nature being what it is, many administrators have been guilty of leaving long-running terminals open in which they’ve used su to switch to the root account. In that respect `su` was only a small step forward for security.

> Note: If anyone asks you to use su, be wary. If you’re using Ubuntu the root account is disabled by default, so su with no parameters won’t work. But it’s still not worth taking the risk, in case the account has been enabled without you realizing. If you are asked to use su with a username then (if you have the password) you will have access to all the files of that user, and could accidentally delete or modify them.

When using su your entire terminal session is switched to the other user. Commands that don’t need root access, something as mundane as pwd or ls, would be run under the auspices of the superuser, increasing the risk of a bug in the program causing major problems. Worse still, if you lose track of which user you’re currently operating as, you might issue a command that is fairly benign when run as a user, but which could destroy the entire system if run as root.

Better to disable the root account entirely and then, instead of allowing long-lived terminal sessions with dangerous powers, require the user to specifically request superuser rights on a per-command basis. The key to this approach is a command called `sudo` (as in “switch user and do this command”).

`sudo` is used to prefix a command that has to be run with superuser privileges. A **configuration** file is used to define which users can use `sudo`, and which commands they can run. When running a command like this, the user is prompted for their own password, which is then cached for a period of time (defaulting to 15 minutes), so if they need to run multiple superuser-level commands they don’t keep getting continually asked to type it in.

On a Ubuntu system the first user created when the system is installed is considered to be the superuser. When adding a new user there is an option to create them as an administrator, in which case they will also be able to run superuser commands with `sudo`.

> Note: If you are instructed to run a command with sudo, make sure you understand what the command is doing before you continue. Running with sudo gives that command all the same powers as a superuser. For example, a software publisher’s site might ask you to download a file and change its permissions, then use sudo to run it. Unless you know exactly what the file is doing, you’re opening up a hole through which malware could potentially be installed onto your system. sudo may only run one command at a time, but that command could itself run many others. Treat any new use of sudo as being just as dangerous as logging in as root.

For instructions targeting Ubuntu, a common appearance of sudo is to install new software onto your system using the apt or apt-get commands. If the instructions require you to first add a new software repository to your system, using the apt-add-repository command, by editing files in /etc/apt, or by using a “PPA” (Personal Package Archive), you should be careful as these sources are not curated by Canonical. But often the instructions just require you to install software from the standard repositories, which should be safe.
