import time

try:
    import RPi.GPIO as gpio
    from utils.classes.display_manager import DisplayManager
    from utils.classes.camera_manager import CameraManager
    from utils.classes.vault_manager import VaultManager
except:
    import Mock.GPIO as gpio
    from mocks.classes.display_manager import DisplayManager
    from mocks.classes.camera_manager import CameraManager
    from mocks.classes.vault_manager import VaultManager

from utils.constants import SETUP_DELAY
from utils.classes.lock_manager import LockManager
from utils.classes.button_manager import ButtonManager
from utils.classes.context import Context
from utils.classes.state_machine import StateMachine

from utils.classes.states import starting_state, recognition_state, opening_state

lock_manager = LockManager()
display_manager = DisplayManager()
button_manager = ButtonManager()
camera_manager = CameraManager()
vault_manager = VaultManager()

state_machine = StateMachine(
    Context(
        lock_manager, display_manager, button_manager, camera_manager, vault_manager
    )
)
state_machine.add_state(starting_state)
state_machine.add_state(recognition_state)
state_machine.add_state(opening_state)


def setup():
    gpio.setmode(gpio.BCM)
    time.sleep(SETUP_DELAY)

    lock_manager.setup()
    button_manager.setup()
    vault_manager.setup()
    state_machine.goto("starting")


def loop():
    state_machine.run()
    pass


def main():
    setup()
    while True:
        loop()


if __name__ == "__main__":
    main()
