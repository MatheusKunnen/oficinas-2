from dataclasses import dataclass
from random import choice
import dlib
import numpy as np


@dataclass
class Vault:
    id_occupation: int
    id_descriptor: int
    descriptor: dlib.vector


class VaultManager:
    def __init__(self, api_manager, configuration_manager):
        self.api_manager = api_manager
        self.configuration_manager = configuration_manager
        self.vaults = [None for _ in range(
            configuration_manager.get("LOCK_COUNT"))]

    def setup(self):
        in_use = self.api_manager.get_in_use()

        for occupation in in_use:
            self.vaults[occupation["id_locker"]] = Vault(
                occupation["id"],
                occupation["main_descriptor"],
                occupation["descriptor"],
            )

    def is_full(self):
        return len([i for i in self.vaults if i is not None]) == len(self.vaults)

    def is_descriptor_similar(self, d1, d2):
        d = np.linalg.norm(np.asarray(d1) - np.asarray(d2))
        return d < self.configuration_manager.get("similarity_threshold")

    def get_vault(self, descriptor, image):
        for id_locker, vault in enumerate(self.vaults):
            if vault is not None and self.is_descriptor_similar(
                vault.descriptor, descriptor
            ):
                (
                    id_descriptor,
                    id_occupation,
                ) = self.api_manager.register_renewing_occupation(
                    descriptor, image, id_locker, vault.id_occupation
                )

                # vault.id_descriptor = id_descriptor
                # vault.id_occupation = id_occupation
                # vault.descriptor = descriptor

                return id_locker

        for id_locker, vault in enumerate(self.vaults):
            if vault is None:
                (
                    id_descriptor,
                    id_occupation,
                ) = self.api_manager.register_new_occupation(
                    descriptor, image, id_locker
                )
                # vault = dict({})
                # vault["id_descriptor"] = id_descriptor
                # vault["id_occupation"] = id_occupation
                # vault["descriptor"] = descriptor
                self.vaults[id_locker] = Vault(
                    id_occupation, id_descriptor, descriptor)
                return id_locker

        return None

    def free_vault(self, id_locker):
        self.vaults[id_locker] = None
        self.api_manager.free_locker(id_locker)
