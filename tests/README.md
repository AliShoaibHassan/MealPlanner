# Selenium Automated Tests for Meal Planner Application

This directory contains automated Selenium tests for the Meal Planner application. The tests are designed to run in headless Chrome mode for integration with a Jenkins pipeline on AWS EC2.

## Test Setup

### Prerequisites

- Python 3.7 or later
- Chrome browser (version 137.0.7151.104 or compatible)
- ChromeDriver (automatically managed by webdriver-manager, or downloaded using the included script)
- Running frontend and backend services

### Installation

1. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. **Important for Windows users**: Run the ChromeDriver download script to ensure compatibility:
   ```bash
   python tests/download_chromedriver.py
   ```
   This will download the correct ChromeDriver version for your Chrome browser and place it in the `drivers` directory.

3. Make sure your application is running:
   - Backend should be running on http://localhost:5000
   - Frontend should be running on http://localhost:3000

4. Create necessary directories for test artifacts:
   ```bash
   mkdir -p screenshots reports
   ```

## Running Tests

To run all tests:
```bash
pytest tests/test_meal_planner.py -v
```

To run a specific test:
```bash
pytest tests/test_meal_planner.py::test_home_page_loads -v
```

To generate an HTML report:
```bash
pytest tests/test_meal_planner.py -v --html=reports/report.html
```

## Troubleshooting ChromeDriver Issues

If you encounter errors related to ChromeDriver:

1. Run the download script to get the correct ChromeDriver version:
   ```bash
   python tests/download_chromedriver.py
   ```

2. If you still have issues, try these solutions:
   - Check that your Chrome version matches the version in the download script (137.0.7151.104)
   - Download ChromeDriver manually from https://googlechromelabs.github.io/chrome-for-testing/
   - Place the chromedriver.exe in the `drivers` folder at the root of the project

3. Common Windows errors:
   - `%1 is not a valid Win32 application`: This typically means there's a path issue or the ChromeDriver is corrupted
   - Path containing forward slashes: Windows requires backslashes, which our updated conftest.py file handles

## Test Cases

The test suite includes 10 automated test cases:

1. **test_home_page_loads**: Verifies the home page loads successfully
2. **test_navigate_to_meal_planner**: Tests navigation from home page to meal planner
3. **test_meal_planner_page_loads**: Verifies meal planner page loads with data
4. **test_add_meal_button_opens_form**: Checks if the Add Meal button opens the form
5. **test_add_new_meal**: Tests adding a new meal to the planner
6. **test_update_existing_meal**: Verifies updating an existing meal
7. **test_navigation_back_to_home**: Tests navigation back to home page
8. **test_meal_planner_responsive_design**: Tests responsive design at different screen sizes
9. **test_page_reload_maintains_data**: Verifies data persistence after page reload
10. **test_error_handling_invalid_url**: Tests application's handling of invalid URLs

## Jenkins Integration

For Jenkins pipeline integration, these tests use headless Chrome. The `conftest.py` file configures the WebDriver with the necessary headless options:

```python
chrome_options.add_argument("--headless")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("--disable-gpu")
``` 