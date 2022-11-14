try:
    import RPi.GPIO as gpio
except:
    import Mock.GPIO as gpio


class ButtonManager:
    def __init__(self, configuration_manager, bouncetime=500):
        self.channels = [
            configuration_manager.get("BUTTON_0_PIN"),
            configuration_manager.get("BUTTON_1_PIN"),
        ]
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
