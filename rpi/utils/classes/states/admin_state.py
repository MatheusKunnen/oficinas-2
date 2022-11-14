from time import sleep
from utils.classes.state_machine import StateMachine

admin_state = StateMachine.State("admin")

vault_id = 0
should_increment = False
should_open = False


def set_should_increment(channel):
    global should_increment
    should_increment = True


def set_should_open(channel):
    global should_open
    should_open = True


@admin_state.main()
def admin(ctx, goto):
    global vault_id
    global should_increment
    global should_open

    if not ctx.configuration_manager.get("ADMIN_MODE"):
        goto("starting")

    if should_increment:
        vault_id = (vault_id + 1) % ctx.lock_manager.lock_count
        ctx.display_manager.write(f"Armario {vault_id} (abrir/+)")
        should_increment = False

    if should_open:
        ctx.display_manager.write(f"Armario {vault_id} aberto")
        ctx.lock_manager.toggle(vault_id)
        ctx.display_manager.write(f"Armario {vault_id} (abrir/+)")
        should_open = False


@admin_state.before_enter()
def admin_before_enter(ctx):
    ctx.display_manager.write(f"Armario {vault_id} (abrir/+)")
    ctx.button_manager.set_callback(0, set_should_open)
    ctx.button_manager.set_callback(1, set_should_increment)


@admin_state.before_exit()
def admin_before_exit(ctx):
    global vault_id
    global should_increment
    global should_open

    ctx.button_manager.reset()
    vault_id = 0
    should_increment = False
    should_open = False


@admin_state.on_timeout(120)
def admin_timeout(ctx, goto):
    goto("starting")
