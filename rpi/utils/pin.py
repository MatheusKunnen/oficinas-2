from enum import IntEnum

try:
    import RPi.GPIO as gpio
except:
    import Mock.GPIO as gpio

PIN_NUMBERING_MODE = gpio.BCM


class Pin(IntEnum):
    DISPLAY_RS = -1
    DISPLAY_Rw = -1
    DISPLAY_ENABLE = -1
    DISPLAY_DATA_3 = -1
    DISPLAY_DATA_2 = -1
    DISPLAY_DATA_1 = -1
    DISPLAY_DATA_0 = -1
