import time
import signal
import sys

try:
    import RPi.GPIO as gpio
    from utils.classes.button_manager import ButtonManager
    from utils.classes.display_manager import DisplayManager
    from utils.classes.camera_manager import CameraManager
    from utils.classes.api_manager import ApiManager
except:
    import Mock.GPIO as gpio
    from mocks.classes.button_manager import ButtonManager
    from mocks.classes.display_manager import DisplayManager
    from mocks.classes.camera_manager import CameraManager
    from mocks.classes.api_manager import ApiManager

from utils.classes.configuration_manager import ConfigurationManager
from utils.classes.lock_manager import LockManager
from utils.classes.vault_manager import VaultManager
from utils.classes.context import Context
from utils.classes.state_machine import StateMachine

from utils.classes.states import (
    starting_state,
    recognition_state,
    opening_state,
    admin_state,
)

api_manager = ApiManager()
configuration_manager = ConfigurationManager(api_manager)
lock_manager = LockManager(configuration_manager)
display_manager = DisplayManager()
button_manager = ButtonManager(configuration_manager)
camera_manager = CameraManager(configuration_manager)
vault_manager = VaultManager(api_manager, configuration_manager)

state_machine = StateMachine(
    Context(
        lock_manager,
        display_manager,
        button_manager,
        camera_manager,
        vault_manager,
        api_manager,
        configuration_manager,
    )
)
state_machine.add_state(starting_state)
state_machine.add_state(recognition_state)
state_machine.add_state(opening_state)
state_machine.add_state(admin_state)


def sigint_handler(sig, frame):
    gpio.cleanup()
    sys.exit(0)


def setup():
    gpio.setmode(gpio.BCM)

    lock_manager.setup()
    button_manager.setup()
    vault_manager.setup()
    state_machine.goto("starting")
    time.sleep(0.5)

    signal.signal(signal.SIGINT, sigint_handler)


def loop():
    state_machine.run()
    time.sleep(0.01)

def main():
    setup()
    while True:
        loop()


if __name__ == "__main__":
    main()
