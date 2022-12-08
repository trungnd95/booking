import winston from 'winston';

export default function error(err, req, res, next) {
  winston.error(err.message || 'Internal Server Error', err.stack || err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    status: err.status || 500,
    success: false,
    stack: err.stack,
  });
  next();
}
