import { createUserWithEmailAndPassword, User, UserCredential } from "firebase/auth"
import { ClipboardCheck } from "lucide-react"
import { FormEvent, FormEventHandler, useState } from "react"
import { Link, NavigateFunction, useNavigate } from "react-router-dom"
import { useAuth } from "../../utils/AuthContext"
import { auth } from "../../utils/Firebase"

export default () => {

    // partial<User> = een gedeeltelijke user --> niet alle properties van een user
    const [newUser, setNewUser] = useState({
        displayName: '',
        email: '',
        password: '',
    })

    const { setUser } = useAuth()

    const navigate: NavigateFunction = useNavigate()
    
    const registerUser = (): void => {
        if (newUser.email && newUser.password){
            console.log('Register')
            createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
            .then((user: UserCredential) => {
                setUser(user.user)
                navigate('/')
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    return (
        <div className="flex min-h-screen items-center">
            {/* display flex, min height = screenheight, items center (justify-content, align-items) */}
            <div className="mx-auto w-full max-w-md px-6">
                <form onSubmit={(e: FormEvent<HTMLFormElement>) => {
                    e.preventDefault() // Form niet verzenden met GET / POST
                    registerUser()
                }}>
                    <header className="flex items-center space-x-3 mb-6">
                        <div className="rounded-full bg-red-200 p-3">
                            {/* LOGO lucide */}
                            <ClipboardCheck className="stroke-red-600"/>
                        </div>
                        <h2 className="text-5xl font-bold leading-tight font-playfair">Register</h2>
                    </header>
                    <div className="opacity-40">
                        <label className="block mb-1 font-semibold" htmlFor="displayname">Displayname</label>
                        <input className="block w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus-visible:ring ring-red-200" type="text" name="displayname" id="displayname" />
                    </div>
                    <div className="mt-3">
                        <label className="block mb-1 font-semibold" htmlFor="email">Email address</label>
                        <input className="block w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus-visible:ring ring-red-200" type="email" name="email" id="email" value={newUser.email} onInput={(e: FormEvent<HTMLInputElement>) => setNewUser((u) => {
                            // @ts-ignore
                            u.email = e.target.value
                            return {...u}
                        }
                        )} />
                    </div>

                    <div className="mt-3">
                        <label className="block mb-1 font-semibold" htmlFor="password">Password</label>
                        <input className="block w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus-visible:ring ring-red-200" type="password" name="password" id="password" value={newUser.password} onInput={(e: FormEvent<HTMLInputElement>) => setNewUser((u) => {
                            // @ts-ignore
                            u.password = e.target.value
                            return {...u}
                        })}/>
                    </div>
                    <button className="mt-6 w-full rounded-md bg-red-400 text-white px-3 py-2 outline-none hover:bg-red-600 focus:outline-none focus-visible:ring ring-red-200">Sign in</button>
                    <div className="mt-6">
                        <p className="text-sm text-center">Already have an account? <Link className="text-red-600 hover:underline focus:outline-none focus-visible:ring ring-red-200" to="/login">Log in.</Link></p>
                    </div>
                </form>
           </div>
        </div>
    )
}