from dataclasses import dataclass
from numpy import ndarray

import dlib

try:
    from utils.classes.display_manager import DisplayManager
    from utils.classes.camera_manager import CameraManager
    from utils.classes.api_manager import ApiManager
except:
    from mocks.classes.display_manager import DisplayManager
    from mocks.classes.camera_manager import CameraManager
    from mocks.classes.api_manager import ApiManager

from utils.classes.configuration_manager import ConfigurationManager
from utils.classes.lock_manager import LockManager
from utils.classes.vault_manager import VaultManager
from utils.classes.button_manager import ButtonManager


@dataclass
class Context:
    lock_manager: LockManager
    display_manager: DisplayManager
    button_manager: ButtonManager
    camera_manager: CameraManager
    vault_manager: VaultManager
    api_manager: ApiManager
    configuration_manager: ConfigurationManager
    face: dlib.vector = None
    image: ndarray = None
