import bcrypt from 'bcrypt';
import Joi from 'joi';
import PasswordComplexity from 'joi-password-complexity';
import doHash from '../helpers/hashPassword';
import User, { validateInput } from '../models/User';

/**
 * register a new user
 * @param {*} req
 * @param {*} res
 * @returns
 */
export async function registerUser(req, res) {
  // 0. Validate user input
  const { error } = validateInput(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  // 1. Check user existence
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    // 2. If exist -> return 400 bad request, user existed
    return res.status(400).json({ error: 'User already exists' });
  }
  // 3. If haven't been created -> create User and return 201 created status
  req.body.password = doHash(req.body.password);
  const newUser = new User(req.body);
  await newUser.save();
  return res
    .header('x-auth-token', newUser.generateAuthToken())
    .status(201)
    .json({
      msg: 'Created user',
      user: {
        // eslint-disable-next-line no-underscore-dangle
        id: newUser._id,
        email: newUser.email,
        password: doHash(newUser.password),
      },
    });
}

/**
 * Login user
 * @param {*} req
 * @param {*} res
 */
export async function loginUser(req, res) {
  // 0. Validate user input
  const validateSchema = Joi.object({
    email: Joi.string().email().required(),
    password: new PasswordComplexity(),
  });
  const { error } = validateSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  // 1. Find user that match with email
  const user = await User.findOne({ email: req.body.email });

  // 2. If not exists -> return 400 bad request
  if (!user) return res.status(400).json({ msg: 'Email or password is not match!' });

  // 3. If existed, compare password
  if (await bcrypt.compare(req.body.password, user.password))
    // 4. If compare success -> return 200 OK
    return res
      .header('x-auth-token', user.generateAuthToken())
      .status(200)
      .json({ msg: 'logged in' });

  // 5. If compare failed -> return 400 bad request
  return res.status(400).json({ msg: 'Bad Request. Email or password is not match!' });
}
