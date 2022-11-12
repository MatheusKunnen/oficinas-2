from random import choice
import dlib


class VaultManager:
    def __init__(self):
        self.vaults = [None]

    def setup(self):
        scenario = choice(["same face", "different face", "empty"])

        if scenario == "same face":
            print("[VAULT] Mock initializing with vault with the same face")
            self.vaults[0] = dlib.vector([0.1 for _ in range(128)])
        if scenario == "different face":
            print("[VAULT] Mock initializing with vault with different face")
            self.vaults[0] = dlib.vector([0.2 for _ in range(128)])
        if scenario == "empty":
            print("[VAULT] Mock initializing with empty vault")

    def is_full(self):
        return len([i for i in self.vaults if i is not None]) == len(self.vaults)

    def get_vault(self, descriptor):
        for vault, face in enumerate(self.vaults):
            if face is not None:
                same_face = True

                for i in range(128):
                    if face[i] != descriptor[i]:
                        same_face = False
                        break

                if same_face:
                    return vault

        for vault, face in enumerate(self.vaults):
            if face is None:
                self.vaults[vault] = descriptor
                return vault

        return None

    def free_vault(self, vault_id):
        self.vaults[vault_id] = None
