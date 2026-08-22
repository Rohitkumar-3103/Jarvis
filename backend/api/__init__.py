"""
J.A.R.V.I.S. Backend API Blueprints
REST microservices for authentication, diagnostics, AI cognition, code execution, and system controls.
"""

from .ai import backend_ai_api
from .auth import auth_api
from .calls import calls_api
from .chat import chat_api
from .code import code_api
from .files import files_api
from .system import system_api
from .weather import weather_api

__all__ = [
    "backend_ai_api",
    "auth_api",
    "calls_api",
    "chat_api",
    "code_api",
    "files_api",
    "system_api",
    "weather_api",
]
