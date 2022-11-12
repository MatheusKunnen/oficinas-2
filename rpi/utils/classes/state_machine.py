import time


class StateMachine:
    class State:
        def __init__(self, name):
            self.name = name

            self._main = None
            self._before_enter = None
            self._before_exit = None
            self._timeout = None

        def main(self):
            def main_decorator(func):
                self._main = func
                return func

            return main_decorator

        def before_enter(self):
            def before_enter_decorator(func):
                self._before_enter = func
                return func

            return before_enter_decorator

        def before_exit(self):
            def before_exit_decorator(func):
                self._before_exit = func
                return func

            return before_exit_decorator

        def on_timeout(self, time):
            def timeout_decorator(func):
                self._timeout = func
                self._timeout.time = time
                return func

            return timeout_decorator

    def __init__(self, ctx):
        self.ctx = ctx

        self.current_state = StateMachine.State(None)
        self.states = {}

    def goto(self, state_name):
        before_exit = self.current_state._before_exit

        if not before_exit is None:
            before_exit(self.ctx)

        self.current_state = self.states[state_name]

        timeout = self.current_state._timeout
        self.current_timeout = (
            float("inf") if timeout is None else time.time() + timeout.time
        )

        before_enter = self.current_state._before_enter

        if not before_enter is None:
            before_enter(self.ctx)

    def add_state(self, state):
        self.states[state.name] = state

    def run(self):
        state = self.current_state
        goto = lambda state_name: self.goto(state_name)

        self.current_state._main(self.ctx, goto)

        if time.time() >= self.current_timeout and self.current_state == state:
            self.current_state._timeout(self.ctx, goto)
