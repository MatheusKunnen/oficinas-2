import dlib
import cv2

from utils.constants import DLIB_FACE_RECOGNIZER_PATH
from utils.constants import DLIB_FACE_PREDICTOR_PATH
from utils.constants import WEBCAM_DEVICE_ID


class CameraManager:
    def __init__(
        self,
        dlib_face_predictor_path=DLIB_PREDICTOR_PATH,
        dlib_face_recognizer_path=DLIB_FACE_RECOGNIZER_PATH,
        webcam_device_id=WEBCAM_DEVICE_ID,
    ):
        self.dlib_predictor_path = dlib_predictor_path
        self.dlib_face_recognizer_path = dlib_face_recognizer_path
        self.webcam_device_id = webcam_device_id

        self.detector = dlib.get_frontal_face_detector()
        self.predictor = dlib.shape_predictor(self.dlib_predictor_path)
        self.facerec = dlib.face_recognizer_model_v1(self.dlib_face_recognizer_path)
        self.capture = cv2.VideoCapture(self.webcam_device_id)

    def detect_face(self):
        _, image = self.capture.read()
        gray = cv2.cvtColor(image, cv2, COLOR_BGR2GRAY)

        detections = self.detector(gray, 1)

        if len(detections) == 0:
            return None

        detection = max(detections, key=lambda det: det.area())
        shape = self.predictor(gray, detection)

        return self.facerec.compute_face_descriptor(gray, shape)
