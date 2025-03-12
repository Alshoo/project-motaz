
import axios from "axios";
import Cookies from "js-cookie";

export async function sendTokenToBackend(accessToken) {
  try {
    const response = await axios.post(
      "https://dash.motazmcqs.com/api/login-googel", 
      {token: accessToken}, 
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    Cookies.set("auth_token", response.data.token);
    Cookies.set("user", response.data.user);
    return response.data; 
  } catch (error) {
    console.error("Error sending token to backend:", error);
    return null;
  }
}
