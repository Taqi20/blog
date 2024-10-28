import { Link, useNavigate } from "react-router-dom"
import { PenTool } from 'lucide-react';
import { ButtonGreen } from "./button-green";
import { MyDropdown } from "./avatar";

export const Nav = () => {
    const navigate = useNavigate();
    const CreateHandeler = () => {
        navigate('/publish')
    }
    return (
        <div className="h-14 flex justify-between mt-2">
            <Link to={"/blogs"} >
                <div className="h-full flex mx-2 sm:mx-8 items-center gap-2 sm:gap-3">
                    <PenTool className="text-gray-900 w-1/6 sm:w-1/5 h-full" />

                    <div>
                        <h3 className="text-lg sm:text-3xl font-bold sm:font-extrabold text-slate-950">Madhyam</h3>
                    </div>
                </div>
            </Link>

            <div className="h-full flex mx-3 sm:mx-8 gap-3 sm:gap-6 items-center">
                <div className="h-4/5 flex items-center">
                    <ButtonGreen label="Create Post" onClick={CreateHandeler} />
                </div>
                <MyDropdown />
            </div>
        </div>
    )
}