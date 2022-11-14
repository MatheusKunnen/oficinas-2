import time
import signal
import sys

try:
    import RPi.GPIO as gpio
    from utils.classes.display_manager import DisplayManager
    from utils.classes.camera_manager import CameraManager
    from utils.classes.vault_manager import VaultManager
    from utils.classes.configuration_manager import ConfigurationManager
except:
    import Mock.GPIO as gpio
    from mocks.classes.display_manager import DisplayManager
    from mocks.classes.camera_manager import CameraManager
    from mocks.classes.vault_manager import VaultManager
    from mocks.classes.configuration_manager import ConfigurationManager

from utils.classes.lock_manager import LockManager
from utils.classes.button_manager import ButtonManager
from utils.classes.context import Context
from utils.classes.state_machine import StateMachine

from utils.classes.states import (
    starting_state,
    recognition_state,
    opening_state,
    admin_state,
)

configuration_manager = ConfigurationManager()
lock_manager = LockManager(configuration_manager)
display_manager = DisplayManager()
button_manager = ButtonManager(configuration_manager)
camera_manager = CameraManager(configuration_manager)
vault_manager = VaultManager()

state_machine = StateMachine(
    Context(
        lock_manager,
        display_manager,
        button_manager,
        camera_manager,
        vault_manager,
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
    state_machine.goto("recognition")
    time.sleep(0.5)

    signal.signal(signal.SIGINT, sigint_handler)


def loop():
    state_machine.run()


def main():
    setup()
    while True:
        loop()


if __name__ == "__main__":
    main()
