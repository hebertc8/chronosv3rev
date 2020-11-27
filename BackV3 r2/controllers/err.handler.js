
exports.errorHandler = (err, req, res, next) => {
    //console.log(err.name)
    if (typeof (err) === 'string') {
        //console.log('sin especificacion de error (400)')
        return res.status(400).json({ message: err });
    }
    if (err.name === 'UnauthorizedError') {
        let date = new Date()
        let reqq = req
        let ip = reqq.connection.remoteAddress
        console.log(date, ip, reqq.originalUrl, 'Invalid Token' )
        return res.status(401).json({ message: 'Invalid Token' });
    }
    //console.log('no encontro el recurso solicitado')
    return res.status(500).json({ message: err.message });
}

exports.logger = (req, res, next) => {
    try {
        let url = req.originalUrl
        let ip = req.connection.remoteAddress
        let body = JSON.stringify(req.body)
        let fecha = new Date()
        console.log(fecha, ip, url, body)
        //insert information to database about the requests.
        next()
    } catch (error) {
        next()
    }
}

/*
const winston = require('winston');
const httpContext = require('express-http-context');


let formatMessage = (message) => {
    let reqId = httpContext.get('reqId');
    message = reqId ? message + " reqId: " + reqId : message;
    return message;
};
exports.logger = {
    log: (level, message) => {
        winstonLogger.log(level, formatMessage(message));
    },
    error: (message) => {
        winstonLogger.error(formatMessage(message));
    },
    warn: (message) => {
        winstonLogger.warn(formatMessage(message));
    },
    verbose: (message) => {
        winstonLogger.verbose(formatMessage(message));
    },
    info: (message) => {
        winstonLogger.info(formatMessage(message));
    },
    debug: (message) => {
        winstonLogger.debug(formatMessage(message));
    },
    silly: (message) => {
        winstonLogger.silly(formatMessage(message));
    }
};
 */