
const color = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",
    FgBlack: "\x1b[30m",
    FgRed: "\x1b[31m",
    FgGreen: "\x1b[32m",
    FgYellow: "\x1b[33m",
    FgBlue: "\x1b[34m",
    FgMagenta: "\x1b[35m",
    FgCyan: "\x1b[36m",
    FgWhite: "\x1b[37m",
    FgGray: "\x1b[90m",
    BgBlack: "\x1b[40m",
    BgRed: "\x1b[41m",
    BgGreen: "\x1b[42m",
    BgYellow: "\x1b[43m",
    BgBlue: "\x1b[44m",
    BgMagenta: "\x1b[45m",
    BgCyan: "\x1b[46m",
    BgWhite: "\x1b[47m",
    BgGray: "\x1b[100m",
}

type ColorType = "Reset" |
    "Bright" |
    "Dim" |
    "Underscore" |
    "Blink" |
    "Reverse" |
    "Hidden" |
    "FgBlack" |
    "FgRed" |
    "FgGreen" |
    "FgYellow" |
    "FgBlue" |
    "FgMagenta" |
    "FgCyan" |
    "FgWhite" |
    "FgGray" |
    "BgBlack" |
    "BgRed" |
    "BgGreen" |
    "BgYellow" |
    "BgBlue" |
    "BgMagenta" |
    "BgCyan" |
    "BgWhite" |
    "BgGray"


type LogType = "success" | "error" | "info" | "warning" | "default"

interface ILogType {
    type: LogType
    message: string
}

interface IColoredMessage {
    message: string
    colorType?: ColorType
}

const coloredMessage = ({ colorType, message }: IColoredMessage) => `${color[colorType!]}${message}${color.Reset}`


export const Log = ({ type = "default", message }: ILogType) => {
    switch (type) {
        case "error":
            console.log(coloredMessage({ colorType: "FgRed", message: `[${type}] ${message}` }))
            break;
        case "success":
            console.log(coloredMessage({ colorType: "FgGreen", message: `[${type}] ${message}` }))
            break;
        case "info":
            console.log(coloredMessage({ colorType: "FgBlue", message: `[${type}] ${message}` }))
            break;
        case "warning":
            console.log(coloredMessage({ colorType: "FgYellow", message: `[${type}] ${message}` }))
            break;

        default:
            console.log(coloredMessage({ message }))
            break;
    }
}