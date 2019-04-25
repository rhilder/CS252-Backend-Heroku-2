import bcrypt from 'bcrypt';

// takes the plaintext password and the hashed password in the db
// and returns true if the passwords match
const compareHashedPassword = async (plaintextPassword, hashedPassword) => {
  const isMatch = await bcrypt.compare(plaintextPassword, hashedPassword);
  return isMatch;
};

export default compareHashedPassword;
