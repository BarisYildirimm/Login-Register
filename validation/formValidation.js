module.exports.registerValidation = (username, password) => {
  const errors = [];

  if (username === "") {
    errors.push({ message: "please fill the username area" });
  }
  if (password === "") {
    errors.push({ message: "please fill the username area" });
  }
  return errors;
};
