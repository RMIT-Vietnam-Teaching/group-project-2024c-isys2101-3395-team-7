"use client";
import {
    createContext,
    useEffect,
    useState,
    useContext,
} from "react";
import { logout, authMember } from "@/api";
import { useRouter } from "next/navigation";

const MEMBER_KEY = "member", TOKEN_KEY = "token"

// Define the context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const router = useRouter();
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
                setMember(JSON.parse(storedMember));
            }
        }
    }, [router]);

    const storeAuth = (member, token) => {
        if (member) {
            console.log("member in auth: ", member)
            setIsLoggedIn(true);
            setMember(member)
            setToken(token)
            localStorage.setItem(MEMBER_KEY, JSON.stringify(member));   // may handle type
            localStorage.setItem(TOKEN_KEY, token)
        }
        console.log("successfully logged in")
        router.push("/home")
    };

    const removeAuth = async () => {
        const res = await logout();
        if (res) {
            console.log("logged out")
            setIsLoggedIn(false);
            setMember(null)
            setToken(null)
            localStorage.removeItem(MEMBER_KEY);
            localStorage.removeItem(TOKEN_KEY);
        }
        router.push("/")
    };

    useEffect(() => {
        const verifyAuth = async () => {
            if (token !== null) {
                const res = await authMember(token);
                if (res) {
                    setIsLoggedIn(true);
                    // setMember(res.user);
                    router.push(window?.location.pathname)
                } else {
                    setIsLoggedIn(false);
                    setMember(null);
                    setToken(null);
                    localStorage.removeItem(MEMBER_KEY);
                    localStorage.removeItem(TOKEN_KEY);
                    router.push("/");
                }
            }
            const currPath = window?.location.pathname || "";
            if (token == null && currPath != "/" && currPath != "/register") {
                router.push("/");
            }
        };

        verifyAuth();
    }, [token, router]);

    return (
        <AuthContext.Provider
            value={{
                member,
                storeAuth,
                removeAuth,
                isLoggedIn,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// export const useAuth = () => useContext(AuthContext);
export const useAuth = () => {
    return useContext(AuthContext);
};