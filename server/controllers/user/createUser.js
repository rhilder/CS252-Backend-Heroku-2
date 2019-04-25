import hashPassword from '../utils/hashPassword';

const sendErrorResponse = (res, errorMessage) => res.status(400).json({
  message: errorMessage,
});

const createUser = async (req, res) => {
  const {
    username,
    password,
    firstName,
    lastName,
    email,
  } = req.body;

  const db = req.app.get('db');

  let errorMessage;
  
  let user = await db.users.findOne({
    username,
  });
  if (user) {
    errorMessage = 'Username in use.';
    return sendErrorResponse(res, errorMessage);
  }

  user = await db.users.findOne({
    email
  });
  if (user) {
    errorMessage = 'Email in use.';
    return sendErrorResponse(res, errorMessage);
  }

  const hashedPassword = await hashPassword(password);
  user = await db.users.save({
    username,
    password: hashedPassword,
    firstName,
    lastName,
    email,
  });
  delete user.password;

  // return successful response
  return res.status(200).json({
    message: 'User was successfully created',
    data: user
  });
};

export default createUser;