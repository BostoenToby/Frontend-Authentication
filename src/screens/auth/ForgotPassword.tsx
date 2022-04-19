import { Aperture } from "lucide-react"
import { Link } from "react-router-dom"

export default () => {
    return (
        <div className="flex min-h-screen items-center">
            {/* display flex, min height = screenheight, items center (justify-content, align-items) */}
            <div className="mx-auto w-full max-w-md px-6">
                <form>
                    <header className="flex gap-4 items-center pb-8">
                        <div className="rounded-full bg-red-300 h-12 w-12 flex items-center justify-center">
                            {/* LOGO lucide */}
                            <Aperture className="w-7 h-7 stroke-red-600"/>
                        </div>
                        <h2 className="text-5xl">Reset password</h2>
                    </header>
                    <div className="flex flex-col py-2">
                        <label className="font-semibold" htmlFor="email">Email address</label>
                        <input className="border border-gray-300 rounded h-8 px-2 flex items-center active:border-red-600 focus:border-red-600 focus:border-4 outline-none" type="email" name="email" id="email" placeholder="e.g. john@doe.com"/>
                    </div>
                    <button className="w-full h-8 rounded bg-red-500 text-white my-4">Reset password</button>
                    <div>
                        <p className="flex justify-center gap-1">Don't have an account? <Link className="text-red-600" to="/register">Create an account.</Link></p>
                    </div>
                </form>
           </div>
        </div>

    )
}