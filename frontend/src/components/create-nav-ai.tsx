import { Link } from "react-router-dom"
import { MyDropdown } from "./avatar"
import { PenTool } from 'lucide-react';

export const NavPostAi = () => {
    return (
        <div className="h-14 flex justify-between mt-2">
            <Link to={"/blogs"} >
            <div className="h-full flex mx-2 sm:mx-8 items-center gap-3">
                <PenTool className="text-gray-900 w-1/6 sm:w-1/5 h-full" />
                <div>
                    <h3 className="text-xl sm:text-3xl font-bold sm:font-extrabold text-slate-950">Madhyam</h3>
                </div>
            </div>
            </Link>

            <div className="h-full flex mx-2.5 sm:mx-8 items-center gap-4">
                <MyDropdown />
            </div>     
        </div>
    )
}