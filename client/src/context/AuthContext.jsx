"use client";
import { createContext, useEffect, useState, useContext } from "react";
import { logout, authMember } from "@/api";
import { useRouter } from "next/navigation";
import { pushSuccess, pushError } from "@/components/Toast";

const MEMBER_KEY = "member",
  TOKEN_KEY = "authToken";

// Define the context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [memberId, setMemberId] = useState();
  const [member, setMember] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem(TOKEN_KEY) || null;
      const storedMember = localStorage.getItem(MEMBER_KEY) || null;

      if (storedToken) {
        setToken(storedToken);
        setIsLoggedIn(storedToken && storedMember);
        setMemberId(JSON.parse(storedMember));
      }
    }
  }, [router]);

  const storeAuth = (member, token) => {
    if (member) {
      console.log("member in auth: ", member);
      setIsLoggedIn(true);
      setMember(member);
      setToken(token);
      localStorage.setItem(MEMBER_KEY, JSON.stringify(member)); // may handle type
      localStorage.setItem(TOKEN_KEY, token);
    }
    console.log("successfully logged in");
    router.push("/home");
  };

  const removeAuth = async () => {
    const res = await logout();
    if (res) {
      console.log("logged out");
      setIsLoggedIn(false);
      setMember(null);
      setToken(null);
      localStorage.removeItem(MEMBER_KEY);
      localStorage.removeItem(TOKEN_KEY);
    }
    router.push("/");
  };

  useEffect(() => {
    const verifyAuth = async () => {
      console.log(token, memberId);
      if (token && memberId) {
        const id = JSON.parse(localStorage.getItem(MEMBER_KEY));
        const res = await authMember(id, token);
        if (res) {
          // setIsLoggedIn(true);
          setMember(res);
        }
        // } else {
        //   setIsLoggedIn(false);
        //   setMember(null);
        //   setToken(null);
        //   localStorage.removeItem(MEMBER_KEY);
        //   localStorage.removeItem(TOKEN_KEY);
        //   router.push("/");
        // }
      }
      const currPath = window?.location.pathname || "";
      if (
        localStorage.getItem(TOKEN_KEY) == null &&
        currPath != "/" &&
        currPath != "/register"
      ) {
        router.push("/");
        pushError("Please login or register an account!")
      }
    };
    verifyAuth();
  }, [token, router]);

  const checkLoginInitial = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
      pushSuccess("You already logged in!")
      router.push("/home")
    }
  };

  return (
    <AuthContext.Provider
      value={{
        member,
        storeAuth,
        removeAuth,
        isLoggedIn,
        checkLoginInitial
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
