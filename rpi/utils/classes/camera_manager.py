import dlib
import cv2


class CameraManager:
    def __init__(self, configuration_manager):
        self.dlib_predictor_path = configuration_manager.get(
            "DLIB_FACE_PREDICTOR_PATH")
        self.dlib_face_recognizer_model_path = configuration_manager.get(
            "DLIB_FACE_RECOGNIZER_MODEL_PATH"
        )
        self.webcam_device_id = configuration_manager.get("WEBCAM_DEVICE_ID")

        self.detector = dlib.get_frontal_face_detector()
        self.predictor = dlib.shape_predictor(self.dlib_predictor_path)
        self.facerec = dlib.face_recognition_model_v1(
            self.dlib_face_recognizer_model_path
        )
        self.capture = cv2.VideoCapture(self.webcam_device_id)
        # self.capture.set(cv2.CAP_PROP_BUFFERSIZE, 1) # Nao compativel com a versao da rpi

    def detect_face(self):
        # Consome buffer da camera para obter frame novo
        for _ in range(5):
            self.capture.read()
        _, image = self.capture.read()
        # cv2.cvtColor(image, cv2.COLOR_BGR2GRAY) # Nao compativel
        gray = image

        detections = self.detector(gray, 1)

        if len(detections) == 0:
            return None, None

        detection = max(detections, key=lambda det: det.area())
        shape = self.predictor(gray, detection)

        return (image, self.facerec.compute_face_descriptor(gray, shape))
