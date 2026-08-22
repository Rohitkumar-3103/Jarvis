# ==========================================================================
# J.A.R.V.I.S. 3.2.0 - Native Music & Media Playback Controller
# ==========================================================================
import os
import random
import platform
import subprocess
import webbrowser
from pathlib import Path
from urllib.parse import quote

VALID_EXTENSIONS = ('.mp3', '.wav', '.ogg', '.mp4', '.mkv', '.avi', '.flac', '.m4a', '.webm')

def get_track_list(directory: str = None) -> list[str]:
    """Returns all audio and video file paths discovered across system media libraries."""
    tracks = []
    
    # Prioritized directories to scan
    scan_dirs = []
    if directory and os.path.exists(directory):
        scan_dirs.append(directory)
    
    user_home = Path.home()
    default_dirs = [
        str(user_home / "Music" / "New folder" / "video"),
        str(user_home / "Music"),
        str(user_home / "Videos"),
        str(user_home / "Downloads"),
        os.environ.get("JARVIS_MUSIC_DIR", "")
    ]
    
    for d in default_dirs:
        if d and os.path.exists(d) and d not in scan_dirs:
            scan_dirs.append(d)
            
    for base in scan_dirs:
        try:
            for root, _, files in os.walk(base):
                for f in files:
                    if f.lower().endswith(VALID_EXTENSIONS):
                        tracks.append(os.path.join(root, f))
        except Exception:
            continue

    # Return deduplicated tracks
    seen = set()
    deduped = []
    for t in tracks:
        if t not in seen:
            seen.add(t)
            deduped.append(t)
    return deduped

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

def play_music(song_query: str = "") -> dict:
    """Selects and plays a matching track, random local track, or YouTube video."""
    tracks = get_track_list()
    
    clean_query = song_query.strip().lower()
    for prefix in ["play music", "play song", "play track", "play video", "play"]:
        if clean_query.startswith(prefix):
            clean_query = clean_query[len(prefix):].strip()
            
    # 1. If a specific song query is provided, search local tracks
    if clean_query:
        query_words = [w for w in clean_query.split() if len(w) > 1]
        matching_tracks = []
        
        for track in tracks:
            filename = os.path.basename(track).lower()
            if clean_query in filename or all(w in filename for w in query_words):
                matching_tracks.append(track)
                
        if matching_tracks:
            selected_track = matching_tracks[0]
            success = play_track(selected_track)
            if success:
                track_title = os.path.splitext(os.path.basename(selected_track))[0]
                return {
                    "status": "success",
                    "message": f"Playing: {track_title}",
                    "track": track_title
                }

    # 2. If tracks exist locally, play a random track
    if tracks:
        selected_track = random.choice(tracks)
        success = play_track(selected_track)
        if success:
            track_title = os.path.splitext(os.path.basename(selected_track))[0]
            return {
                "status": "success",
                "message": f"Playing: {track_title}",
                "track": track_title
            }

    # 3. If online search or fallback
    target_query = clean_query or "popular music"
    yt_url = f"https://www.youtube.com/results?search_query={quote(target_query)}"
    try:
        webbrowser.open(yt_url)
        return {
            "status": "success",
            "message": f"Opening {target_query} on YouTube.",
            "track": target_query
        }
    except Exception as ex:
        return {"status": "error", "message": f"Could not launch media player: {str(ex)}"}

def play_random_track(directory: str = None) -> dict:
    """Wrapper for random track playback."""
    return play_music()

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