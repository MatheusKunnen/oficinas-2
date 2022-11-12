import math
import time

try:
    import RPi.GPIO as gpio
except:
    import Mock.GPIO as gpio


class LockManager:
    def __init__(self, configuration_manager):
        self.selector_pins = configuration_manager.get("LOCK_SELECTOR_PINS")
        self.enable_pin = configuration_manager.get("LOCK_ENABLE_PIN")
        self.lock_count = configuration_manager.get("LOCK_COUNT")
        self.toggle_delay = configuration_manager.get("LOCK_TOGGLE_DELAY")

        assert self.lock_count <= 2 ** len(self.selector_pins)

    def setup(self):
        gpio.setup(self.enable_pin, gpio.OUT)
        time.sleep(0.5)
        gpio.output(self.enable_pin, gpio.LOW)

        for pin in self.selector_pins:
            gpio.setup(pin, gpio.OUT)
            time.sleep(0.5)
            gpio.output(pin, gpio.LOW)

    def toggle(self, lock_id):
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
        time.sleep(0.5)
