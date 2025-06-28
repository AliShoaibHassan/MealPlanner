"""Helper functions for Selenium test cases."""

import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException

# Application constants
BASE_URL = "http://frontend:3100"
API_URL = "http://backend:5100"

def navigate_to_home(driver):
    """Navigate to the homepage and verify it loaded."""
    driver.get(BASE_URL)
    assert "MealPlanner" in driver.page_source

def navigate_to_meal_planner(driver):
    """Navigate to the meal planner page."""
    driver.get(f"{BASE_URL}/tasks")
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "h1"))
    )
    assert "Weekly Meal Planner" in driver.page_source

def wait_for_element(driver, by, value, timeout=10):
    """Wait for an element to be present and return it."""
    return WebDriverWait(driver, timeout).until(
        EC.presence_of_element_located((by, value))
    )

def wait_for_clickable(driver, by, value, timeout=10):
    """Wait for an element to be clickable and return it."""
    return WebDriverWait(driver, timeout).until(
        EC.element_to_be_clickable((by, value))
    )

def is_element_present(driver, by, value):
    """Check if an element is present on the page."""
    try:
        driver.find_element(by, value)
        return True
    except NoSuchElementException:
        return False

def wait_for_page_load(driver, timeout=10):
    """Wait for page to fully load."""
    old_page = driver.find_element(By.TAG_NAME, "html")
    yield
    WebDriverWait(driver, timeout).until(EC.staleness_of(old_page)) 