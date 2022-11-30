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

    ctx.button_manager.set_callback(0, lambda c: set_keep_using(False))
    ctx.button_manager.set_callback(1, lambda c: set_keep_using(True))

    vault = ctx.vault_manager.get_vault(ctx.face, ctx.image)

    if vault is None:
        ctx.display_manager.write("Armario cheio")
        sleep(3)
        is_full = True
    else:
        global keep_using
        ctx.display_manager.write(f"Armario {vault + 1} aberto")
        ctx.lock_manager.toggle(vault)
        keep_using = True
        ctx.display_manager.write("Encerrar uso da gaveta? (nao/sim)")
        sleep(5)


@opening_state.before_exit()
def opening_before_exit(ctx):
    global is_full
    global keep_using
    global vault

    ctx.button_manager.reset()
    ctx.face = None
    ctx.image = None

    is_full = False
    keep_using = None
    vault = None


@opening_state.on_timeout(10)
def opening_timeout(ctx, goto):
    global vault

    ctx.vault_manager.free_vault(vault)
    goto("starting")
