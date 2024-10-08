import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '../components/Button';
import { PenTool, Sparkles, BookOpen, Users } from 'lucide-react';
import { Link } from 'react-router-dom';


const CreativeHero = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, -200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -100]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <div className="relative h-screen overflow-hidden">
            <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{ y: y1, opacity }}
            >
                <div className="text-[14rem] font-bold text-gray-100">Madhyam</div>
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-center z-10"
                >
                    <h1 className="text-6xl font-bold mb-4">Welcome to Madhyam</h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Redefining the platform of digital storytelling
                    </p>
                    <div className="space-x-4">

                        <Button size="lg" className="bg-gray-900 hover:bg-gray-700 text-white transition-colors">Start Writing</Button>
                        <Button variant="outline" size="lg" className="text-gray-900 border-gray-900 hover:bg-gray-100 transition-colors">Explore Stories</Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const FloatingShapes = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, index) => (
                <motion.div
                    key={index}
                    className="absolute bg-gray-900 opacity-5"
                    style={{
                        width: Math.random() * 40 + 10,
                        height: Math.random() * 40 + 10,
                        borderRadius: Math.random() > 0.5 ? '50%' : '0%',
                    }}
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        rotate: 0,
                    }}
                    animate={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        rotate: 360,
                    }}
                    transition={{
                        duration: 20 + Math.random() * 10,
                        repeat: Infinity,
                        repeatType: 'reverse',
                    }}
                />
            ))}
        </div>
    );
};

export default function LandingPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className="flex flex-col h-screen bg-white text-gray-900">
            <FloatingShapes />
            <header className="px-4 lg:px-6 h-16 flex items-center backdrop-blur-sm bg-white/80 sticky top-0 z-50">
                <Link className="flex items-center justify-center" to="/">
                    <PenTool className="h-6 w-6 text-gray-900" />
                    <span className="ml-2 text-lg font-bold">Madhyam</span>
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
                        <Button variant="ghost" size="sm" className="text-gray-900 hover:text-gray-600 transition-colors">
                            Sign In
                        </Button>
                    </Link>

                    <Link to="/signup" >
                        <Button size="sm" className="bg-gray-900 hover:bg-gray-700 text-white transition-colors">
                            Sign Up
                        </Button>
                    </Link>
                </div>
            </header>
            <main className="flex-1">
                <CreativeHero />
                <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                            Futuristic{' '}
                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600">
                                Features
                            </span>
                        </h2>
                        <div className="grid gap-8 md:grid-cols-3">
                            <motion.div
                                className="flex flex-col items-center text-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <Sparkles className="h-12 w-12 text-gray-900 mb-4" />
                                <h3 className="text-xl font-bold mb-2">AI-Powered Writing</h3>
                                <p className="text-gray-500">Enhance your creativity with our advanced AI writing assistant.</p>
                            </motion.div>
                            <motion.div
                                className="flex flex-col items-center text-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <BookOpen className="h-12 w-12 text-gray-900 mb-4" />
                                <h3 className="text-xl font-bold mb-2">Immersive Reading</h3>
                                <p className="text-gray-500">Experience blogs in a new dimension with our immersive reading mode.</p>
                            </motion.div>
                            <motion.div
                                className="flex flex-col items-center text-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                            >
                                <Users className="h-12 w-12 text-gray-900 mb-4" />
                                <h3 className="text-xl font-bold mb-2">Global Connections</h3>
                                <p className="text-gray-500">Connect with writers and readers from around the world in real-time.</p>
                            </motion.div>
                        </div>
                    </div>
                </section>
                <section id="recent-posts" className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                            Trending{' '}
                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600">
                                Posts
                            </span>
                        </h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3].map((i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 * i }}
                                    className="bg-white shadow-lg rounded-lg overflow-hidden"
                                >
                                    <div className="relative h-48 bg-gray-100">
                                        <img
                                            src={`https://picsum.photos/seed/${i}/500/300`}
                                            alt={`Post ${i}`}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-2">Post Title {i}</h3>
                                        <p className="text-gray-500 mb-4">Brief description of the post.</p>
                                        <Link
                                            to={`/post/${i}`}
                                            className="text-gray-900 hover:text-gray-600 font-medium"
                                        >
                                            Read More →
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <footer className="py-6 text-center bg-gray-900 text-white">
                &copy; 2024 NeoScribe. All rights reserved.
            </footer>
        </div>
    );
}
