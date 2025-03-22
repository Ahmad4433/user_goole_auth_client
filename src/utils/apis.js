const apis = () => {
  const local = "http://localhost:8080/";

  const list = {
    loginUser: `${local}user/login`,
    registerUser: `${local}user/register`,
    getUserProfile: `${local}user/profile`,
    getAccess: `${local}user/access`,
    logout: `${local}user/logout`,
    forgetPassword: `${local}user/password/forget`,
    verifyOtp: `${local}user/otp/verify`,
    getOtpExpTime: `${local}user/otp/exp`,
    upadtePassword: `${local}user/password/update`,
  };

  return list;
};

export default apis;
