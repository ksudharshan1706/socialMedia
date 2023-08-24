import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  console.log(userCredential);
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("auth/login", userCredential);
    // console.log("apicalls success", res.data);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (error) {
    console.log("apicalls failure");
    dispatch({ type: "LOGIN_FILURE", payload: error });
  }
};
