import subprocess
import os

def execute_adb_command(args: list[str]) -> tuple[bool, str]:
    """Executes a custom adb command safely."""
    try:
        res = subprocess.run(["adb"] + args, capture_output=True, text=True, timeout=5)
        if res.returncode == 0:
            return True, res.stdout.strip()
        return False, res.stderr.strip()
    except Exception as e:
        return False, str(e)

def get_connected_devices() -> list[str]:
    """Returns a list of connected device serial IDs."""
    success, stdout = execute_adb_command(["devices"])
    if not success:
        return []
    devices = []
    lines = stdout.split('\n')[1:]
    for line in lines:
        if line.strip():
            parts = line.split()
            if len(parts) >= 2 and parts[1] == 'device':
                devices.append(parts[0])
    return devices

def capture_adb_screenshot(output_path: str = "assets/images/phone_screen.png") -> bool:
    """Captures phone screen and copies it to the workspace assets folder."""
    success, _ = execute_adb_command(["shell", "screencap", "-p", "/sdcard/screen.png"])
    if not success:
        return False
    success, _ = execute_adb_command(["pull", "/sdcard/screen.png", output_path])
    return success

def launch_android_app(package_name: str) -> bool:
    """Launches an application package on the android device."""
    args = ["shell", "monkey", "-p", package_name, "-c", "android.intent.category.LAUNCHER", "1"]
    success, _ = execute_adb_command(args)
    return success

def simulate_adb_tap(x: int, y: int) -> bool:
    """Simulates a tap at (x, y) coordinates on device screen."""
    success, _ = execute_adb_command(["shell", "input", "tap", str(x), str(y)])
    return success
