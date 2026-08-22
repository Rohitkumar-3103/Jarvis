import pytest
import sys
import os

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.server import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_home_route(client):
    """Test standard home diagnostic check."""
    rv = client.get('/')
    assert rv.status_code == 200
    json_data = rv.get_json()
    assert json_data['status'] == 'success'
    assert json_data['version'] == '3.2.0'

def test_chat_history_routes(client):
    """Test chat history database saving, loading, and deletion."""
    # Test GET
    rv_get = client.get('/api/chat/history')
    assert rv_get.status_code == 200
    
    # Test POST
    payload = {
        "sender": "USER",
        "text": "System check message",
        "timestamp": "12:00"
    }
    rv_post = client.post('/api/chat/history', json=payload)
    assert rv_post.status_code == 200
    
    # Test DELETE
    rv_del = client.delete('/api/chat/history')
    assert rv_del.status_code == 200

def test_system_diagnostics(client):
    """Test telemetry CPU and memory diagnostics api."""
    payload = {"command": "diagnostics"}
    rv = client.post('/api/system/command', json=payload)
    assert rv.status_code == 200
    json_data = rv.get_json()
    assert json_data['status'] == 'success'
    assert 'cpu' in json_data
    assert 'ram' in json_data
    assert 'temp' in json_data