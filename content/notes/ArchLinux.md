---
title: 'Arch Linux Installation Scripts'
publishedAt: '2024-08-18'
summary: 'A comprehensive guide to Arch Linux installation scripts, including package management and system setup.'
---

# Arch Linux Installation Scripts

## Installation

```bash
curl -L https://www.0x7ffed9b08230.dev/scripts/ArchLinux/setup.sh --output setup.sh
chmod a+x setup.sh
sudo ./setup.sh
```

## 1. `pkgs.py`

This Python script fetches and installs packages from a remote site.

### Key Features:
- Fetches package information from a JSON file hosted online
- Allows listing available packages
- Installs selected packages using `pacman` or `yay`

### Notable Functions:
- `fetch_packages()`: Retrieves package data from the remote URL
- `display_packages(packages)`: Shows available packages grouped by category
- `install_packages(packages, selected_packages)`: Installs user-selected packages

### Usage:

```bash
python pkgs.py --list  # List available packages
python pkgs.py --install pkg1,pkg2,pkg3  # Install specific packages
```

## 2. `pkgs.json`

This JSON file contains the package definitions used by `pkgs.py`.

### Structure:
```json
{
  "package_id": {
    "name": "Package Name",
    "description": "Package description",
    "install": "Installation command",
    "category": "Package category"
  },
  ...
}
```

### Categories:
1. Networking
2. Development
3. Utilities
4. System
5. Fun
6. Editors
7. Shells
8. Internet
9. Multimedia
10. Graphics
11. Office
12. Productivity

## 3. `setup.sh`

This Bash script automates the Arch Linux installation process.

### Key Features:
- Installs essential packages
- Sets up user directories
- Configures system settings
- Installs user-selected packages using `pkgs.py`
- Installs AUR helper (`yay`)

### Notable Functions:
- `install_packages()`: Installs packages using `pacman`
- `install_aur_packages()`: Installs packages using `yay`
- `configure_system()`: Sets up system-wide configurations
- `install_packages_from_pkgs()`: Uses `pkgs.py` to install user-selected packages

### Execution Flow:
1. Check prerequisites
2. Initialize keyring
3. Update system
4. Install essential packages
5. Install `yay`
6. Download and run `pkgs.py`
7. Install user-selected packages
8. Set up directories
9. Configure system
10. Cleanup and log actions


## Conclusion

These scripts provide a comprehensive solution for automating Arch Linux installation and package management, allowing users to easily customize their system with desired software. By leveraging the power of Python for package management and Bash for system configuration, users can streamline their Arch Linux setup process and ensure a consistent environment across multiple installations.