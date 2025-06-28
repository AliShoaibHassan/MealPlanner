#!/usr/bin/env python3
"""
Main script to run Selenium tests in Docker containers for Jenkins integration.
"""

import os
import sys
import time
import pytest
import subprocess

def wait_for_services():
    """Wait for frontend and backend services to be ready."""
    print("Waiting for services to be ready...")
    
    # Check if we're running in Docker
    in_docker = os.environ.get('IN_DOCKER', 'false').lower() == 'true'
    
    # Set host names based on environment
    frontend_host = "frontend" if in_docker else "localhost"
    backend_host = "backend" if in_docker else "localhost"
    
    frontend_port = "3100"
    backend_port = "5100"
    
    # Wait for frontend
    max_attempts = 30
    for attempt in range(max_attempts):
        try:
            result = subprocess.run(
                ["curl", "-s", f"http://{frontend_host}:{frontend_port}"],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                timeout=2
            )
            if result.returncode == 0:
                print(f"Frontend service is ready at http://{frontend_host}:{frontend_port}")
                break
        except Exception as e:
            pass
        
        print(f"Waiting for frontend service... ({attempt+1}/{max_attempts})")
        time.sleep(2)
    
    # Wait for backend
    for attempt in range(max_attempts):
        try:
            result = subprocess.run(
                ["curl", "-s", f"http://{backend_host}:{backend_port}"],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                timeout=2
            )
            if result.returncode == 0:
                print(f"Backend service is ready at http://{backend_host}:{backend_port}")
                break
        except Exception as e:
            pass
        
        print(f"Waiting for backend service... ({attempt+1}/{max_attempts})")
        time.sleep(2)

def run_tests():
    """Run the Selenium tests."""
    print("Starting Selenium tests...")
    
    # Create necessary directories
    os.makedirs("reports", exist_ok=True)
    os.makedirs("screenshots", exist_ok=True)
    
    # Run tests using pytest
    return pytest.main([
        "tests/test_meal_planner.py",
        "-v",
        "--html=reports/report.html",
        "--self-contained-html"
    ])

if __name__ == "__main__":
    print("Starting test execution...")
    
    # Wait for services to be ready
    wait_for_services()
    
    # Run the tests
    exit_code = run_tests()
    
    print(f"Tests completed with exit code: {exit_code}")
    sys.exit(exit_code) 