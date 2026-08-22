import os
import random
import platform
import subprocess

DEFAULT_MUSIC_DIR = r"C:\Users\seaem\Music\New folder\video"

def get_track_list(directory: str = DEFAULT_MUSIC_DIR) -> list[str]:
    """Returns a list of all audio and video file paths in the target directory."""
    if not os.path.exists(directory):
        return []
    valid_extensions = ('.mp3', '.wav', '.ogg', '.mp4', '.mkv', '.avi', '.flac')
    return [
        os.path.join(directory, f)
        for f in os.listdir(directory)
        if f.lower().endswith(valid_extensions)
    ]

def play_track(track_path: str) -> bool:
    """Plays a specific audio/video track in the default OS application."""
    try:
        if platform.system() == "Windows":
            os.startfile(track_path)
            return True
        else:
            subprocess.Popen(["xdg-open", track_path])
            return True
    except Exception as e:
        print(f"[Music] Playback failed: {e}")
        return False

def play_random_track(directory: str = DEFAULT_MUSIC_DIR) -> dict:
    """Selects and plays a random track from the media folder."""
    tracks = get_track_list(directory)
    if not tracks:
        return {"status": "error", "message": f"No tracks found in {directory}"}
    
    selected_track = random.choice(tracks)
    success = play_track(selected_track)
    if success:
        return {
            "status": "success",
            "message": f"Started playing: {os.path.basename(selected_track)}",
            "track": os.path.basename(selected_track)
        }
    return {"status": "error", "message": "Failed to launch media player."}

def control_playback(action: str) -> bool:
    """Simulates media player key events (play/pause, mute, volume)."""
    if platform.system() != "Windows":
        return False
    try:
        import ctypes
        key_codes = {
            "play_pause": 0xB3,
            "next": 0xB0,
            "prev": 0xB1,
            "mute": 0xAD
        }
        code = key_codes.get(action.lower())
        if code:
            ctypes.windll.user32.keybd_event(code, 0, 0, 0)
            ctypes.windll.user32.keybd_event(code, 0, 2, 0)
            return True
    except Exception:
        pass
    return False