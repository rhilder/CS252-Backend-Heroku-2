import bcrypt from 'bcrypt';

const saltRounds = 10;

const bcryptHashPassword = async (plaintextPassword) => {
  const hash = await bcrypt.hash(plaintextPassword, saltRounds);
  return hash;
};

export default bcryptHashPassword;