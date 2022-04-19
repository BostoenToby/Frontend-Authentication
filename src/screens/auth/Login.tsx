import { Link, NavigateFunction, useNavigate } from 'react-router-dom'
import { app, auth } from '../../utils/Firebase'

import { Check, Key, LogIn, X } from 'lucide-react'
import { FormEvent, useEffect, useState } from 'react'
import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword, UserCredential } from 'firebase/auth'
import { useAuth } from '../../utils/AuthContext'
import { FormErrors } from '../../interfaces/FormErrors'

export default () => {
    const [userCredentials, setUserCredentials] = useState({
        email: 'test123@howest.be', 
        password:'azerty'
    })

    const [errors, setErrors] = useState<FormErrors>({ generic: {title: '', message:''}, fields: {
        email: {
            hasError: false,
            inlineErrorMessage: '',
            dirty: false
        },
        password: {
            hasError: false,
            inlineErrorMessage: '',
            dirty: false
        }
    }})

    const navigate: NavigateFunction = useNavigate()
    
    const { user, setUser } = useAuth()

    const discardErrorMessage = () => {
        setErrors((currentErrors: FormErrors) => {
            currentErrors.generic = {title: '', message:''}
            return { ...currentErrors }
        })
    }

    useEffect(() => {
        // Als er al een user is, kan je niet nog eens aanmelden 
        if (user) navigate('/')
    }, [])

    const login = (): void => {
        // om te zorgen dat we ingelogd blijven via localstorage in browser
        setPersistence(auth, browserLocalPersistence) 

        // TODO: input validation
        signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password).then((u: UserCredential) => {
            setUser(u.user)
            console.log({u})
            console.log(u)
            navigate('/')
        }).catch((err) => {
            setErrors((currentErrors: FormErrors) => {
                currentErrors.generic = {
                    title: err.code,
                    message: err.message
                }
                return { ...currentErrors }
            })
            console.dir(err)
        })
    }

    useEffect(() => {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userCredentials.email)){
            setErrors((currentErrors: FormErrors) => {
                currentErrors.fields.email.hasError = true,
                currentErrors.fields.email.inlineErrorMessage = "Not a valid email"
                return { ... currentErrors }
            })
        }
        else {
            setErrors((currentErrors: FormErrors) => {
                currentErrors.fields.email.hasError = false,
                currentErrors.fields.email.inlineErrorMessage = ""
                return { ... currentErrors }
            }) 
        }
    }, [userCredentials.email])

    return (
        <div className="flex min-h-screen items-center">
            {/* display flex, min height = screenheight, items center (justify-content, align-items) */}
            <div className="mx-auto w-full max-w-md px-6">
                {/* margin auto, full width, max width medium, padding op x-as 6 */}
                <form onSubmit={(e: FormEvent<HTMLFormElement>) => {
                    e.preventDefault() // Form niet verzenden met GET / POST
                    login()
                }}>
                    <header className="flex items-center space-x-3 mb-6">
                        <div className="rounded-full bg-red-200 p-3">
                            {/* ICON --> lucide */}
                            <LogIn className="stroke-red-600 "/>
                        </div>
                        <h2 className="text-5xl font-bold leading-tight font-playfair">Sign in</h2>
                    </header>

                    {/* ERRORS */}

                    {errors.generic.title && errors.generic.message && (
                    <div className="flex items-center justify-between mb-3 rounded-md p-3 bg-red-50 border border-red-500 text-red-500">
                        <div>
                            <p className="font-bold">{errors.generic.title}</p>
                            <p>{errors.generic.message}</p>
                        </div>
                        <button onClick={discardErrorMessage}>
                            <X />
                        </button>
                    </div>
                    )}

                    {/* FORM */}

                    <div>
                        <label className={`block mb-1 font-semibold ${errors.fields.email.hasError? 'text-red-500' : ''}`} htmlFor="email">Email address {errors.fields.email.hasError? 'incorrect': ''}</label>
                        <input className={`block w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus-visible:ring ring-red-200 ${errors.fields.email.hasError? 'border-red-500 text-red-500 ring-red-200':''}`} type="email" name="email" id="email" value={userCredentials.email} onInput={(e: FormEvent<HTMLInputElement>) => setUserCredentials((u) => {
                            // @ts-ignore
                            u.email = e.target.value
                            return {...u}
                        }
                        )} />
                        {errors.fields.email.inlineErrorMessage && (<p className="text-sm text-red-500">{errors.fields.email.inlineErrorMessage}</p>)}
                    </div>

                    <div className="mt-3">
                        <label className={`block mb-1 font-semibold ${errors.fields.password.hasError? 'text-red-500': ''}`} htmlFor="password">Password {errors.fields.password.hasError? 'incorrect': ''}</label>
                        <input className={`block w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus-visible:ring ring-red-200 ${errors.fields.password.hasError? 'border-red-500 text-red-500 ring-red-200':''}`} type="password" name="password" id="password" value={userCredentials.password} onInput={(e: FormEvent<HTMLInputElement>) => setUserCredentials((u) => {
                            // @ts-ignore
                            u.password = e.target.value
                            return {...u}
                        })} />
                        {errors.fields.password.inlineErrorMessage && (<p className="text-sm text-red-500">{errors.fields.password.inlineErrorMessage}</p>)}
                    </div>

                    <div className="mt-3 flex items-center space-x-2">
                        <label className="flex h-5 w-5 items-center justify-center rounded-md border border-neutral-300 focus:outline-none focus-within:ring ring-red-200" htmlFor="remember">
                            <input className="sr-only peer" type="checkbox" name="remember" id="remember" />
                            {/* peer --> om aangrenzende elementen te gebruiken */}
                            <Check className="h-4 text-red-500 scale-0 transition-transform duration-100 ease-out peer-checked:scale-100" />
                            {/* text color aanpassen --> stroke aanpassen OMDAT stroke: currentColor --> als kleur van tekst verandert --> stroke ook */}
                        </label>
                        <label className="select-none" htmlFor="remember">Remember me (not yet implemented)</label>
                    </div>

                    <div className="mt-6">
                        <button className="w-full rounded-md bg-red-400 text-white px-3 py-2 outline-none hover:bg-red-600 focus:outline-none focus-visible:ring ring-red-200">Sign in</button>
                        <p className="text-neutral-400 text-sm mt-3 text-center text-opacity-40 hover:text-opacity-100">
                            <Link to="/forgot-password" className="focus-visible:outline-none focus-visible:ring ring-red-200">Forgot password?</Link>
                        </p>
                    </div>

                    <div className="mt-6">
                        <p className="text-sm text-center">Don't have an account? <Link className="text-red-600 hover:underline focus:outline-none focus-visible:ring ring-red-200" to="/register">Create an account.</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}