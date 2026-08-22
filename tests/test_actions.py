import sys
import os
import pytest

# Add root directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from actions import (
    browser_control,
    code_helper,
    computer_control,
    computer_settings,
    desktop_control,
    dev_agent,
    file_controller,
    flight_finder,
    game_updater,
    send_message,
    play_random_track,
    control_playback,
    open_app,
    ProactiveEngine,
    reminder,
    _capture_camera,
    _capture_screen,
    SystemMonitor,
    get_system_status,
    weather_action,
    web_search,
    youtube_video,
)

def test_actions_exports():
    """Verify that all actions package functions and classes are accessible and callable."""
    assert callable(browser_control)
    assert callable(code_helper)
    assert callable(computer_control)
    assert callable(computer_settings)
    assert callable(desktop_control)
    assert callable(dev_agent)
    assert callable(file_controller)
    assert callable(flight_finder)
    assert callable(game_updater)
    assert callable(send_message)
    assert callable(play_random_track)
    assert callable(control_playback)
    assert callable(open_app)
    assert callable(reminder)
    assert callable(_capture_camera)
    assert callable(_capture_screen)
    assert callable(get_system_status)
    assert callable(weather_action)
    assert callable(web_search)
    assert callable(youtube_video)

def test_system_status_action():
    """Verify system status telemetry returns non-empty dict."""
    status = get_system_status()
    assert isinstance(status, dict)
    assert "cpu_percent" in status or "error" in status
