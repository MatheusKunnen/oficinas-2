import time


class StateMachine:
    def __init__(self, ctx):
        self.ctx = ctx

        self.current_state = None
        self.current_timeout = None
        self.states = {}
        self.before_enters = {}
        self.before_exits = {}
        self.timeouts = {}

    def goto(self, state_name):
        before_exit = self.before_exits.get(self.current_state, None)

        if not before_exit is None:
            before_exit(self.ctx)

        self.current_state = state_name

        timeout = self.timeouts.get(state_name, None)
        self.current_timeout = (
            float("inf") if timeout is None else time.time() + timeout.time
        )

        before_enter = self.before_enters.get(self.current_state, None)

        if not before_enter is None:
            before_enter(self.ctx)

    def run(self):
        state = self.current_state
        goto = lambda state: self.goto(state)

        self.states[self.current_state](self.ctx, goto)

        if time.time() >= self.current_timeout and self.current_state == state:
            self.timeouts[self.current_state](self.ctx, goto)

    def state(self, name):
        def state_decorator(func):
            self.states[name] = func
            return func

        return state_decorator

    def before_enter(self, state_name):
        def before_enter_decorator(func):
            self.before_enters[state_name] = func
            return func

        return before_enter_decorator

    def before_exit(self, state_name):
        def before_exit_decorator(func):
            self.before_exits[state_name] = func
            return func

        return before_exit_decorator

    def on_timeout(self, state_name, time):
        def timeout_decorator(func):
            self.timeouts[state_name] = func
            self.timeouts[state_name].time = time
            return func

        return timeout_decorator
