import requests
import json
from base64 import b64encode, b64decode

import cv2
import dlib


class ApiManager:
    def __init__(self, host="localhost", port=5001):
        self.url = f"{host}:{port}"

    def get_parameters(self):
        entries = requests.get(f"{self.url}/parameter").json()

        config = {}
        for parameter in entries:
            config[parameter["key"]] = json.loads(parameter["value"])

        return config

    def get_in_use(self):
        entries = requests.get(f"{self.url}/locker_ocupation/in_use").json()

        for entry in entries:
            entry["descriptor"] = self.get_client_descriptor(entry["main_descriptor"])

        return entries

    def get_client_descriptor(self, id_descriptor):
        return dlib.vector(
            json.loads(
                b64decode(
                    requests.get(f"{self.url}/client_descriptor/{id_descriptor}").text()
                )
            )
        )

    def register_client_descriptor(self, descriptor, image):
        encoded_image = b64encode(cv2.imencode(".jpg", image)[1].tobytes())

        return requests.post(
            f"{self.url}/client_descriptor/",
            {
                "descriptor": b64encode(json.dumps(list(descriptor))),
                "image": f"data:image/jpeg;base64,{encoded_image}",
            },
        )

    def register_new_occupation(self, descriptor, image, id_locker):
        id_descriptor = self.register_client_descriptor(descriptor, image)
        id_occupation = requests.post(
            f"{self.url}/locker_ocupation",
            {
                "id_descriptor": id_descriptor,
                "id_locker": id_locker,
            },
        )

        return (id_descriptor, id_occupation)

    def register_renewing_occupation(self, descriptor, image, id_locker, id_occupation):
        id_descriptor = self.register_client_descriptor(descriptor, image)
        id_occupation = requests.post(
            f"{self.url}/locker_ocupation",
            {
                "id_descriptor": id_descriptor,
                "id_locker": id_locker,
                "id_ocupation": id_occupation,
            },
        )

        return (id_descriptor, id_occupation)

    def free_locker(self, id_occupation):
        requests.put(f"{self.url}/locker_ocupation/{id_occupation}/leave")
