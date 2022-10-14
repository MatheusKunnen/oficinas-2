from enum import IntEnum

try:
    import RPi.GPIO as gpio
except:
    import Mock.GPIO as gpio

PIN_NUMBERING_MODE = gpio.BCM


class Pin(IntEnum):
    LOCK_SELECTOR_0 = 17
    LOCK_SELECTOR_1 = 27
    LOCK_ENABLE = 23
