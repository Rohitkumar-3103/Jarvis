import psutil
import platform

def get_hardware_diagnostics() -> dict:
    """Gathers current system resource statistics."""
    try:
        cpu_usage = psutil.cpu_percent(interval=0.1)
        ram = psutil.virtual_memory()
        disk = psutil.disk_usage('/')
        
        net_io = psutil.net_io_counters()
        sent = round(net_io.bytes_sent / (1024 * 1024), 2)
        recv = round(net_io.bytes_recv / (1024 * 1024), 2)
        
        battery = psutil.sensors_battery()
        battery_percent = battery.percent if battery else 100
        is_charging = battery.power_plugged if battery else True
        
        return {
            "status": "success",
            "os": platform.system(),
            "cpu": f"{cpu_usage}%",
            "ram": f"{ram.percent}%",
            "disk": f"{disk.percent}%",
            "network": f"↑ {sent}MB / ↓ {recv}MB",
            "battery": f"{battery_percent}%",
            "charging": is_charging
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}
        
def get_active_process_list(limit: int = 10) -> list[dict]:
    """Lists top active processes by CPU usage."""
    processes = []
    for proc in psutil.process_iter(['pid', 'name', 'cpu_percent', 'memory_percent']):
        try:
            info = proc.info
            processes.append({
                "pid": info['pid'],
                "name": info['name'],
                "cpu": f"{info['cpu_percent']}%",
                "memory": f"{round(info['memory_percent'] or 0, 1)}%"
            })
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            pass
    # Sort processes by memory usage
    processes.sort(key=lambda x: float(x["memory"].replace('%', '')), reverse=True)
    return processes[:limit]
