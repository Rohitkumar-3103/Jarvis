#!/usr/bin/env python3
"""
J.A.R.V.I.S. AI OS Package Setup Specification
"""
from setuptools import setup, find_packages
from pathlib import Path

this_directory = Path(__file__).parent
long_description = (this_directory / "README.md").read_text(encoding="utf-8") if (this_directory / "README.md").exists() else ""

setup(
    name="jarvis-ai-os",
    version="3.2.0",
    description="Full-stack AI assistant and tactical Sci-Fi Operating System",
    long_description=long_description,
    long_description_content_type="text/markdown",
    author="Rohit Kumar",
    url="https://github.com/Rohitkumar-3103/Jarvis",
    packages=find_packages(exclude=["tests*", "demo*", "screenshots*"]),
    include_package_data=True,
    python_requires=">=3.10",
    install_requires=[
        "flask>=3.0.0",
        "flask-cors>=4.0.0",
        "requests>=2.31.0",
        "google-genai>=0.1.0",
        "google-generativeai>=0.8.0",
        "psutil>=5.9.0",
        "pillow>=10.0.0",
        "opencv-python>=4.8.0",
        "numpy>=1.24.0",
    ],
    extras_require={
        "desktop": [
            "PyQt6>=6.5.0",
            "sounddevice>=0.4.6",
            "pyautogui>=0.9.54",
            "mss>=9.0.1",
            "playwright>=1.40.0",
        ],
        "test": [
            "pytest>=8.0.0",
            "pytest-cov>=4.1.0",
        ],
    },
    entry_points={
        "console_scripts": [
            "jarvis-dashboard=run_dashboard:main",
            "jarvis-backend=backend.server:main",
        ],
    },
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Programming Language :: Python :: 3.12",
        "Topic :: Scientific/Engineering :: Artificial Intelligence",
    ],
)
