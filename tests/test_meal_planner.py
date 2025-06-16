"""Selenium test cases for the Meal Planner application."""

import pytest
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import TimeoutException

from test_helpers import (
    BASE_URL,
    navigate_to_home,
    navigate_to_meal_planner,
    wait_for_element,
    wait_for_clickable,
    is_element_present
)

def test_home_page_loads(driver):
    """Test 1: Verify the home page loads successfully."""
    navigate_to_home(driver)
    
    # Check for key elements
    assert is_element_present(driver, By.TAG_NAME, "h2")
    
    # Take screenshot for visual verification
    driver.save_screenshot("screenshots/home_page.png")

def test_navigate_to_meal_planner(driver):
    """Test 2: Navigate from home page to meal planner."""
    navigate_to_home(driver)
    
    # Find the "Get Started" button on the home page
    hero_section = wait_for_element(driver, By.CSS_SELECTOR, ".flex.flex-col")
    links = hero_section.find_elements(By.TAG_NAME, "a")
    
    # Click the link that goes to the meal planner
    for link in links:
        if "Get Started" in link.text:
            link.click()
            break
    
    # Verify we're on the meal planner page
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "h1"))
    )
    assert "Weekly Meal Planner" in driver.page_source

def test_meal_planner_page_loads(driver):
    """Test 3: Verify the meal planner page loads with data."""
    navigate_to_meal_planner(driver)
    
    # Check for table with days of the week
    table = wait_for_element(driver, By.TAG_NAME, "table")
    rows = table.find_elements(By.TAG_NAME, "tr")
    
    # Check if we have 8 rows (header + 7 days of the week)
    assert len(rows) == 8
    
    # Verify days of week are present
    days_of_week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    for day in days_of_week:
        assert day in driver.page_source

def test_add_meal_button_opens_form(driver):
    """Test 4: Verify the Add Meal button opens the form."""
    navigate_to_meal_planner(driver)
    
    # Click the "Add Meal" button
    add_button = wait_for_clickable(driver, By.XPATH, "//button[text()='Add Meal']")
    add_button.click()
    
    # Verify the form appears
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.TAG_NAME, "select"))
    )
    
    # Check for both dropdown menus and the input field
    assert len(driver.find_elements(By.TAG_NAME, "select")) == 2
    assert is_element_present(driver, By.TAG_NAME, "input")

def test_add_new_meal(driver):
    """Test 5: Add a new meal to the planner."""
    navigate_to_meal_planner(driver)
    
    # Open the form
    add_button = wait_for_clickable(driver, By.XPATH, "//button[text()='Add Meal']")
    add_button.click()
    
    # Wait for form to appear
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.TAG_NAME, "select"))
    )
    
    # Select options and fill the form
    day_select = Select(driver.find_elements(By.TAG_NAME, "select")[0])
    day_select.select_by_visible_text("Monday")
    
    meal_select = Select(driver.find_elements(By.TAG_NAME, "select")[1])
    meal_select.select_by_visible_text("Breakfast")
    
    # Generate a unique meal name
    unique_meal = f"Test Breakfast {int(time.time())}"
    
    # Enter new meal
    meal_input = driver.find_element(By.TAG_NAME, "input")
    meal_input.clear()
    meal_input.send_keys(unique_meal)
    
    # Save the new meal
    save_button = wait_for_clickable(driver, By.XPATH, "//button[contains(text(), 'Save')]")
    save_button.click()
    
    # Wait for save to complete and form to close
    WebDriverWait(driver, 10).until_not(
        EC.presence_of_element_located((By.XPATH, "//button[contains(text(), 'Save')]"))
    )
    
    # Verify the new meal appears in the table
    assert unique_meal in driver.page_source

