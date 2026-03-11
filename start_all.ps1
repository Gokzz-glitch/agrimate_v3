# Start Agrimate V3 Background Services

Write-Host ">>> Refreshing Agrimate V3 Ecosystem..." -ForegroundColor Cyan

# Kill existing processes to ensure new code is running
Write-Host "Stopping existing python instances..."
taskkill /F /IM python.exe /T 2>$null
taskkill /F /IM python3.12.exe /T 2>$null
taskkill /F /IM python3.exe /T 2>$null
Start-Sleep -Seconds 1

# 1. Local Backend Gateway
Write-Host "[1/4] Starting Local API Gateway (Port 8080)..."
Start-Process python -ArgumentList "backend/start.py" -NoNewWindow

# 2. System Throttler (Protection)
Write-Host "[2/4] Starting System Throttler (Hardware Protection)..."
Start-Process python -ArgumentList "system_throttler.py" -NoNewWindow

# 3. Research Poller
Write-Host "[3/4] Starting Research Poller (Semantic Scholar/OpenAlex)..."
Start-Process python -ArgumentList "research_poller/farming_research_poller.py" -NoNewWindow

# 4. ML Re-analyser
Write-Host "[4/4] Starting ML Re-analyser (Hourly Reporting)..."
Start-Process python -ArgumentList "ml/ml_reanalyser.py" -NoNewWindow

Write-Host "Done. Use 'tasklist /FI `"IMAGENAME eq python3.12.exe`"' to monitor." -ForegroundColor Green
