const logger = require('logger').createLogger();

if (process.env.IS_OFFLINE) {
    logger.setLevel('debug');
}
else {
    logger.setLevel('info');
}

module.exports = logger;
