import pino from "pino"

const logger = pino({
    level: 'info',
    timestamp: pino.stdTimeFunctions.isoTime
})

export default logger