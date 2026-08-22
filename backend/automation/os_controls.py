# ==========================================================================
# J.A.R.V.I.S. 3.0 - System controls and ADB Automation
# ==========================================================================
import os
import platform
import subprocess
import time
import psutil
from actions.music import play_music, play_random_track, control_playback

def get_cpu_temp() -> float:
    try:
        temps = psutil.sensors_temperatures()
        for name in ["coretemp", "k10temp", "cpu_thermal", "acpitz", "cpu-thermal", "zenpower", "it8688"]:
            if name in temps and temps[name]:
                return temps[name][0].current
        for entries in temps.values():
            if entries:
                return entries[0].current
    except Exception:
        pass

    if platform.system() == "Windows":
        try:
            r = subprocess.run(
                ["powershell", "-Command",
                 "(Get-WmiObject MSAcpi_ThermalZoneTemperature -Namespace root/wmi).CurrentTemperature"],
                capture_output=True, text=True, timeout=3,
            )
            if r.returncode == 0 and r.stdout.strip():
                raw = float(r.stdout.strip().split("\n")[0])
                return (raw / 10.0) - 273.15
        except Exception:
            pass

    return -1.0

def volume_up():
    if platform.system() == "Windows":
        try:
            import ctypes
            for _ in range(5):
                ctypes.windll.user32.keybd_event(175, 0, 0, 0)
            return True
        except Exception:
            pass
    return False

def volume_down():
    if platform.system() == "Windows":
        try:
            import ctypes
            for _ in range(5):
                ctypes.windll.user32.keybd_event(174, 0, 0, 0)
            return True
        except Exception:
            pass
    return False

