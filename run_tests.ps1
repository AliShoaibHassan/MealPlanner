Write-Host "Running Selenium tests for Meal Planner application..." -ForegroundColor Green

# Create required directories
if (-not (Test-Path -Path "screenshots")) {
    New-Item -Path "screenshots" -ItemType Directory | Out-Null
}
if (-not (Test-Path -Path "reports")) {
    New-Item -Path "reports" -ItemType Directory | Out-Null
}

# Run the tests
Write-Host "Running tests with manually installed ChromeDriver from C:\chromedriver..." -ForegroundColor Yellow
python -m pytest tests/test_meal_planner.py -v --html=reports/report.html

Write-Host "`nTest complete. Check reports/report.html for results." -ForegroundColor Green
Write-Host "Screenshots are saved in the screenshots directory." -ForegroundColor Green

Read-Host -Prompt "Press Enter to exit" 