from utils.classes.state_machine import StateMachine

starting_state = StateMachine.State("starting")

should_continue = False


def set_should_continue():
    global should_continue
    should_continue = True


@starting_state.main()
def starting(ctx, goto):
    global should_continue

    if ctx.configuration_manager.get("ADMIN_MODE"):
        goto("admin")

    if should_continue == True:
        goto("recognition")


@starting_state.before_enter()
def starting_before_enter(ctx):
    ctx.display_manager.write("Aperte um botão para continuar")

    ctx.button_manager.set_callback(0, set_should_continue)
    ctx.button_manager.set_callback(1, set_should_continue)


@starting_state.before_exit()
def starting_before_exit(ctx):
    global should_continue

    ctx.button_manager.reset()
    should_continue = False
