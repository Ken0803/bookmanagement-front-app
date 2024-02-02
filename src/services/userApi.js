import { API } from "./api";

// User Login Api
export const userLogin = async (userData) => {
  try {
    const user = await API.post('/login/', userData);

    return user.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// User Sign Up API
export const userSignup = async (userData) => {
  try {
    const user = await API.post('/signup/', userData);

    return user.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}