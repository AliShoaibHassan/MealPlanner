import pytest
import os
import platform
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options

@pytest.fixture(scope="function")
def driver():
    """Setup and teardown for WebDriver with headless Chrome."""
    chrome_options = Options()
    
    # Headless mode setup for CI/CD pipeline on AWS EC2
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920,1080")
    
    # Use manually installed ChromeDriver
    if platform.system() == 'Windows':
        # Use the manually installed ChromeDriver
        driver_path = "C:\\chromedriver\\chromedriver.exe"
        
        if not os.path.exists(driver_path):
            # Fallback paths if the main path doesn't exist
            potential_paths = [
                "C:\\chromedriver.exe",
                os.path.join(os.getcwd(), "drivers", "chromedriver.exe"),
                os.path.join(os.getcwd(), "chromedriver.exe")
            ]
            
            for path in potential_paths:
                if os.path.exists(path):
                    driver_path = path
                    break
    else:
        # For non-Windows systems
        driver_path = "/usr/local/bin/chromedriver"
    
    print(f"Using ChromeDriver at: {driver_path}")
    
    # Setup WebDriver with the correct driver path
    service = Service(executable_path=driver_path)
    driver = webdriver.Chrome(service=service, options=chrome_options)
    
    # Set implicit wait time for element location
    driver.implicitly_wait(10)
    driver.set_page_load_timeout(30)
    
    # Return the driver for the test case
    yield driver
    
    # Teardown - close the driver after test
    driver.quit() 