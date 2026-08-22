"""
J.A.R.V.I.S. Actions Package
Autonomous Agent Tool Handlers & OS Automation Capabilities
"""

from .browser_control import browser_control
from .code_helper import code_helper
from .computer_control import computer_control
from .computer_settings import computer_settings
from .desktop import desktop_control
from .dev_agent import dev_agent
from .file_controller import file_controller
from .flight_finder import flight_finder
from .game_updater import game_updater
from .messaging import send_message
from .music import play_random_track, control_playback
from .open_app import open_app
from .proactive import ProactiveEngine
from .reminder import reminder
from .screen_processor import _capture_camera, _capture_screen
from .system_monitor import SystemMonitor, get_system_status
from .weather import weather_action
from .web_search import web_search
from .youtube import youtube_video

__all__ = [
    "browser_control",
    "code_helper",
    "computer_control",
    "computer_settings",
    "desktop_control",
    "dev_agent",
    "file_controller",
    "flight_finder",
    "game_updater",
    "send_message",
    "play_random_track",
    "control_playback",
    "open_app",
    "ProactiveEngine",
    "reminder",
    "_capture_camera",
    "_capture_screen",
    "SystemMonitor",
    "get_system_status",
    "weather_action",
    "web_search",
    "youtube_video",
]
