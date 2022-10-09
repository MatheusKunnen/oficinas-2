import math
import time

import RPi.GPIO as gpio

from constants import SETUP_DELAY
from constants import LOCK_COUNT
from constants import LOCK_SELECTORS
from constants import LOCK_UPTIME
from pin import Pin


class LockManager:
    def __init__(
        self,
        selector_pins=LOCK_SELECTORS,
        enable_pin=Pin.LOCK_ENABLE,
        lock_count=LOCK_COUNT,
        toggle_delay=LOCK_UPTIME,
    ):
        assert lock_count < 2 ** len(selector_pins)

        self.selector_pins = selector_pins
        self.enable_pin = enable_pin
        self.lock_count = lock_count
        self.toggle_delay = toggle_delay

        self.lock_array = [gpio.LOW for _ in selector_pins]

    def setup(self):
        gpio.setup(self.enable_pin, gpio.OUT)
        time.sleep(SETUP_DELAY)
        gpio.output(self.enable_pin, gpio.HIGH)
        time.sleep(SETUP_DELAY)

        for pin in self.selector_pins:
            gpio.setup(pin, gpio.OUT)
            time.sleep(SETUP_DELAY)
            gpio.output(pin, gpio.LOW)
            time.sleep(SETUP_DELAY)

    def toggle(lock_id):
        assert lock_id >= 0 and lock_id < self.lock_count
        gpio.output(pin, gpio.HIGH)
        time.sleep(self.toggle_delay)
        gpio.output(pin, gpio.LOW)
