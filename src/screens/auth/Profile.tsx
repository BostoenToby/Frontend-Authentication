import { signOut } from "firebase/auth"
import { Hand, LogOut } from "lucide-react"
import { useState } from "react"
import { Link, Navigate, NavigateFunction, useNavigate } from "react-router-dom"
import { useAuth } from "../../utils/AuthContext"
import { auth } from "../../utils/Firebase"

export default () => {
    const { user, setUser } = useAuth()
    // console.log(user)
    const [ idToken, setIdToken ] = useState<string>()

    const navigate: NavigateFunction = useNavigate()

    const getToken = async () => {
        const t: string | undefined = await user?.getIdToken()
        if(t) setIdToken(t)
    }


    const logout = () => {
        signOut(auth).then(() => {
            setUser(null)
            navigate('/login')
        })
    }

    getToken()

    return (
        <div className="flex min-h-screen items-center">
            {/* display flex, min height = screenheight, items center (justify-content, align-items) */}
            <div className="mx-auto w-full max-w-md px-6">
                <form>
                    <header className="flex items-center space-x-3 mb-6">
                        <div className="rounded-full bg-red-200 p-3">
                            {/* LOGO lucide */}
                            <Hand className="stroke-red-600"/>
                        </div>
                        <h2 className="text-5xl font-bold leading-tight font-playfair">Welcome</h2>
                    </header>
                    <p className="flex gap-1 text-sm">You are logged in with the emailaddress <span className="font-bold">{user?.email}</span></p>
                    <p>The uid is <span className="font-mono">{user?.uid}</span></p>
                    <p>Last login: <span className="font-mono">{user?.metadata.lastSignInTime}</span></p>
                    <p className="mt-6">Token to access backend service</p>
                    <div className="block max-w-lg overflow-x-auto whitespace-nowrap pb-3 font-mono blur-sm hover:blur-none">{idToken}</div>

                    <footer className="mt-6 flex items-center space-x-3">
                        <p className="ml-auto text-sm leading-none">Are you done here? Don't forget to log out. </p>
                        <button className="text-red-600 hover:underline focus:outline-none focus-visible:ring ring-red-200" onClick={logout}>Log out.</button>
                    </footer>
                </form>
           </div>
        </div>
    )
}