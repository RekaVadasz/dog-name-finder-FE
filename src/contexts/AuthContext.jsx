import {React, createContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [userData, setUserData] = useState();
    const [isLoggedIn, setLoggedIn] = useState(false);

    const logIn = () => {
        setLoggedIn(true)
    }

    const logOut = () => {
        setLoggedIn(false);
    }

    const setUser = (userData) => {
        setUserData(userData)
    }

    return (
        <AuthContext.Provider value={{userData, setUser, isLoggedIn, logIn, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;