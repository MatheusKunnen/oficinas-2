import time

try:
    import RPi.GPIO as gpio
except:
    import Mock.GPIO as gpio

from utils.constants import SETUP_DELAY
from utils.classes.lock_manager import LockManager

lock_manager = LockManager()


def setup():
    gpio.setmode(gpio.BCM)
    time.sleep(SETUP_DELAY)

    lock_manager.setup()
    button_manager.setup()


def loop():
    pass


def main():
    setup()
    while True:
        loop()


main()
