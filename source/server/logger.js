import winston from 'winston'

winston.configure({
  transports: [
    new (winston.transports.Console)({
      colorize: true,
      silent: process.env.NODE_ENV === 'test'
    })
  ]
})

export default winston
