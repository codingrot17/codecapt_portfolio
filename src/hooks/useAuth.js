import { useState, useEffect, createContext, useContext } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
};

export const useAuthProvider = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Check authentication status on mount
    const checkAuth = async () => {
        try {
            const res = await fetch("/api/auth/status", {
                credentials: "include"
            });

            if (!res.ok) {
                setIsAuthenticated(false);
                return;
            }

            const data = await res.json();
            setIsAuthenticated(Boolean(data.authenticated));
        } catch (error) {
            console.error("Auth check failed:", error);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async credentials => {
        setIsLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials),
                credentials: "include"
            });

            if (res.ok) {
                setIsAuthenticated(true);
                return true;
            }

            return false;
        } catch (error) {
            console.error("Login error:", error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include"
            });
            setIsAuthenticated(false);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return {
        isAuthenticated,
        login,
        logout,
        isLoading,
        checkAuth
    };
};

export { AuthContext };
