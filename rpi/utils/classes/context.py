from dataclasses import dataclass

try:
    from utils.classes.display_manager import DisplayManager
except:
    from mocks.classes.display_manager import DisplayManager

from utils.classes.lock_manager import LockManager


@dataclass
class Context:
    lock_manager: LockManager
    display_manager: DisplayManager
