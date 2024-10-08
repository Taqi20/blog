import { Link } from 'react-router-dom';
import { PenTool } from 'lucide-react';
import Button from './Button';


export const Nav = () => {

    return (
        <header className="z-50 top-0 w-full text-content transition-all duration-300 backdrop-blur-sm bg-white/80 sticky">
            <div className="sm:px-6 px-1 flex justify-around items-center">
                <div className="xl:max-w-[1280px] w-11/12">
                    <nav className="w-full flex py-2 justify-between items-center">
                        <Link className="flex flex-row items-center justify-center" to="/">
                            <PenTool className="h-10 sm:h-12 md:h-14 lg:h-16 text-gray-900" />
                            <span className="text-md md:text-xl lg:text-2xl font-bold">Madhyam</span>
                        </Link>

                        <nav className="ml-auto flex gap-4 sm:gap-6">
                            <Link className="text-sm font-medium hover:text-gray-600 transition-colors" to="#features">
                                Features
                            </Link>
                            <Link className="text-sm font-medium hover:text-gray-600 transition-colors" to="#recent-posts">
                                Explore
                            </Link>
                        </nav>
                        <div className="ml-4 flex items-center gap-2">
                            <Link to="/signin">
                                <Button size="sm" className="bg-gray-900 hover:bg-gray-700 text-white transition-colors">GetIn</Button>
                            </Link>
                        </div>

                    </nav>
                </div>
            </div>
        </header>
    );
};
