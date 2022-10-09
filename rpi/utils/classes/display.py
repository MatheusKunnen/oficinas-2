from RPLCD.gpio import CharLCD

from utils.constants import DISPLAY_COLUMNS
from utils.constants import DISPLAY_ROWS
from utils.constants import DISPLAY_DOTSIZE
from utils.pin import PIN_NUMBERING_MODE
from utils.pin import Pin


class Display:
    def __init__(
        self,
        rs_pin=Pin.DISPLAY_RS,
        rw_pin=Pin.DISPLAY_RW,
        enable_pin=Pin.DISPLAY_ENABLE,
        data_pins=[
            Pin.DISPLAY_DATA_0,
            Pin.DISPLAY_DATA_1,
            Pin.DISPLAY_DATA_2,
            Pin.DISPLAY_DATA_3,
        ],
        numbering_mode=PIN_NUMBERING_MODE,
        cols=DISPLAY_COLUMNS,
        rows=DISPLAY_ROWS,
        dotsize=DISPLAY_DOTSIZE,
    ):
        self.rs_pin = rs_pin
        self.rw_pin = rw_pin
        self.enable_pin = enable_pin
        self.data_pins = data_pins
        self.numbering_mode = numbering_mode
        self.cols = cols
        self.rows = rows
        self.dotsize = dotsize

    def setup(self):
        self.lcd = CharLCD(
            pin_rs=self.rs_pin,
            pin_rw=self.rw_pin,
            pin_e=self.enable_pin,
            pins_data=self.data_pins,
            numbering_mode=self.numbering_mode,
            cols=self.cols,
            rows=self.rows,
            dotsize=self.dotsize,
        )

    def write(self, str):
        self.lcd.write_string(str)

    def clear(self):
        self.lcd.clear()
