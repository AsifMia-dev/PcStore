import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const storedUser = sessionStorage.getItem("authUser");
        if(storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    },[]);

    const login = (userData) => {
        // console.log("Login successfully calling");
        setUser(userData);
        sessionStorage.setItem("authUser", JSON.stringify(userData));
        // console.log("User logged in:", userData);
    }
    
    const logout = () =>{
        setUser(null);
        sessionStorage.removeItem("authUser");
    }
    if(loading){
        return <div>Loading...</div>;
    }
    return (
        <AuthContext.Provider value ={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}