"""
J.A.R.V.I.S. Config Package
Configuration and cross-platform resolution.
"""

from .environment import get_config, get_os, is_windows, is_mac, is_linux

__all__ = [
    "get_config",
    "get_os",
    "is_windows",
    "is_mac",
    "is_linux",
]
