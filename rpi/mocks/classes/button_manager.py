import keyboard


class ButtonManager:
    def __init__(self, configuration_manager, bouncetime=500):
        self.keys = ["a", "d"]

    def setup(self):
        pass

    def set_callback(self, button_id, callback):
        assert button_id < len(self.keys)

        keyboard.on_press_key(self.keys[button_id], lambda _: callback())

    def reset(self):
        keyboard.unhook_all()
