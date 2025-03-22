const apis = () => {
  const local = "http://localhost:8080/";
  const live = 'https://user-google-auth-server.vercel.app/'

  const list = {
    loginUser: `${live}user/login`,
    registerUser: `${live}user/register`,
    getUserProfile: `${live}user/profile`,
    getAccess: `${live}user/access`,
    logout: `${live}user/logout`,
    forgetPassword: `${live}user/password/forget`,
    verifyOtp: `${live}user/otp/verify`,
    getOtpExpTime: `${live}user/otp/exp`,
    upadtePassword: `${live}user/password/update`,
  };

  return list;
};

export default apis;
