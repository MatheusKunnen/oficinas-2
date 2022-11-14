class ConfigurationManager:
    def __init__(self):
        self.map = {}
        self.update()

    def update(self):
        self.map = {
            "ADMIN_MODE": False,
            "BUTTON_0_PIN": 18,
            "BUTTON_1_PIN": 22,
            "SIMILARITY_THRESHOLD": 0.1,
            "DLIB_FACE_PREDICTOR_PATH": "",
            "DLIB_FACE_RECOGNIZER_MODEL_PATH": "",
            "WEBCAM_DEVICE_ID": 0,
            "LOCK_SELECTOR_PINS": [17, 27],
            "LOCK_ENABLE_PIN": 23,
            "LOCK_COUNT": 4,
            "LOCK_TOGGLE_DELAY": 3,
        }

    def get(self, key):
        return self.map[key]
