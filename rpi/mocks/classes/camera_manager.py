from random import random
from time import sleep

import dlib


class CameraManager:
    def __init__(self, configuration_manager):
        pass

    def detect_face(self):
        sleep(1)

        if random() >= 0.7:
            return dlib.vector([0.1 for _ in range(128)])
        else:
            return None
