import sys
import os

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.automation.os_controls import get_cpu_temp, volume_up, volume_down, execute_os_action

def test_cpu_temp_fetching():
    temp = get_cpu_temp()
    assert isinstance(temp, float)

def test_volume_actions():
    v_up = volume_up()
    v_down = volume_down()
    assert isinstance(v_up, bool)
    assert isinstance(v_down, bool)

def test_unsupported_commands():
    res = execute_os_action("invalid_non_existent_command_xyz")
    assert res["status"] == "unsupported"