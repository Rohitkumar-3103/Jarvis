import sys
import os

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from core.llm import get_llm_provider, _load_config

def test_load_config():
    config = _load_config()
    assert isinstance(config, dict)

def test_llm_provider_retrieval():
    provider = get_llm_provider()
    assert provider in ("ollama", "openai")