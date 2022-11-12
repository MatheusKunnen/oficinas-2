try:
    import RPi.GPIO as gpio
except:
    import Mock.GPIO as gpio

from utils.pin import Pin


class ButtonManager:
    def __init__(self, channels=[Pin.BUTTON_0, Pin.BUTTON_1], bouncetime=500):
        self.channels = channels
        self.bouncetime = bouncetime

    def setup(self):
        for channel in self.channels:
            gpio.setup(channel, gpio.IN, pull_up_down=gpio.PUD_UP)

    def set_callback(self, button_id, callback):
        assert button_id < len(self.channels)

        gpio.add_event_detect(
            self.channels[button_id], gpio.FALLING, callback, self.bouncetime
        )

    def reset(self):
        for channel in self.channels:
            gpio.remove_event_detect(channel)
