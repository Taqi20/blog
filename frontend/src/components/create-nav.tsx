import { PenTool } from 'lucide-react';
import { MyDropdown } from "./avatar";
import { Link, useNavigate } from "react-router-dom"


export const NavPost = ()=>{
    const navigate = useNavigate();
    const onClick = ()=>{
        navigate('/create/ai')
    }

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
            <div className="h-10">
                <button onClick={onClick} className="h-full bg-blue-300 text-blue-700 px-2 sm:px-6 rounded-full text-sm sm:text-lg font-semibold flex items-center hover:bg-blue-200 shadow-md shadow-blue-200">Generate AI</button>
            </div>
                <MyDropdown />
            </div>     
        </div>
    )
}