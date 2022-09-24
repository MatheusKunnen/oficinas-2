import RPi.GPIO as gpio
import time
# A0 17
# A1 27
# A2 22
# G1 23
addr_pin = [27, 17]
en_pin = 23
TIME_ON = 1  # seconds
SETUP_DELAY = 0.5


def init_pinout():
    print("Init pins-STARTED")
    gpio.setmode(gpio.BCM)
    time.sleep(SETUP_DELAY)
    gpio.setup(en_pin, gpio.OUT)
    time.sleep(SETUP_DELAY)
    gpio.output(en_pin, gpio.LOW)
    time.sleep(SETUP_DELAY)
    for pin in addr_pin:
        gpio.setup(pin, gpio.OUT)
        time.sleep(SETUP_DELAY)
        gpio.output(pin, gpio.LOW)

    print("Init pins-FINISHED")


def main():
    init_pinout()
    number = 0
    while True:
        gpio.output(en_pin, gpio.LOW)
        time.sleep(SETUP_DELAY)
        config = [gpio.LOW, gpio.LOW]
        enable = False
        if number > 4:
            number = 0
        if number == 0:
            enable = True
        elif number == 1:
            config = [gpio.LOW, gpio.HIGH]
            enable = True
        elif number == 2:
            config = [gpio.HIGH, gpio.LOW]
            enable = True
        elif number == 3:
            config = [gpio.HIGH, gpio.HIGH]
            enable = True
        print(number, enable, config)
        if enable:
            for i, state in enumerate(config):
                print(addr_pin[i], state)
                gpio.output(addr_pin[i], state)
            gpio.output(en_pin, gpio.HIGH)
        else:
            gpio.output(en_pin, gpio.LOW)
        time.sleep(TIME_ON)
        number += 1


main()
