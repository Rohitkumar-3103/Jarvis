import os
import subprocess
import time
import webbrowser
import sys
import json
import socket

def check_gemini_key():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    key_path = os.path.join(script_dir, "config", "api_keys.json")
    if os.path.exists(key_path):
        try:
            with open(key_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                key = data.get("gemini_api_key", "")
                if not key or "YOUR_GEMINI_API_KEY_HERE" in key:
                    return False
                return True
        except Exception:
            return False
    return False

def find_free_port(start_port=8080):
    port = start_port
    while port < 65535:
        is_free = True
        for host in ["127.0.0.1", "0.0.0.0"]:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                try:
                    s.bind((host, port))
                except socket.error:
                    is_free = False
                    break
        if is_free:
            return port
        port += 1
    return start_port

def find_valid_python():
    # Try current python, then fallback options that might have libraries installed
    candidates = [
        sys.executable,
        "py -3.12",
        "py -3.10",
        "python3",
        "python"
    ]
    for cand in candidates:
        try:
            if cand == sys.executable:
                import flask
                import cv2
                # Validate CascadeClassifier exists
                if not hasattr(cv2, 'CascadeClassifier'):
                    raise ImportError("cv2 missing CascadeClassifier")
                return [sys.executable]
            else:
                parts = cand.split()
                # Run a check to verify both flask and valid cv2 are present
                r = subprocess.run(
                    parts + ["-c", "import flask, cv2; assert hasattr(cv2, 'CascadeClassifier')"], 
                    capture_output=True, 
                    text=True, 
                    timeout=2
                )
                if r.returncode == 0:
                    return parts
        except Exception:
            pass
    # Fallback to current system python
    return [sys.executable]

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.join(script_dir, "backend")
    frontend_dir = os.path.join(script_dir, "frontend")
    
    print("\n=========================================================")
    print("     J.A.R.V.I.S. AUTOMATED COGNITIVE SYSTEM")
    print("=========================================================")
    
    processes = []
    
    if not os.path.exists(backend_dir) or not os.path.exists(frontend_dir):
        print("Error: Backend or Frontend directory not found.")
        sys.exit(1)
        
    python_cmd = find_valid_python()
    print(f"[+] Using Python interpreter: {' '.join(python_cmd)}")
        
    print("\n[+] Starting J.A.R.V.I.S Backend Server...")
    backend_proc = subprocess.Popen(
        python_cmd + ["server.py"],
        cwd=backend_dir
    )
    processes.append(("Backend Server", backend_proc))
    
    frontend_port = find_free_port(8080)
    print(f"[+] Starting J.A.R.V.I.S Frontend Web Server on port {frontend_port}...")
    frontend_proc = subprocess.Popen(
        python_cmd + ["-m", "http.server", "--bind", "127.0.0.1", str(frontend_port)],
        cwd=frontend_dir
    )
    processes.append(("Frontend HTTP Server", frontend_proc))
    
    time.sleep(2.5)
    print("[+] Opening J.A.R.V.I.S Dashboard in browser...")
    webbrowser.open(f"http://127.0.0.1:{frontend_port}")

    print("\n=========================================================")
    print(" J.A.R.V.I.S. AUTOMATION SERVICES ARE RUNNING")
    print(f"  * Web HUD Dashboard: http://127.0.0.1:{frontend_port}")
    print("  * Local Command API: http://127.0.0.1:5000")
    print("=========================================================")
    print("Press Ctrl+C in this terminal window to stop the servers.")
    
    try:
        while True:
            # We iterate on a copy of the list because we might remove items from it
            for item in list(processes):
                name, proc = item
                if proc.poll() is not None:
                    print(f"\n[!] Warning: {name} terminated unexpectedly with code {proc.returncode}.")
                    # Remove it from the monitored processes list to prevent warning loops
                    processes.remove(item)
            time.sleep(1)
    except KeyboardInterrupt:
        pass
    finally:
        print("\n[+] Stopping active servers...")
        for name, proc in processes:
            print(f"[-] Terminating {name}...")
            proc.terminate()
            try:
                proc.wait(timeout=3)
            except subprocess.TimeoutExpired:
                proc.kill()
        print("Systems shutdown complete. Goodbye, Sir.")

if __name__ == "__main__":
    main()
