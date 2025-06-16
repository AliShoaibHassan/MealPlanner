@echo off
echo Running Selenium tests for Meal Planner application...

REM Create required directories
mkdir screenshots 2>nul
mkdir reports 2>nul

REM Run the tests
echo Running tests with manually installed ChromeDriver from C:\chromedriver...
pytest tests/test_meal_planner.py -v --html=reports/report.html

echo.
echo Test complete. Check reports/report.html for results.
echo Screenshots are saved in the screenshots directory.
pause 