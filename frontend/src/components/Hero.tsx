import { motion, useScroll, useTransform } from 'framer-motion';
import Button from './Button';

export const CreativeHero = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, -200]);
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
                    <h1 className="text-6xl font-bold mb-8">Welcome to Madhyam</h1>
                    <p className="text-xl text-gray-600 mb-16">
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

export const FloatingShapes = () => {
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
