
import time

try:
    import RPi.GPIO as gpio
except:
    import Mock.GPIO as gpio

from utils.constants import SETUP_DELAY


def setup():
    gpio.setmode(gpio.BCM)
    time.sleep(SETUP_DELAY)


def loop():
    pass


def main():
    setup()
    while True:
        loop()

main()
