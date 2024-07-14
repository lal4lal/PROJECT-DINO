import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const SPEED = .05
const CACTUS_INTERVAL_MIN = 500
const CACTUS_INTERVAL_MAX = 2000
const wordElem = document.querySelector("[data-world")

let nextCactusTIme
export function setupCactus() {
    nextCactusTIme = CACTUS_INTERVAL_MIN
    document.querySelectorAll("[data-cactus").forEach(cactus => {
        cactus.remove()
    })
}

export function updateCactus(delta, speedScale) {
    document.querySelectorAll("[data-cactus").forEach(cactus => {
        incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * - 1)
        if (getCustomProperty(cactus, "--left") < -100) {
            cactus.remove()
        }
    })
    if (nextCactusTIme <= 0) {
        createCactus()
        nextCactusTIme = randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale
    }
    nextCactusTIme -= delta
}

export function getCactusRects() {
    return [...document.querySelectorAll("[data-cactus")].map(cactus => {
        return cactus.getBoundingClientRect()
    })
}

function createCactus() {
    const cactus = document.createElement("img")
    cactus.dataset.cactus = true
    cactus.src = "./img/cactus.png"
    cactus.classList.add("cactus")
    setCustomProperty(cactus, "--left", 100)
    wordElem.append(cactus)
}

function randomNumberBetween(min, max) {
   return Math.floor(Math.random() * (max - min + 1) + min)
}