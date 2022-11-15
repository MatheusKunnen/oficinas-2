import requests
import json
from base64 import b64encode, b64decode

import cv2
import dlib


class ApiManager:
    def __init__(self, host="localhost", port=5001, base="/api"):
        self.url = f"http://{host}:{port}{base}"

    def get_parameters(self):
        entries = requests.get(f"{self.url}/parameter/locker").json()
        config = entries
        config["admin_mode"] = json.loads(config["admin_mode"])
        config["button_0_pin"] = json.loads(config["button_0_pin"])
        config["button_1_pin"] = json.loads(config["button_1_pin"])
        config["lock_count"] = json.loads(config["lock_count"])
        config["lock_enable_pin"] = json.loads(config["lock_enable_pin"])
        config["lock_selector_pins"] = json.loads(config["lock_selector_pins"])
        config["lock_toggle_delay"] = json.loads(config["lock_toggle_delay"])
        config["similarity_threshold"] = json.loads(
            config["similarity_threshold"])
        config["webcam_device_id"] = json.loads(config["webcam_device_id"])

        return config

    def get_in_use(self):
        entries = requests.get(f"{self.url}/locker_ocupation/in_use").json()

        if entries["data"] is None:
            return []
        for entry in entries["data"]:
            entry["descriptor"] = self.get_client_descriptor(
                entry["main_descriptor"])

        return entries["data"]

    def get_client_descriptor(self, id_descriptor):
        res = requests.get(
            f"{self.url}/client_descriptor/{id_descriptor}").json()
        return dlib.vector(json.loads(b64decode(res.get("data")["descriptor"])))

    def register_client_descriptor(self, descriptor, image):
        encoded_image = b64encode(cv2.imencode(".jpg", image)[1].tobytes())

        return requests.post(
            f"{self.url}/client_descriptor/",
            json={
                # b64encode(json.dumps(list(descriptor))),
                "descriptor": b64encode(json.dumps(list(descriptor)).encode('utf-8')),
                "image": f"data:image/jpeg;base64,{encoded_image.decode('utf-8')}",
            },
        ).json()["data"]

    def register_new_occupation(self, descriptor, image, id_locker):
        descriptor = self.register_client_descriptor(descriptor, image)
        id_occupation = requests.post(
            f"{self.url}/locker_ocupation", json={
                "id_descriptor": descriptor["id"],
                "id_locker": id_locker,
            },
        )

        return (descriptor["id"], id_occupation)

    def register_renewing_occupation(self, descriptor, image, id_locker, id_occupation):
        id_descriptor = self.register_client_descriptor(descriptor, image)
        occupation = requests.post(
            f"{self.url}/locker_ocupation",
            {
                "id_descriptor": id_descriptor["id"],
                "id_locker": id_locker,
                "id_ocupation": id_occupation,
            },
        )

        return (id_descriptor, id_occupation)

    def free_locker(self, id_occupation):
        requests.put(f"{self.url}/locker_ocupation/{id_occupation}/leave")
