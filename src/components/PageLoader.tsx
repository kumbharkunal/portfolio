import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface PageLoaderProps {
    onLoadingComplete: () => void;
}

const PageLoader = ({ onLoadingComplete }: PageLoaderProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Faster, smoother loading simulation
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Smooth increment
                const increment = Math.max(1, Math.random() * 8);
                return Math.min(prev + increment, 100);
            });
        }, 50);

        // Minimum loading time
        const timer = setTimeout(() => {
            setIsLoading(false);
            setTimeout(onLoadingComplete, 800);
        }, 1500);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [onLoadingComplete]);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-light-bg dark:bg-dark-bg"
                    exit={{
                        y: -window.innerHeight,
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                    }}
                >
                    {/* Main Logo Container */}
                    <div className="relative w-full max-w-2xl h-auto mb-8 px-4">
                        <svg viewBox="0 0 600 140" className="w-full h-full">
                            <defs>
                                {/* Gradient for the liquid fill */}
                                <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="var(--color-accent)" />
                                    <stop offset="100%" stopColor="var(--color-primary)" />
                                </linearGradient>

                                {/* Mask for the liquid effect */}
                                <mask id="liquidMask">
                                    <text
                                        x="50%"
                                        y="50%"
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        fontSize="120"
                                        fontWeight="900"
                                        fontFamily="Sora, sans-serif"
                                        fill="white"
                                        letterSpacing="4"
                                    >
                                        KUNAL
                                    </text>
                                </mask>
                            </defs>

                            {/* Background Track (Empty Text) */}
                            <text
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize="120"
                                fontWeight="900"
                                fontFamily="Sora, sans-serif"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                letterSpacing="4"
                                className="text-light-subtle-text/20 dark:text-dark-subtle-text/20"
                            >
                                KUNAL
                            </text>

                            {/* The Liquid Fill */}
                            <g mask="url(#liquidMask)">
                                <motion.rect
                                    x="0"
                                    y="0"
                                    width="600"
                                    height="140"
                                    fill="url(#liquidGradient)"
                                    initial={{ y: 140 }}
                                    animate={{ y: 140 - (140 * (progress / 100)) }}
                                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
                                />

                                {/* Liquid Surface Line (optional detail) */}
                                <motion.rect
                                    x="0"
                                    y="-2"
                                    width="600"
                                    height="4"
                                    fill="white"
                                    opacity="0.5"
                                    initial={{ y: 140 }}
                                    animate={{ y: 140 - (140 * (progress / 100)) }}
                                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
                                />
                            </g>
                        </svg>
                    </div>

                    {/* Modern Minimal Counter */}
                    <div className="overflow-hidden h-12 flex items-center">
                        <motion.span
                            className="text-4xl font-sora font-bold tracking-tighter"
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="gradient-text">{Math.round(progress)}</span>
                            <span className="text-lg align-top ml-1 text-light-subtle-text dark:text-dark-subtle-text">%</span>
                        </motion.span>
                    </div>


                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PageLoader;
