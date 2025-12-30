import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { useLenis } from '../context/LenisContext';
import { useMemo } from 'react';

const Hero = () => {
    const { lenis } = useLenis();

    // Memoize random positions so they don't change on re-renders
    const floatingShapePositions = useMemo(() =>
        [...Array(5)].map(() => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
        })), []
    );

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
        e.preventDefault();
        if (lenis) {
            lenis.scrollTo(target);
        } else {
            const element = document.querySelector(target);
            element?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            id="about"
            className="relative min-h-screen flex items-center justify-center overflow-hidden section-padding pt-32"
        >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-light-primary/5 via-light-accent/5 to-transparent opacity-100 dark:opacity-0 transition-opacity duration-500" />

            {/* Floating shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-light-primary/10 to-light-accent/10 opacity-100 dark:opacity-0 blur-3xl transition-opacity duration-500"
                        style={floatingShapePositions[i]}
                        animate={{
                            y: [0, -30, 0],
                            x: [0, 20, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 5 + i * 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>

            <div className="container-wide relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="space-y-6"
                    >
                        <motion.h1
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sora font-bold leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Hi, I'm{' '}
                            <span className="gradient-text">Kunal Kumbhar</span>
                        </motion.h1>

                        <motion.div
                            className="text-2xl md:text-3xl font-sora font-medium text-light-subtle-text dark:text-dark-subtle-text"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Typewriter
                                words={[
                                    'Full Stack Developer',
                                    'React Specialist',
                                    'Node.js Expert',
                                    'MERN Stack Developer',
                                    'UI/UX Enthusiast',
                                ]}
                                loop={0}
                                cursor
                                cursorStyle="|"
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={1500}
                            />
                        </motion.div>

                        <motion.p
                            className="text-lg text-light-subtle-text dark:text-dark-subtle-text max-w-xl leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            I am a Full Stack Developer passionate about building fast,
                            scalable, and highly interactive web applications. I specialize in
                            React, Node.js, modern UI engineering, animation-rich interfaces,
                            and end-to-end product development.
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap gap-4 justify-center md:justify-start"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            <motion.a
                                href="#contact"
                                onClick={(e) => handleNavClick(e, '#contact')}
                                className="btn-primary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>Get In Touch</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </motion.a>
                            <motion.a
                                href="#projects"
                                onClick={(e) => handleNavClick(e, '#projects')}
                                className="btn-outline"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>View Projects</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </motion.a>
                            <motion.a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-glass"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>Resume</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </motion.a>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            className="flex gap-4 pt-4 justify-center md:justify-start"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            {[
                                { name: 'GitHub', url: 'https://github.com/kumbharkunal', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
                                { name: 'LinkedIn', url: 'https://www.linkedin.com/in/kumbharkunal/', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                            ].map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 glass-card rounded-full hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 transition-colors"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <svg
                                        className="w-5 h-5 fill-current"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d={social.icon} />
                                    </svg>
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Profile Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative flex justify-center items-center"
                    >
                        <div className="relative w-64 h-64 md:w-80 md:h-80">
                            {/* Outer rotating glow ring */}
                            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-teal-500 via-cyan-400 to-emerald-500 opacity-40 blur-2xl animate-[spin_8s_linear_infinite]" />

                            {/* Pulsing glow layers */}
                            <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-teal-400/60 to-cyan-500/60 blur-xl animate-[pulse_3s_ease-in-out_infinite]" />
                            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-emerald-400/40 to-teal-400/40 blur-lg animate-[pulse_4s_ease-in-out_infinite_0.5s]" />

                            {/* Border gradient ring */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-400 via-cyan-400 to-emerald-500 p-1">
                                <div className="w-full h-full rounded-full bg-light-bg dark:bg-dark-bg" />
                            </div>

                            {/* Image container */}
                            <div className="absolute inset-1 rounded-full overflow-hidden shadow-2xl">
                                <img
                                    src="/profile.jpeg"
                                    alt="Kunal Kumbhar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
