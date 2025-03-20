"use client";

import { createContext} from "react";
import Axios from "@/lib/axiosInstance";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { signOut } from "next-auth/react";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {


  const login = async (data) => {
    try {
      const response = await Axios.post("login", data);
      
      // Set token from response
      const token = response.data.token;
      const user = response.data.user;
      Cookies.set("auth_token", token, { expires: 7 });
      Cookies.set("user", JSON.stringify(user), { expires: 7 });


      toast.success("You have successfully logged in", {
        duration: 4000,
        position: "top-center",
        style: {
          fontSize: "15px",
        },
      });

      setTimeout(() => {
        window.location.href = "/";
      }, 900);
    } catch (e) {
      if (e.response) {
        console.warn(e.response.data);
        toast.error("Enter correct data", {
          duration: 4000,
          position: "top-center",
          style: {
            fontSize: "15px",
          },
        });
      }else {
        console.warn(e);
        toast.error("Enter correct data", {
          duration: 4000,
          position: "top-center",
          style: {
            fontSize: "15px",
          },
        });
      }
    } 
  };








  
  const register = async (data) => {

    try {
      const response = await Axios.post("register", data);
      
      // Set token from response
      const token = response.data.token;
      const user = response.data.data;
      // Cookies.set("auth_token", token, { expires: 7 });
      // Cookies.set("user", JSON.stringify(user), { expires: 7 });
      Cookies.set("EmailVerified",data.email);


      toast.success(response.data.message , {
        duration: 4000,
        position: "top-center", 
        style: {
          fontSize: "12px",
        },
      });

      setTimeout(() => {
        window.location.href = "/Verfy";
      }, 2000);
    } catch (e) {
      if (e.response) {
        console.warn(e.response.data);
        if(e.response.data.errors.email){
          toast.error(e.response.data.errors.email);
        }
        if(e.response.data.errors.password){
          toast.error(e.response.data.errors.password);
        }
        if(e.response.data.errors.mobile){
          toast.error(e.response.data.errors.mobile);
        }
      } else {
        console.warn(e);
        toast.error(errors);
      }
    } 
  };




  const verfiy = async (code) => {

      const email = Cookies.get("EmailVerified");
    try {
      const response = await Axios.post("verify-email", {email, code:code.code});
      
      // Set token from response 
      const token = response.data.token;
      const user = response.data.data;
      Cookies.set("auth_token", token, { expires: 7 });
      Cookies.set("user", JSON.stringify(user), { expires: 7 });


      toast.success(response.data.message , {
        duration: 4000,
        position: "top-center", 
        style: {
          fontSize: "15px",
        },
      });

      setTimeout(() => {
        window.location.href = "/";   
        Cookies.remove("EmailVerified");
      }, 2000);
    } catch (e) {
      if (e.response) {
        console.warn(e.response.data);
        if(e.response.data.errors.email){
          toast.error(e.response.data.errors.email);
        }
        if(e.response.data.errors.password){
          toast.error(e.response.data.errors.password);
        }
        if(e.response.data.errors.mobile){
          toast.error(e.response.data.errors.mobile);
        }
      } else {
        console.warn(e);
        toast.error(errors);
      }
    } 
  };











  const logout = async () => {

    try {
      // await Axios.post("logout");
      
      // Clear token and headers
      Cookies.remove("auth_token");
            Cookies.remove("user");
      
            await toast.success("You have successfully logged Out", {
        duration: 4000,
        position: "top-center",
        style: {
          backgroundColor: "var(--primary)",
          color: "white",
          fontSize: "15px",
        },
      });
      signOut()
    } catch (e) {
      console.warn(e);
      toast.error("An Error");
    }
  };



  return (
    <div>
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <AuthContext.Provider
        value={{
          login,
          register,
          verfiy,
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
}