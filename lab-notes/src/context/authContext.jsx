/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { createContext, useContext, useEffect } from "react";  // Crear un ESTADO en un archivo aislado
import { createUser, signInUser, onAuthStateChanged, auth } from '../services/auth';

//createContext devuelve un objeto
export const authContext = createContext();

//hook personalizado
export const useAuth = () => {
    const context = useContext(authContext);
    if(!context) throw new Error('no hay un auth provider')
    return context;
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const signup = (email,password) => createUser(email,password);
    const signIn = (email,password) => signInUser(email,password)
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          setUser(user);
        });
    }, []);

    return (
        //los comp hijos podrán acceder a todo los datos q esta en provider
        <authContext.Provider value={{ signup,signIn, user }}>
            {children}
        </authContext.Provider>
    );
}

