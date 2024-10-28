import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CreativeHero } from '../components/Hero';
import { FloatingShapes } from '../components/Hero';
import { Nav } from '../components/Nav';


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
            <Nav />
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
                        <div className="grid gap-8 md:grid-cols-2">
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
                        </div>
                    </div>
                </section>
            </main>
            <footer className="py-6 text-center bg-gray-900 text-white">
                &copy; 2024 Madhyam. All rights reserved.
            </footer>
        </div>
    );
}