def execute_os_action(command: str) -> dict:
    cmd = command.lower()
    
    if "calculator" in cmd:
        if os.name == 'nt':
            try:
                import webbrowser
                calc_path = os.path.abspath("D:\\code\\html\\Project\\Calculator\\calculator.html")
                webbrowser.open(calc_path)
                return {"status": "success", "message": "Launching Custom Calculator."}
            except Exception as e:
                return {"status": "error", "message": f"Failed to launch calculator: {str(e)}"}
        else:
            os.system("gnome-calculator &")
            return {"status": "success", "message": "Launching System Calculator."}

    elif "lock" in cmd and "phone" not in cmd:
        if os.name == 'nt':
            os.system("rundll32.exe user32.dll,LockWorkStation")
            return {"status": "success", "message": "Locking workstation."}
        return {"status": "unsupported", "message": "Lock action supported only on Windows."}

    elif "whatsapp" in cmd and "phone" not in cmd:
        if os.name == 'nt':
            os.system("start https://web.whatsapp.com")
        return {"status": "success", "message": "Launching WhatsApp workspace."}

    elif "github" in cmd:
        if os.name == 'nt':
            os.system("start https://github.com")
        return {"status": "success", "message": "Launching GitHub workstation."}

    elif "file" in cmd and "search" not in cmd:
        if os.name == 'nt':
            os.system("explorer.exe D:\\")
        return {"status": "success", "message": "Launching File Explorer targeting D:\\ drive."}

    elif "code" in cmd:
        if os.name == 'nt':
            os.system("code .")
        return {"status": "success", "message": "Launching VS Code workspace."}

    elif "play music" in cmd or cmd.startswith("play ") or "play song" in cmd:
        import actions.music
        import importlib
        importlib.reload(actions.music)
        res = actions.music.play_music(cmd)
        return res

    elif "stop music" in cmd or "pause music" in cmd:
        success = control_playback("play_pause")
        return {"status": "success" if success else "error", "message": "Triggered media play/pause state toggle."}

    elif "next track" in cmd or "next music" in cmd:
        success = control_playback("next")
        return {"status": "success" if success else "error", "message": "Triggered next media track track."}

    elif "music" in cmd:
        if os.name == 'nt':
            os.system('explorer.exe "C:\\Users\\seaem\\Music\\New folder\\video"')
        return {"status": "success", "message": "Opening local music/video folder: C:\\Users\\seaem\\Music\\New folder\\video"}

    elif "email" in cmd:
        if os.name == 'nt':
            os.system("start mailto:")
        return {"status": "success", "message": "Opening mail client."}

    elif "notepad" in cmd:
        if os.name == 'nt':
            os.system("start notepad")
        return {"status": "success", "message": "Launching Notepad text editor."}

    elif "camera" in cmd or "snap" in cmd or "photo" in cmd:
        import threading
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        assets_dir = os.path.join(base_dir, "frontend", "assets", "images")
        save_path = os.path.join(assets_dir, "camera.png")
        
        result_dict = {"success": False, "error": "Camera capture timed out (webcam may be locked by another application)."}
        
        def capture_thread():
            try:
                import cv2
                cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)
                if not cap.isOpened():
                    cap = cv2.VideoCapture(0)
                if not cap.isOpened():
                    result_dict["error"] = "Failed to access webcam camera hardware."
                    return
                for _ in range(3):
                    cap.read()
                ret, frame = cap.read()
                cap.release()
                if ret and frame is not None:
                    cv2.imwrite(save_path, frame)
                    result_dict["success"] = True
                else:
                    result_dict["error"] = "Webcam returned no image frame data."
            except Exception as e:
                result_dict["error"] = f"Camera capture failed: {str(e)}"
                
        t = threading.Thread(target=capture_thread)
        t.daemon = True
        t.start()
        t.join(timeout=3.0)  
        
        if result_dict["success"]:
            return {"status": "success", "message": "Camera snapshot captured successfully."}
        else:
            return {"status": "error", "message": result_dict["error"]}

    elif "screenshot" in cmd:
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        assets_dir = os.path.join(base_dir, "frontend", "assets", "images")
        save_path = os.path.join(assets_dir, "screenshot.png")
        try:
            from PIL import ImageGrab
            img = ImageGrab.grab()
            img.save(save_path)
            return {"status": "success", "message": f"Screenshot saved successfully."}
        except Exception:
            ps_code = f"""
Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Windows.Forms
$screen = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
$bmp = New-Object System.Drawing.Bitmap $screen.Width, $screen.Height
$graphics = [System.Drawing.Graphics]::FromImage($bmp)
$graphics.CopyFromScreen($screen.X, $screen.Y, 0, 0, $bmp.Size)
$bmp.Save('{save_path}')
$graphics.Dispose()
$bmp.Dispose()
"""
            ps_file = os.path.join(assets_dir, "grab.ps1")
            try:
                with open(ps_file, "w", encoding="utf-8") as f:
                    f.write(ps_code)
                subprocess.run(["powershell", "-ExecutionPolicy", "Bypass", "-File", ps_file], capture_output=True, timeout=8)
                if os.path.exists(save_path):
                    return {"status": "success", "message": "Screenshot captured via .NET graphics."}
                else:
                    return {"status": "error", "message": "Screenshot script executed but file was not created."}
            except Exception as e:
                return {"status": "error", "message": f"Screenshot capture failed: {str(e)}"}
            finally:
                if os.path.exists(ps_file):
                    try: os.remove(ps_file)
                    except: pass

    elif "shutdown" in cmd:
        if os.name == 'nt':
            os.system("shutdown /s /t 60")
        return {"status": "success", "message": "System shutdown sequence initiated."}

    elif "restart" in cmd:
        if os.name == 'nt':
            os.system("shutdown /r /t 60")
        return {"status": "success", "message": "System restart sequence initiated."}

    elif "abort shutdown" in cmd or "cancel shutdown" in cmd:
        if os.name == 'nt':
            os.system("shutdown /a")
        return {"status": "success", "message": "Power cycle sequence aborted."}

    elif "volume up" in cmd:
        success = volume_up()
        return {"status": "success" if success else "unsupported", "message": "Volume increased."}

    elif "volume down" in cmd:
        success = volume_down()
        return {"status": "success" if success else "unsupported", "message": "Volume decreased."}

    elif "adb" in cmd or "phone" in cmd:
        if os.name == 'nt':
            if "connect" in cmd:
                parts = cmd.split("connect")
                ip = parts[1].strip() if len(parts) > 1 else "192.168.1.100:5555"
                os.system(f"adb connect {ip}")
                return {"status": "success", "message": f"Attempting connection to {ip}."}
            
            elif "whatsapp" in cmd:
                parts = command.split("whatsapp")
                if len(parts) > 1 and parts[1].strip():
                    contact_parts = parts[1].strip().split(" ", 1)
                    contact = contact_parts[0]
                    body = contact_parts[1] if len(contact_parts) > 1 else "Hello"
                    
                    os.system("adb shell monkey -p com.whatsapp -c android.intent.category.LAUNCHER 1")
                    time.sleep(1.5)
                    os.system(f'adb shell am start -a android.intent.action.VIEW -d "https://api.whatsapp.com/send?phone={contact}"')
                    time.sleep(1.5)
                    os.system("adb shell input tap 900 1800")
                    time.sleep(0.5)
                    os.system(f'adb shell input text "{body}"')
                    time.sleep(0.5)
                    os.system("adb shell input keyevent 22")
                    time.sleep(0.5)
                    os.system("adb shell input keyevent 66")
                    return {"status": "success", "message": f"Message sent to {contact}."}
                else:
                    os.system("adb shell monkey -p com.whatsapp -c android.intent.category.LAUNCHER 1")
                    return {"status": "success", "message": "Launching WhatsApp on mobile."}

            elif "instagram" in cmd:
                os.system("adb shell monkey -p com.instagram.android -c android.intent.category.LAUNCHER 1")
                return {"status": "success", "message": "Launching Instagram on mobile."}

            elif "lock" in cmd or "power" in cmd or "sleep" in cmd:
                os.system("adb shell input keyevent 26")
                return {"status": "success", "message": "Toggling power lock."}

            elif "home" in cmd:
                os.system("adb shell input keyevent 3")
                return {"status": "success", "message": "Sending Home event."}

            elif "back" in cmd:
                os.system("adb shell input keyevent 4")
                return {"status": "success", "message": "Sending Back event."}

            elif "swipe up" in cmd:
                os.system("adb shell input swipe 500 1500 500 500 500")
                return {"status": "success", "message": "Sending Swipe Up."}

            elif "swipe down" in cmd:
                os.system("adb shell input swipe 500 500 500 1500 500")
                return {"status": "success", "message": "Sending Swipe Down."}
            
        return {"status": "success", "message": "ADB triggered."}

    return {"status": "unsupported", "message": "Command unrecognized."}
