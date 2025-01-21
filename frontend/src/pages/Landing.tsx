import { Link } from "react-router-dom";

export default function Landing(){
    return <div>
        <div className="text-2xl font-semibold">
        Phonepe Landing page!
        </div>
        <div className="flex gap-4 ">
            <button className="text-xl rounded px-3 py-2 bg-red-500 text-white font-semibold">
            <Link to={'/signup'}>
                Signup
            </Link>
            </button>
            <button className="text-xl rounded px-3 py-2 bg-red-500 text-white font-semibold">
            <Link to={'/signin'}>
                Signin
            </Link>
            </button>
        </div>
    </div>
}