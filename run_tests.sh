#!/bin/bash
echo "Running Selenium tests for Meal Planner application..."

# Create required directories
mkdir -p screenshots
mkdir -p reports

# Run the tests
echo "Running tests with manually installed ChromeDriver from C:/chromedriver..."
python -m pytest tests/test_meal_planner.py -v --html=reports/report.html

echo ""
echo "Test complete. Check reports/report.html for results."
echo "Screenshots are saved in the screenshots directory." 