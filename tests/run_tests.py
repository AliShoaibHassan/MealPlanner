#!/usr/bin/env python3
"""
Script to run Selenium tests for Jenkins pipeline integration.
This script will run the tests and generate an HTML report.
"""

import os
import sys
import subprocess
import datetime
import importlib.util

def create_directories():
    """Create necessary directories for test artifacts."""
    os.makedirs("screenshots", exist_ok=True)
    os.makedirs("reports", exist_ok=True)
    os.makedirs("drivers", exist_ok=True)

def download_chromedriver():
    """Download ChromeDriver before running tests."""
    # Import the download_chromedriver module
    try:
        spec = importlib.util.spec_from_file_location(
            "download_chromedriver", 
            os.path.join(os.path.dirname(__file__), "download_chromedriver.py")
        )
        driver_module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(driver_module)
        
        # Run the download
        chrome_version = driver_module.get_chrome_version()
        print(f"Chrome version detected: {chrome_version}")
        driver_path = driver_module.download_chromedriver(chrome_version)
        
        if driver_path and os.path.exists(driver_path):
            print(f"ChromeDriver downloaded successfully to: {os.path.abspath(driver_path)}")
            return True
        else:
            print("Warning: ChromeDriver download may have failed. Continuing with tests...")
            return False
    except Exception as e:
        print(f"Warning: Error downloading ChromeDriver: {e}")
        print("Continuing with tests, will rely on webdriver-manager...")
        return False

def run_tests():
    """Run the Selenium tests with pytest."""
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    report_file = f"reports/report_{timestamp}.html"
    
    # Build the command to run tests
    cmd = [
        "pytest",
        "tests/test_meal_planner.py",
        "-v",
        f"--html={report_file}",
        "--self-contained-html"
    ]
    
    print(f"Running tests with command: {' '.join(cmd)}")
    
    # Run the tests
    result = subprocess.run(cmd, capture_output=True, text=True)
    
    # Print output
    print("\n=== STDOUT ===")
    print(result.stdout)
    
    print("\n=== STDERR ===")
    print(result.stderr)
    
    print(f"\nTest report generated at {report_file}")
    
    # Return the exit code
    return result.returncode

if __name__ == "__main__":
    create_directories()
    
    # Try to download ChromeDriver first
    print("Attempting to download ChromeDriver...")
    download_chromedriver()
    
    # Run the tests
    exit_code = run_tests()
    sys.exit(exit_code) 