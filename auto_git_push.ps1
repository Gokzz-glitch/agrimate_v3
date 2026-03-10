# Auto Git Push Script for ULAVAN / Agrimate v3
# Runs every 5 minutes via Windows Task Scheduler

$repoPath = "G:\My Drive\ULAVAN"
$logFile  = "$repoPath\.git\auto_push.log"

function Log($msg) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "$timestamp  $msg" | Tee-Object -FilePath $logFile -Append
}

Set-Location $repoPath

# Check if there are any changes
$status = git status --porcelain 2>&1
if (-not $status) {
    Log "No changes detected. Skipping commit."
    exit 0
}

Log "Changes detected. Staging all files..."
git add -A 2>&1 | ForEach-Object { Log $_ }

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
$commitMsg = "auto: sync at $timestamp"

Log "Committing: $commitMsg"
git commit -m $commitMsg 2>&1 | ForEach-Object { Log $_ }

Log "Pushing to remote..."
git push 2>&1 | ForEach-Object { Log $_ }

Log "Done."
