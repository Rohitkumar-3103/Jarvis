"""
J.A.R.V.I.S. Backend Automation Package
Native OS execution, volume & media automation, telemetry, and system controls.
"""

from .os_controls import (
    execute_os_action,
    get_cpu_temp,
    volume_up,
    volume_down,
)

__all__ = [
    "execute_os_action",
    "get_cpu_temp",
    "volume_up",
    "volume_down",
]
