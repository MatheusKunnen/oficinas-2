class ConfigurationManager:
    def __init__(self, api_manager):
        self.api_manager = api_manager
        self.map = {}

        self.update()

    def update(self):
        self.map = self.api_manager.get_parameters()

    def get(self, key):
        return self.map[key]
