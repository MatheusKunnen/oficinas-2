from time import sleep
from utils.classes.state_machine import StateMachine

opening_state = StateMachine.State("opening")

is_full = False
keep_using = None
vault = None


def set_keep_using(value):
    global keep_using
    keep_using = value


@opening_state.main()
def opening(ctx, goto):
    global is_full
    global keep_using
    global vault

    if is_full:
        goto("starting")

    if keep_using is not None:
        if not keep_using:
            ctx.vault_manager.free_vault(vault)
        goto("starting")


@opening_state.before_enter()
def opening_before_enter(ctx):
    global vault
    global is_full

    ctx.button_manager.set_callback(0, lambda: set_keep_using(True))
    ctx.button_manager.set_callback(1, lambda: set_keep_using(False))

    vault = ctx.vault_manager.get_vault(ctx.face)

    if vault is None:
        ctx.display_manager.write("Armario cheio")
        sleep(3)
        is_full = True
    else:
        ctx.display_manager.write(f"Armario {vault} aberto")
        ctx.lock_manager.toggle(vault)

        ctx.display_manager.write("Continuar usando? (sim/nao)")


@opening_state.before_exit()
def opening_before_exit(ctx):
    global is_full
    global keep_using
    global vault

    ctx.button_manager.reset()

    is_full = False
    keep_using = None
    vault = None


@opening_state.on_timeout(10)
def opening_timeout(ctx, goto):
    global vault

    ctx.vault_manager.free_vault(vault)
    goto("starting")
