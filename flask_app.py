#!/usr/bin/python3.10

from server import app as application
import sys
import os

# Add your project directory to the sys.path
path = '/home/yourusername/mysite'
if path not in sys.path:
    sys.path.insert(0, path)


if __name__ == "__main__":
    application.run()
