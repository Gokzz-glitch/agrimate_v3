# Agrimate V3

Agricultural intelligence platform combining a Python backend, ML pipeline, and React frontend.

## Quick start

```powershell
# Start all background services (Windows)
.\start_all.ps1
```

## Documentation

- [How to use GitHub Copilot in PowerShell](docs/copilot-powershell.md)

## Repository structure

```
agrimate_v3/
├── backend/              # FastAPI gateway (port 8080)
├── frontend/             # React web app
├── ml/                   # ML re-analyser
├── research_poller/      # Semantic Scholar / OpenAlex poller
├── docs/                 # Project documentation
├── start_all.ps1         # Starts all services
└── auto_git_push.ps1     # Automated git push (every 5 min)
```
