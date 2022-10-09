from enum import IntEnum

try:
    import RPi.GPIO as gpio
except:
    import Mock.GPIO as gpio

PIN_NUMBERING_MODE = gpio.BCM

class Pin(IntEnum):
    PIN = 0
