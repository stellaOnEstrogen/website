#!/bin/bash

# Arch Linux Install Script
#
# This script installs packages, configures the system, and performs additional setup tasks.
#
# External Scripts:
#   - pkgs.py
#
# Author: Stella <stellaonestrogen@gmail.com>
# Version: 1.2
# Last Updated: 2023-04-14 15:30 JST (GMT+9, Tokyo)
# Notes: https://www.0x7ffed9b08230.dev/notes/ArchInstall

set -euo pipefail

SITE_URLS=("https://www.0x7ffed9b08230.dev/scripts/ArchLinux/pkgs.py")
LOG_FILE="$HOME/archinstall.log"
ACTIONS=()

# Utility Functions
log() {
    local message="$1"
    local level="${2:-INFO}"
    local timestamp=$(date +"%Y-%m-%d %H:%M:%S")
    printf "[%-5s] %s: %s\n" "${level^^}" "$timestamp" "$message" | tee -a "$LOG_FILE"
}

run_command() {
    if ! "$@"; then
        log "Command failed: $*" "ERROR"
        exit 1
    fi
}

install_packages() {
    local packages=("$@")
    log "Installing packages: ${packages[*]}"
    run_command sudo pacman -S --needed --noconfirm "${packages[@]}"
}

install_aur_packages() {
    local packages=("$@")
    log "Installing AUR packages: ${packages[*]}"
    run_command yay -S --needed --noconfirm "${packages[@]}"
}

setup_directories() {
    log "Setting up directories"
    local directories=("bin" "Projects" "Downloads" "Documents" "Music" "Pictures" "Videos")
    for dir in "${directories[@]}"; do
        mkdir -p "$HOME/$dir"
    done
}

install_yay() {
    log "Installing yay AUR helper"
    if ! command -v yay &> /dev/null; then
        git clone https://aur.archlinux.org/yay.git
        (cd yay && makepkg -si --noconfirm)
        rm -rf yay
    else
        log "yay is already installed"
    fi
}

configure_system() {
    log "Configuring system settings"
    read -p "Enter hostname: " hostname
    echo "$hostname" | sudo tee /etc/hostname
}

install_packages_from_pkgs() {
    if [ -z "${1:-}" ]; then
        return 0
    fi
    log "Installing packages using pkgs.py"
    python3 /tmp/pkgs.py --install "$1"
}

check_prerequisites() {
    if [ ! -t 0 ]; then
        log "This script should be run interactively. For example, run it with 'bash setup.sh'" "ERROR"
        exit 1
    fi

    if [ "$(id -u)" -eq 0 ]; then
        log "This script should not be run as root" "ERROR"
        exit 1
    fi
}

initialize_keyring() {
    log "Initializing the Arch Linux keyring"
    run_command sudo pacman-key --init
    run_command sudo pacman-key --populate archlinux
    ACTIONS+=("INITIALIZE_KEYRING")
}

update_system() {
    log "Updating the system"
    run_command sudo pacman -Syu --noconfirm
    run_command sudo pacman -S --noconfirm archlinux-keyring
    ACTIONS+=("UPDATE_SYSTEM")
}

install_essential_packages() {
    install_packages base-devel git curl python3 python-pip wget
    ACTIONS+=("INSTALL_ESSENTIAL_PACKAGES")
}

download_pkgs_script() {
    local pkg_script_url=${SITE_URLS[0]}
    ACTIONS+=("DOWNLOAD_PKGS_SCRIPT")
    wget -O /tmp/pkgs.py "$pkg_script_url"
    ACTIONS+=("DOWNLOAD_PKGS_SCRIPT_SUCCESS")
}

install_user_packages() {
    python3 /tmp/pkgs.py --list
    ACTIONS+=("LIST_PACKAGES")
    read -p "Enter packages to install (comma-separated): " user_packages
    ACTIONS+=("USER_PACKAGES")
    install_packages_from_pkgs "$user_packages"
    ACTIONS+=("INSTALL_USER_PACKAGES")
}

install_additional_packages() {
    read -p "Enter additional packages to install (space-separated): " additional_packages
    ACTIONS+=("USER_ADDITIONAL_PACKAGES")
    if [ -n "$additional_packages" ]; then
        install_aur_packages $additional_packages
        ACTIONS+=("INSTALL_AUR_PACKAGES")
    fi
}

cleanup() {
    rm /tmp/pkgs.py
    ACTIONS+=("REMOVE_PKGS_SCRIPT")
}

log_actions() {
    echo "Actions performed:" | sudo tee -a "$LOG_FILE"
    for i in "${!ACTIONS[@]}"; do
        echo "$((i+1))) ${ACTIONS[$i]}" | sudo tee -a "$LOG_FILE"
    done
    ACTIONS+=("ECHO_ACTIONS")
}

main() {
    log "Starting Arch Linux setup"
    
    check_prerequisites
    initialize_keyring
    update_system
    install_essential_packages
    install_yay
    download_pkgs_script
    install_user_packages
    install_additional_packages
    setup_directories
    configure_system
    cleanup

    log "Arch Linux setup completed successfully"
    log "Please reboot your system to apply all changes"
    ACTIONS+=("SUGGEST_REBOOT")

    log_actions
}

main