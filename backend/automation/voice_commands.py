import re

# Command regex patterns
COMMAND_PATTERNS = {
    "screenshot": r"(take|capture)\s+(a\s+)?screenshot",
    "camera": r"(take|capture)\s+(a\s+)?photo|camera\s+screenshot",
    "music_play": r"play\s+music",
    "music_stop": r"(stop|pause|mute)\s+music",
    "music_next": r"next\s+(track|music)",
    "open_folder": r"open\s+(local\s+)?(music|video)\s+folder",
    "calculator": r"open\s+calculator",
    "explorer": r"open\s+(file\s+)?explorer",
    "code": r"open\s+(vs\s+)?code"
}

def match_voice_command(transcript: str) -> str:
    """Matches a voice transcript text against mapped automation commands."""
    text = transcript.strip().lower()
    for cmd_name, pattern in COMMAND_PATTERNS.items():
        if re.search(pattern, text):
            return cmd_name
    return "conversational"
