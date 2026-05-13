# Changing VS Code interpretter for Python

In order for VS Code to see your libraries installed in your environment, it needs to be pointed to your virtual environment's Python interpreter. Here's how to fix it:

**Quick fix:**

1. Open the Command Palette: `Ctrl+Shift+P`
2. Type and select: `Python: Select Interpreter`
3. Choose the interpreter from your `fastapienv` - it should show a path like `./fastapienv/bin/python` or similar

**If your venv doesn't appear in the list:**

1. Select `Enter interpreter path...`
2. Navigate to: `fastapi/fastapienv/bin/python`

**Verify it worked:**

- Look at the bottom-right corner of VS Code - you should see something like `3.x.x ('fastapienv': venv)`
- Open a new terminal in VS Code - it should automatically activate the venv (you'll see `(fastapienv)` in the prompt)

**If autocomplete still doesn't work after selecting the interpreter:**

1. Install Pylance extension if you haven't: `Ctrl+Shift+X`, search for "Pylance"
2. Reload VS Code: `Ctrl+Shift+P` → `Developer: Reload Window`

The issue is that VS Code was using your system Python instead of the venv's Python, so it couldn't see the packages you installed in `fastapienv`.
