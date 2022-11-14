from rpi_lcd import LCD
import RPi.GPIO as GPIO
import time
import signal
import sys

# A0 17
# A1 27
# A2 22
# G1 23
addr_pin = [27, 17]
en_pin = 23
TIME_ON = 2.5  # seconds
SETUP_DELAY = 0.05

BUTTON_GPIO = 18
BUTTON2_GPIO = 22


class MOD:
    MODULE = 1
    LCD = None


# MOD.LCD = LCD()

# MOD.LCD.text("Iniciando", 1)


def signal_handler(sig, frame):
    GPIO.cleanup()
    sys.exit(0)


def button_pressed_callback(channel):
    GPIO.output(en_pin, GPIO.LOW)
    module = MOD.MODULE
    if module == 4:
        module = 1
    else:
        module = module + 1
    MOD.MODULE = module
    if module == 1:
        config = [GPIO.LOW, GPIO.LOW]
    elif module == 2:
        config = [GPIO.LOW, GPIO.HIGH]
    elif module == 3:
        config = [GPIO.HIGH, GPIO.LOW]
    elif module == 4:
        config = [GPIO.HIGH, GPIO.HIGH]
    for i, state in enumerate(config):
        GPIO.output(addr_pin[i], state)
    # MOD.LCD.text(f"GAVETA {module}", 1)


def button_pressed_callback2(channel):
    GPIO.output(en_pin, GPIO.HIGH)
    # MOD.LCD.text("ON", 2)
    time.sleep(TIME_ON)
    GPIO.output(en_pin, GPIO.LOW)
    # MOD.LCD.text("OFF", 2)


def init_pinout():
    print("Init pins-STARTED")
    GPIO.setmode(GPIO.BCM)
    time.sleep(SETUP_DELAY)
    GPIO.setup(en_pin, GPIO.OUT)
    time.sleep(SETUP_DELAY)
    GPIO.output(en_pin, GPIO.LOW)
    time.sleep(SETUP_DELAY)
    for pin in addr_pin:
        GPIO.setup(pin, GPIO.OUT)
        time.sleep(SETUP_DELAY)
        GPIO.output(pin, GPIO.LOW)
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(BUTTON_GPIO, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    GPIO.setup(BUTTON2_GPIO, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    GPIO.add_event_detect(BUTTON_GPIO, GPIO.FALLING,
                          callback=button_pressed_callback, bouncetime=500)
    GPIO.add_event_detect(BUTTON2_GPIO, GPIO.FALLING,
                          callback=button_pressed_callback2, bouncetime=500)
    print("Init pins-FINISHED")
    # MOD.LCD.text(f"GAVETA {MOD.MODULE}", 1)
    # MOD.LCD.text(f"OFF", 2)
    signal.signal(signal.SIGINT, signal_handler)
    signal.pause()


if __name__ == '__main__':
    init_pinout()
