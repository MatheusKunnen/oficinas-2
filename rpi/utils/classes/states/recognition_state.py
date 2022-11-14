from time import sleep
from utils.classes.state_machine import StateMachine

recognition_state = StateMachine.State("recognition")


@recognition_state.main()
def recognition(ctx, goto):
    (ctx.image, ctx.face) = ctx.camera_manager.detect_face()

    if ctx.face is not None:
        goto("opening")


@recognition_state.before_enter()
def recognition_before_enter(ctx):
    ctx.display_manager.write("Posicione-se frente a camera")
    sleep(0.5)


@recognition_state.before_exit()
def recognition_before_exit(ctx):
    pass


@recognition_state.on_timeout(10)
def recognition_timeout(ctx, goto):
    ctx.display_manager.write("Tempo esgotado")
    sleep(1)

    goto("starting")
