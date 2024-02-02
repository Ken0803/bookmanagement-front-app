export const validateEmail = (email) => {
  let regexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email.length) return ["Required!"];
  else if (!email.match(regexp)) return ["Invalid Email!"];

  return true;
};

export const getErrorMessage = (error) => {
  return error?.response?.data?.message ?? "Failed";
}