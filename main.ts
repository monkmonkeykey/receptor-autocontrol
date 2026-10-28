// MOVIMIENTO HACIA ATRÁS
function car_back () {
    mecanumRobotV2.Motor(LR.Upper_left, MD.Back, newYAba)
    mecanumRobotV2.Motor(LR.Lower_left, MD.Back, newYAba)
    mecanumRobotV2.Motor(LR.Upper_right, MD.Back, newYAba)
    mecanumRobotV2.Motor(LR.Lower_right, MD.Back, newYAba)
}
// GIRO HACIA LA IZQUIERDA
function car_left () {
    mecanumRobotV2.Motor(LR.Upper_left, MD.Back, nexXIzq)
    mecanumRobotV2.Motor(LR.Lower_left, MD.Forward, nexXIzq)
    mecanumRobotV2.Motor(LR.Upper_right, MD.Forward, nexXIzq)
    mecanumRobotV2.Motor(LR.Lower_right, MD.Back, nexXIzq)
}
// MOVIMIENTO HACIA ADELANTE
function car_forward () {
    mecanumRobotV2.Motor(LR.Upper_left, MD.Forward, newYArr)
    mecanumRobotV2.Motor(LR.Lower_left, MD.Forward, newYArr)
    mecanumRobotV2.Motor(LR.Upper_right, MD.Forward, newYArr)
    mecanumRobotV2.Motor(LR.Lower_right, MD.Forward, newYArr)
}
// RECEPCIÓN DE MENSAJES DE TEXTO
radio.onReceivedString(function (receivedString) {
    control.inBackground(function () {
        basic.showString(receivedString)
    })
})
/**
 * VARIABLES
 */
// RECEPCIÓN DE LOS VALORES DEL CONTROL
radio.onReceivedValue(function (name, value) {
    if (name == "x") {
        velX = value
    } else if (name == "y") {
        velY = value
    } else if (name == "claxon") {
        // Detectar el cambio de 0 a 1.
        if (value == 1 && claxon == 0) {
            reproducirClaxon = true
        }
        claxon = value
    } else {
        velY = 50
        velY = 50
    }
})
// GIRO HACIA LA DERECHA
function car_right () {
    mecanumRobotV2.Motor(LR.Upper_left, MD.Forward, newXDer)
    mecanumRobotV2.Motor(LR.Lower_left, MD.Back, newXDer)
    mecanumRobotV2.Motor(LR.Upper_right, MD.Back, newXDer)
    mecanumRobotV2.Motor(LR.Lower_right, MD.Forward, newXDer)
}
let newXDer = 0
let reproducirClaxon = false
let claxon = 0
let newYArr = 0
let nexXIzq = 0
let newYAba = 0
let velX = 0
let velY = 0
velY = 50
velX = 50
// CONFIGURACIÓN
radio.setGroup(7)
led.enable(false)
mecanumRobotV2.state()
dfplayermini.connect(SerialPin.P8, SerialPin.P2)
basic.pause(1000)
dfplayermini.setVolume(30)
// Sonido inicial, como en tu código original.
dfplayermini.playFile(0, dfplayermini.isRepeat.No)
let strip = neopixel.create(DigitalPin.P7, 4, NeoPixelMode.RGB)
strip.clear()
mecanumRobotV2.setLed(LedCount.Left, LedState.OFF)
mecanumRobotV2.setLed(LedCount.Right, LedState.OFF)
// CONTROL DE MOVIMIENTO
basic.forever(function () {
    strip.showColor(neopixel.colors(NeoPixelColors.Red))
    // Cálculos originales.
    newXDer = Math.map(velX, 60, 100, 0, 30)
    nexXIzq = Math.map(velX, 40, 0, 0, 30)
    newYArr = Math.map(velY, 60, 100, 0, 100)
    newYAba = Math.map(velY, 40, 0, 0, 100)
    // Estructura original: prioridad del eje Y.
    if (velY >= 60) {
        car_forward()
    } else if (velY <= 40) {
        car_back()
    } else if (velX <= 40) {
        car_left()
    } else if (velX >= 60) {
        car_right()
    } else {
        mecanumRobotV2.state()
    }
    basic.pause(20)
})
// CONTROL DEL CLAXON
basic.forever(function () {
    if (reproducirClaxon) {
        reproducirClaxon = false
        dfplayermini.playFile(0, dfplayermini.isRepeat.No)
    }
    basic.pause(20)
})
