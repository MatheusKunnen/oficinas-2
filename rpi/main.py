
import time

try:
    import RPi.GPIO as gpio
except:
    import Mock.GPIO as gpio

from utils.constants import SETUP_DELAY


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
