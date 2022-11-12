from random import random
from time import sleep

import dlib

from utils.constants import DLIB_FACE_RECOGNIZER_MODEL_PATH
from utils.constants import DLIB_FACE_PREDICTOR_PATH
from utils.constants import WEBCAM_DEVICE_ID


class CameraManager:
    def __init__(
        self,
        dlib_face_predictor_path=DLIB_FACE_PREDICTOR_PATH,
        dlib_face_recognizer_path=DLIB_FACE_RECOGNIZER_MODEL_PATH,
        webcam_device_id=WEBCAM_DEVICE_ID,
    ):
        pass

    def detect_face(self):
        sleep(1)

        if random() >= 0.7:
            return dlib.vector([0.1 for _ in range(128)])
        else:
            return None
