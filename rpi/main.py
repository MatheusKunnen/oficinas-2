import RPi.GPIO as gpio
import time

from utils.classes.lock_manager import LockManager

lock_manager = LockManager()


def setup():
    gpio.setmode(gpio.BCM)
    time.sleep(SETUP_DELAY)

    lock_manager.setup()

    print("Setup")


def loop():
    print("Loop")


def main():
    setup()
    while True:
        loop()
