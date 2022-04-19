import { onAuthStateChanged, User } from "firebase/auth"
import { Loader2 } from "lucide-react"
import React, { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthContext, useAuth } from "../utils/AuthContext"
import { auth } from "../utils/Firebase"
import ForgotPassword from "./auth/ForgotPassword"
import Login from "./auth/Login"
import Profile from "./auth/Profile"
import Protected from "./auth/Protected"
import Register from "./auth/Register"
import ClientError from "./ClientError"


export default () => {
    //  #1 Auth context provider

    //  #2 Protected route component maken

    //  #3 firebase auth setup

    const [user, setUser] = useState<User>()

    const [resolved, setResolved] = useState<boolean>()

    onAuthStateChanged(auth, (user) => {
       if (user) {
        // console.log(user)
        setUser(user as User)
       }
       setResolved(true)
    }, (error => {
        console.error(error)
    }))

    if (!resolved){
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="flex items-center space-x-3">
                    <Loader2 className="animate-spin"/>
                    <p>Trying to restore auth from the brower...</p>
                </div>
            </div>
        )
    } else {
        return (
            <AuthContext.Provider value={{ user, setUser }}>
                <Routes>
                    {/* PUBLIC */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/register" element={<Register />} />
    
                    {/* PROTECTED */}
                    <Route path="/" element={
                        <Protected>
                            <Profile />
                        </Protected>
                    } />
    
                    {/* FALLBACK / CATCH ALL */}
                    <Route path="*" element={<ClientError />} /> 
                    {/* indien path iets is dat we niet zelf gemaakt hebben "*", dan willen we een error page */}
                </Routes>
            </AuthContext.Provider>
        )
    }
}