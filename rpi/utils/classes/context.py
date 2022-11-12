from dataclasses import dataclass

import dlib

try:
    from utils.classes.display_manager import DisplayManager
    from utils.classes.camera_manager import CameraManager
    from utils.classes.vault_manager import VaultManager
except:
    from mocks.classes.display_manager import DisplayManager
    from mocks.classes.camera_manager import CameraManager
    from mocks.classes.vault_manager import VaultManager

from utils.classes.lock_manager import LockManager
from utils.classes.button_manager import ButtonManager


@dataclass
class Context:
    lock_manager: LockManager
    display_manager: DisplayManager
    button_manager: ButtonManager
    camera_manager: CameraManager
    vault_manager: VaultManager
    face: dlib.vector = None