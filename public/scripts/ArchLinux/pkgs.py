#!/usr/bin/env python3

"""
Arch Linux Install Script - pkgs.py

This script fetches packages from a remote site and installs them.

External Scripts:
  - setup.sh

Author: Stella <stellaonestrogen@gmail.com>
Version: 1.1
Last Updated: 2/11/2024 3:45 AM JST (GMT+9, Tokyo)
Notes: https://www.0x7ffed9b08230.dev/notes/ArchInstall
"""

import sys
import subprocess
import json
import argparse
from typing import Dict, List

PKGS_URL = "https://www.0x7ffed9b08230.dev/api/content?path=misc/ArchLinux/pkgs.json"

parser = argparse.ArgumentParser(description="Install packages from a remote site.")
parser.add_argument("--list", action="store_true", help="List all available packages")
parser.add_argument("--install", type=str, help="Comma-separated list of packages to install")
args = parser.parse_args()

def install_required_packages():
    required_packages = ["python-requests"]
    print("Installing required packages...")
    subprocess.run(["sudo", "pacman", "-S", "--needed", "--noconfirm"] + required_packages, check=True)

try:
    import requests
except ImportError:
    install_required_packages()
    import requests

def fetch_packages() -> Dict:
    try:
        response = requests.get(PKGS_URL)
        response.raise_for_status()
        return response.json()['content']
    except requests.RequestException as e:
        print(f"Failed to fetch packages. Error: {e}")
        return None

def display_packages(packages: Dict):
    categories = {}
    for key, value in packages.items():
        category = value.get('category', 'Uncategorized')
        categories.setdefault(category, []).append((key, value))
    
    for category, pkg_list in sorted(categories.items()):
        print(f"\n#====| {category} | ====#\n")
        for key, value in sorted(pkg_list):
            print(f"{key}) {value['name']}: {value['description']}")

def install_packages(packages: Dict, selected_packages: List[str]):
    print("Installing packages:")
    for pkg in selected_packages:
        if pkg in packages:
            print(f"Installing {pkg}")
            install_cmd = packages[pkg]['install']
            try:
                if install_cmd.startswith("sudo pacman"):
                    subprocess.run(install_cmd, shell=True, check=True)
                elif install_cmd.startswith("yay"):
                    subprocess.run(install_cmd, shell=True, check=True)
                else:
                    print(f"Unsupported installation method for {pkg}")
                    continue
                print(f"Successfully installed {pkg}")
            except subprocess.CalledProcessError as e:
                print(f"Failed to install {pkg}. Error: {e}")
        else:
            print(f"Package {pkg} not found in the available packages.")

def main():
    packages = fetch_packages()
    if packages:
        if args.list:
            display_packages(packages)
        elif args.install:
            selected_packages = [pkg.strip() for pkg in args.install.split(',') if pkg.strip() in packages]
            if selected_packages:
                install_packages(packages, selected_packages)
            else:
                print("No valid packages selected. Exiting.")
        else:
            parser.print_help()
    else:
        print("No packages fetched. Exiting.")
        sys.exit(1)

if __name__ == "__main__":
    main()
