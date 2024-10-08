import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"
import { useNavigate } from 'react-router-dom';

export const AppBar = () => {

    const navigate = useNavigate();

    const handleSignOut = () => {
        // Clear user data from local storage or cookies
        localStorage.removeItem('token');

        // Redirect to the login page
        navigate('/signin');
    };

    return <div className="border-b flex justify-between px-10 py-4">
        <Link to={'/blogs'} className="flex flex-col justify-center">
            Maadhyam
        </Link>
        <div>
            <Link to={'/publish'}>
                <button className="mr-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded-3xl">
                    New Blog
                </button>
            </Link>
            <button onClick={handleSignOut} className="mr-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded-3xl">
                sign out
            </button>
            <Avatar size="big" name={"Taqi"} />
        </div>
    </div>
}