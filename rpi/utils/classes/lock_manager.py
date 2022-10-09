import math
import time

try:
    import RPi.GPIO as gpio
except:
    import Mock.GPIO as gpio

from utils.constants import SETUP_DELAY
from utils.constants import LOCK_COUNT
from utils.constants import LOCK_UPTIME
from utils.pin import Pin


class LockManager:
    def __init__(
        self,
        selector_pins=[Pin.LOCK_SELECTOR_1, Pin.LOCK_SELECTOR_0],
        enable_pin=Pin.LOCK_ENABLE,
        lock_count=LOCK_COUNT,
        toggle_delay=LOCK_UPTIME,
    ):
        assert lock_count < 2 ** len(selector_pins)

        self.selector_pins = selector_pins
        self.enable_pin = enable_pin
        self.lock_count = lock_count
        self.toggle_delay = toggle_delay

    def setup(self):
        gpio.setup(self.enable_pin, gpio.OUT)
        time.sleep(SETUP_DELAY)
        gpio.output(self.enable_pin, gpio.LOW)
        time.sleep(SETUP_DELAY)

        for pin in self.selector_pins:
            gpio.setup(pin, gpio.OUT)
            time.sleep(SETUP_DELAY)
            gpio.output(pin, gpio.LOW)
            time.sleep(SETUP_DELAY)

    def toggle(lock_id):
        assert lock_id >= 0 and lock_id < self.lock_count

        pins = (
            gpio.HIGH if bit == "1" else gpio.LOW
            for bit in bin(lock_id)[2:].rjust(len(self.selector_pins), "0")
        )

        for (pin, value) in zip(self.selector_pins, pins):
            gpio.output(pin, value)
        gpio.output(self.enable_pin, gpio.HIGH)

        time.sleep(self.toggle_delay)

        gpio.output(self.enable_pin, gpio.LOW)
