
import axios from "axios";

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
    return response.data; 
  } catch (error) {
    console.error("Error sending token to backend:", error);
    return null;
  }
}
