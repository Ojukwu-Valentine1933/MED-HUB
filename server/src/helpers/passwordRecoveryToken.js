const { generateWebToken } = require("./jwtHelpers");

const emailRecoveryTokenGenerator = () => {
  const generateSixDigitCode = () => {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  return generateSixDigitCode();
};

module.exports = emailRecoveryTokenGenerator;
