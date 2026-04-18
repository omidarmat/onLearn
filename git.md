# SSH

In order to interact with your Gitlab or Github repo via SSH key you fist need to generate an SSK key. Then you can copy the content of the key and add it as an SSH key to your Gitlab or Github account. Here is the steps you should follow:

## 1. Generate a new key

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

When prompted for a file path, just hit Enter to use the default (`~/.ssh/id_ed25519`), then confirm overwriting the old one.

## 2. Add it to the SSH agent

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

## 3. Copy the new public key

```bash
cat ~/.ssh/id_ed25519.pub
```

## 4. Update GitHub

- Go to GitHub → Settings → SSH and GPG keys
- Delete the old key
- Click "New SSH key", paste the new public key, save

## 5. Update GitLab

- Go to GitLab → Preferences → SSH Keys
- Delete the old key
- Add the new public key, save

## 6. Test both connections

```bash
ssh -T git@github.com
ssh -T git@gitlab.com
```

Both should greet you by username.

---

One thing to keep in mind: if you use this key anywhere else (other servers, services), you'll need to update those too before the old key stops working.

# Managing remotes in a repo

To remove a remote origin from your repo:

```
git remote remove <remote-name>
```

# Ignoring already-tracked items

When you are trying to ignore some folders or files that are already tracked by git, you canno simply add them to the `.gitignore` file. You should also remove them from Git's cache:

```
git rm -r --cached <folder-name>/
git rm --cached <file-name>
```

Then commit the change:

```
git commit -m 'stop tracking files'
```

Then you can push your changes to the remote.
