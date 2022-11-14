from random import choice
import dlib


class ApiManager:
    def __init__(self, host=None, port=None):
        pass

    def get_parameters(self):
        return {
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

    def get_in_use(self):
        scenario = choice(["same face", "different face", "empty"])

        if scenario == "same face":
            print("[VAULT] Mock initializing with vault with the same face")
            return [
                {
                    "id": 0,
                    "id_locker": 0,
                    "main_descriptor": 0,
                    "descriptor": dlib.vector([0.1 for _ in range(128)]),
                }
            ]
        elif scenario == "different face":
            print("[VAULT] Mock initializing with vault with different face")
            return [
                {
                    "id": 0,
                    "id_locker": 0,
                    "main_descriptor": 0,
                    "descriptor": dlib.vector([0.2 for _ in range(128)]),
                }
            ]
        else:
            print("[VAULT] Mock initializing with empty vaults")
            return []

    def get_client_descriptor(self, id_descriptor):
        return dlib.vector([id_descriptor for _ in range(128)])

    def register_client_descriptor(self, descriptor, image):
        print("[API] Registering client descriptor")
        return 0

    def register_new_occupation(self, descriptor, image, id_locker):
        print("[API] Registering new occupation")
        return (0, 0)

    def register_renewing_occupation(self, descriptor, image, id_locker, id_occupation):
        print("[API] Renewing occupation")
        return (0, 0)

    def free_locker(self, id_occupation):
        print("[API] Freeing locker")
