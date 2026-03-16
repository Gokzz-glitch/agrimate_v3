# Using GitHub Copilot in PowerShell

This guide explains how to use GitHub Copilot to write, edit, and improve the PowerShell scripts in Agrimate V3 (e.g. `start_all.ps1`, `auto_git_push.ps1`).

---

## Prerequisites

| Requirement | Details |
|---|---|
| GitHub Copilot subscription | Free, Pro, or organisation plan — [sign up here](https://github.com/features/copilot) |
| PowerShell | 5.1 (Windows built-in) **or** [PowerShell 7+](https://aka.ms/powershell) (recommended) |
| Code editor | Visual Studio Code with the **GitHub Copilot** extension |

---

## 1 — Install the GitHub Copilot extension in VS Code

1. Open **VS Code**.
2. Click the **Extensions** icon (`Ctrl+Shift+X`).
3. Search for **GitHub Copilot** and click **Install**.
4. Sign in with the GitHub account that has an active Copilot subscription when prompted.

---

## 2 — Open the PowerShell scripts

The Agrimate V3 PowerShell scripts live in the repository root:

```
agrimate_v3/
├── start_all.ps1        # Starts all background services
└── auto_git_push.ps1    # Auto-commits and pushes changes every 5 minutes
```

Open either file in VS Code to start using Copilot.

---

## 3 — Get inline suggestions

As you type in a `.ps1` file, Copilot automatically suggests completions in grey text.

- **Accept** a suggestion → press `Tab`
- **Dismiss** a suggestion → press `Escape`
- **Cycle through suggestions** → press `Alt+]` (next) / `Alt+[` (previous)

### Example — adding error handling to `auto_git_push.ps1`

Type a comment describing what you want:

```powershell
# Send a Windows toast notification if the git push fails
```

Copilot will suggest the full implementation. Press `Tab` to accept.

---

## 4 — Use Copilot Chat for guided help

Open the **Copilot Chat** panel with `Ctrl+Alt+I` (or click the chat icon in the sidebar).

### Useful prompts for this project

| What you want | Prompt |
|---|---|
| Understand a script | `Explain what start_all.ps1 does step by step` |
| Improve error handling | `Add try/catch blocks to auto_git_push.ps1` |
| Add a new service | `Add a fifth Start-Process block to start_all.ps1 that runs backend/new_service.py` |
| Schedule a script | `How do I schedule auto_git_push.ps1 with Windows Task Scheduler?` |
| Write a test | `Write a Pester test that checks start_all.ps1 exits with code 0` |

---

## 5 — Use Copilot in the PowerShell terminal (CLI)

If you prefer working in the terminal you can use the **GitHub Copilot CLI** extension:

```powershell
# Install the GitHub CLI first (https://cli.github.com)
winget install --id GitHub.cli

# Authenticate
gh auth login

# Install the Copilot CLI extension
gh extension install github/gh-copilot

# Ask a PowerShell question
gh copilot suggest "start a Python process in the background with PowerShell"

# Explain a command you are unsure about
gh copilot explain "taskkill /F /IM python.exe /T"
```

> **Tip:** `gh copilot suggest` will show you a shell command and ask whether you want to copy it, explain it, or revise it before running.

---

## 6 — Practical workflow for this project

```powershell
# 1. Pull the latest changes
git pull

# 2. Open VS Code and let Copilot help you edit a script
code start_all.ps1

# 3. After editing, run the startup script to verify it works
.\start_all.ps1

# 4. auto_git_push.ps1 will commit and push your changes automatically,
#    or you can run it manually:
.\auto_git_push.ps1
```

---

## 7 — Tips and best practices

- **Write descriptive comments** before a block of code — Copilot uses them as instructions.
- **Use Copilot Chat's `/fix` command** when a script throws an error: paste the error message and type `/fix`.
- **Use `/doc`** in Copilot Chat to generate a comment block for an existing function.
- **Review all suggestions** before accepting — Copilot is a coding assistant, not a replacement for understanding your own scripts.

---

## Further reading

- [GitHub Copilot documentation](https://docs.github.com/en/copilot)
- [GitHub Copilot CLI](https://docs.github.com/en/copilot/github-copilot-in-the-cli)
- [Copilot in VS Code](https://code.visualstudio.com/docs/copilot/overview)
- [PowerShell 7 installation guide](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell)
