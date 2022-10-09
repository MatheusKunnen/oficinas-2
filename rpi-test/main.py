import RPi.GPIO as gpio
import time


def setup():
    gpio.setmode(gpio.BCM)
    time.sleep(SETUP_DELAY)

    print("Setup")


def loop():
    print("Loop")


def main():
    setup()
    while True:
        loop()
