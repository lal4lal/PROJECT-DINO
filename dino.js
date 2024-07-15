import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const dinoElem = document.querySelector("[data-dino]")
const JUMP_SPEED = .45
const GRAVITY = .0015
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100

let isJumping
let dinoFrame
let currentFrameTime
let yVelocity
let isDucking
export function setupDino() {
    isJumping = false
    isDucking = false
    dinoFrame = 0
    currentFrameTime = 0
    yVelocity = 0
    setCustomProperty(dinoElem, "--bottom", 0)
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)
    document.removeEventListener("keydown", onDuck)
    document.addEventListener("keydown", onDuck)
    document.removeEventListener("keyup", onStandUp)
    document.addEventListener("keyup", onStandUp)
}

export function updateDino(delta, speedScale) {
    handleRun(delta, speedScale)
    handleJump(delta)
    handleDuck(delta)
}

export function getDinoRects() {
    return dinoElem.getBoundingClientRect()
}

export function setDinoLose() {
    dinoElem.src = "./img/dino-lose.png"
}

function handleRun(delta, speedScale) {
    if (isJumping) {
        dinoElem.src = "./img/dino-stationary.png"
        return
    }

    if (currentFrameTime >= FRAME_TIME) {
        dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
        if (isDucking) {
            dinoElem.src = `./img/dino-duck${dinoFrame}.png`
        } else {
            dinoElem.src = `./img/dino-run-${dinoFrame}.png`
        }
        currentFrameTime -= FRAME_TIME
    }
    currentFrameTime += delta * speedScale
}

function handleJump(delta) {
    if (!isJumping) return

    incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta)

    if (getCustomProperty(dinoElem, "--bottom") <= 0) {
        setCustomProperty(dinoElem, "--bottom", 0)
        isJumping = false
    }

    yVelocity -= GRAVITY * delta
}

function onJump(e) {
    if (e.code !== "Space" || isJumping) return 

    yVelocity = JUMP_SPEED
    isJumping = true
}

function handleDuck(delta) {
    if (!isDucking) return

    setCustomProperty(dinoElem, "--bottom", 0)
}

function onDuck(e) {
    if (e.code !== "ArrowDown" || isJumping || isDucking) return

    isDucking = true
    dinoElem.src = "./img/dino-duck0.png"
    dinoElem.classList.add("ducking")
    setCustomProperty(dinoElem, "--bottom", 0)
}

function onStandUp(e) {
    if (e.code !== "ArrowDown") return

    isDucking = false
    dinoElem.src = "./img/dino-stationary.png"
    dinoElem.classList.remove("ducking")
    setCustomProperty(dinoElem, "--bottom", 0)
}