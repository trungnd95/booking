import bcrypt from 'bcrypt';

export default function doHash(pass) {
  return bcrypt.hashSync(pass, bcrypt.genSaltSync(10));
}
