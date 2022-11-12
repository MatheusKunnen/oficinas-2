from rpi_lcd import LCD


class DisplayManager:
    def __init__(self):
        self.lcd = LCD()

    def write(self, str):
        self.lcd.text(str[:12], 1)
        self.lcd.text(str[12:], 2)
