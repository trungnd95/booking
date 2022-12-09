import jwt from 'jsonwebtoken';

// verifyUser
export function verifyUser(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decoded) return res.status(401).json({ msg: 'Invalid token' });
  req.user = decoded;
  return next();
}

// verifyAdmin. It is use after verifyUser
export function verifyAdmin(req, res, next) {
  if (!req.user.isAdmin) {
    return res.status(403).json({ msg: 'Permission denied' });
  }
  return next();
}
