import rTracer from 'cls-rtracer';
import { createLogger, format, transports }  from 'winston';
const { combine, timestamp, printf, json } = format
// reference - https://itnext.io/request-id-tracing-in-node-js-applications-c517c7dab62d

// a custom format that outputs request id
const rTracerFormat = printf((info) => {
  const rid = rTracer.id()
  return rid
    ? JSON.stringify( {
        ...info,
        rid,
      })
    : JSON.stringify(info)
})

const logger = createLogger({
  format: combine(
    timestamp(),
    json(),
    rTracerFormat
  ),
  transports: [new transports.Console()]
})

export default logger;
