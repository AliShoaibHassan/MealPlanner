#!/usr/bin/env python3
"""
Script to download the correct ChromeDriver for the installed Chrome version.
This can be run manually to ensure the proper driver is available.
"""

import os
import sys
import zipfile
import requests
import platform
import subprocess
from io import BytesIO

def get_chrome_version():
    """Get the version of Chrome installed on the system."""
    if platform.system() == 'Windows':
        # Try to get Chrome version from Windows registry
        try:
            # Method 1: Check Chrome version from registry
            import winreg
            key = winreg.OpenKey(winreg.HKEY_CURRENT_USER, r'Software\Google\Chrome\BLBeacon')
            version, _ = winreg.QueryValueEx(key, 'version')
            return version
        except:
            # Method 2: Use a hardcoded version (from user input)
            return "137.0.7151.104"  # Your Chrome version
    else:
        # For Linux/Mac, add appropriate command here
        return "137.0.7151.104"  # Default version

def download_chromedriver(version):
    """Download the ChromeDriver that matches the Chrome version."""
    # Extract major version
    major_version = version.split('.')[0]
    
    # Create drivers directory if it doesn't exist
    os.makedirs('drivers', exist_ok=True)
    
    # URLs for different platforms
    if platform.system() == 'Windows':
        url = f"https://storage.googleapis.com/chrome-for-testing-public/{major_version}.0.{major_version}.0/win64/chromedriver-win64.zip"
    elif platform.system() == 'Darwin':  # macOS
        url = f"https://storage.googleapis.com/chrome-for-testing-public/{major_version}.0.{major_version}.0/mac-x64/chromedriver-mac-x64.zip"
    else:  # Linux
        url = f"https://storage.googleapis.com/chrome-for-testing-public/{major_version}.0.{major_version}.0/linux64/chromedriver-linux64.zip"
    
    print(f"Downloading ChromeDriver from {url}")
    
    try:
        # Download the zip file
        response = requests.get(url)
        response.raise_for_status()  # Raise an error for bad responses
        
        # Extract the zip file
        with zipfile.ZipFile(BytesIO(response.content)) as zip_file:
            # Extract all files to the drivers directory
            zip_file.extractall('drivers')
        
        # Rename the chromedriver to ensure it's at the standard location
        if platform.system() == 'Windows':
            src = os.path.join('drivers', 'chromedriver-win64', 'chromedriver.exe')
            dst = os.path.join('drivers', 'chromedriver.exe')
            if os.path.exists(src):
                if os.path.exists(dst):
                    os.remove(dst)
                os.rename(src, dst)
                print(f"ChromeDriver downloaded to {dst}")
                return dst
        
        print("ChromeDriver extracted to drivers directory")
        
    except Exception as e:
        print(f"Error downloading ChromeDriver: {e}")
        return None

if __name__ == "__main__":
    chrome_version = get_chrome_version()
    print(f"Detected Chrome version: {chrome_version}")
    chromedriver_path = download_chromedriver(chrome_version)
    
    if chromedriver_path and os.path.exists(chromedriver_path):
        print("ChromeDriver download successful!")
        print(f"Path: {os.path.abspath(chromedriver_path)}")
    else:
        print("Failed to download ChromeDriver. Please download it manually.")
        sys.exit(1) 