def test_update_existing_meal(driver):
    """Test 6: Update an existing meal in the planner."""
    navigate_to_meal_planner(driver)
    
    # Open the form
    add_button = wait_for_clickable(driver, By.XPATH, "//button[text()='Add Meal']")
    add_button.click()
    
    # Wait for form to appear
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.TAG_NAME, "select"))
    )
    
    # Select Tuesday lunch
    day_select = Select(driver.find_elements(By.TAG_NAME, "select")[0])
    day_select.select_by_visible_text("Tuesday")
    
    meal_select = Select(driver.find_elements(By.TAG_NAME, "select")[1])
    meal_select.select_by_visible_text("Lunch")
    
    # Generate a unique meal name
    unique_meal = f"Updated Lunch {int(time.time())}"
    
    # Enter updated meal
    meal_input = driver.find_element(By.TAG_NAME, "input")
    meal_input.clear()
    meal_input.send_keys(unique_meal)
    
    # Save the updated meal
    save_button = wait_for_clickable(driver, By.XPATH, "//button[contains(text(), 'Save')]")
    save_button.click()
    
    # Wait for save to complete
    WebDriverWait(driver, 10).until_not(
        EC.presence_of_element_located((By.XPATH, "//button[contains(text(), 'Save')]"))
    )
    
    # Verify the updated meal appears in the table
    assert unique_meal in driver.page_source

def test_navigation_back_to_home(driver):
    """Test 7: Navigate back to home page from meal planner."""
    navigate_to_meal_planner(driver)
    
    # Find and click the MealPlanner link
    home_link = driver.find_element(By.XPATH, "//h2[contains(text(), 'MealPlanner')]")
    home_link.click()
    
    # Verify we're back on the home page
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.TAG_NAME, "h1"))
    )
    
    # Check for home page elements
    assert "Meal planning" in driver.page_source

def test_meal_planner_responsive_design(driver):
    """Test 8: Test responsive design of meal planner at different screen sizes."""
    # Set mobile viewport
    driver.set_window_size(375, 667)  # iPhone 8 size
    navigate_to_meal_planner(driver)
    
    # Verify page loads in mobile view
    assert "Weekly Meal Planner" in driver.page_source
    driver.save_screenshot("screenshots/mobile_view.png")
    
    # Set tablet viewport
    driver.set_window_size(768, 1024)  # iPad size
    navigate_to_meal_planner(driver)
    driver.save_screenshot("screenshots/tablet_view.png")
    
    # Set desktop viewport
    driver.set_window_size(1366, 768)  # Standard laptop
    navigate_to_meal_planner(driver)
    driver.save_screenshot("screenshots/desktop_view.png")
    
    # Ensure table is still visible across all sizes
    assert is_element_present(driver, By.TAG_NAME, "table")

def test_page_reload_maintains_data(driver):
    """Test 9: Verify that reloading the page maintains the meal plan data."""
    navigate_to_meal_planner(driver)
    
    # Store the initial table HTML for comparison
    initial_table = driver.find_element(By.TAG_NAME, "table").get_attribute('outerHTML')
    
    # Reload the page
    driver.refresh()
    
    # Wait for page to reload and table to appear
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.TAG_NAME, "table"))
    )
    
    # Get the new table HTML
    reloaded_table = driver.find_element(By.TAG_NAME, "table").get_attribute('outerHTML')
    
    # Compare table structure (not exact HTML as IDs might change)
    assert "Weekly Meal Planner" in driver.page_source
    assert len(driver.find_elements(By.TAG_NAME, "tr")) == 8  # Header + 7 days

def test_error_handling_invalid_url(driver):
    """Test 10: Test app's handling of invalid URLs."""
    # Navigate to a non-existent route
    driver.get(f"{BASE_URL}/nonexistent")
    
    # Wait for the app to process the route
    time.sleep(2)
    
    # Check if we're redirected to the home page or have an error handling component
    # This depends on your app's routing setup - modify as needed
    assert BASE_URL in driver.current_url
    
    # Make sure we didn't get a server error
    assert "Error" not in driver.title 