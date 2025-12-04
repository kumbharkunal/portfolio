import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { useLenis } from '../context/LenisContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { toggleTheme, getTheme } = useTheme();
    const [themeIcon, setThemeIcon] = useState(getTheme());
    const { lenis } = useLenis();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Listen for theme changes to update icon
    useEffect(() => {
        const handleThemeChange = () => {
            setThemeIcon(getTheme());
        };
        window.addEventListener('theme-changed', handleThemeChange);
        return () => window.removeEventListener('theme-changed', handleThemeChange);
    }, [getTheme]);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        if (lenis) {
            lenis.scrollTo(target);
        } else {
            const element = document.querySelector(target);
            element?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navLinks = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-light-surface/80 dark:bg-dark-surface/80 backdrop-blur-lg shadow-lg'
                : 'bg-transparent'
                }`}
        >
            <div className="container-wide px-6 py-4 flex items-center justify-between">
                <motion.a
                    href="#about"
                    onClick={(e) => handleNavClick(e, '#about')}
                    className="text-xl md:text-2xl font-sora font-bold gradient-text"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Kunal Kumbhar
                </motion.a>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map((link, index) => (
                        <motion.a
                            key={link}
                            href={`#${link.toLowerCase()}`}
                            onClick={(e) => handleNavClick(e, `#${link.toLowerCase()}`)}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-colors font-medium px-6 py-3 rounded-lg hover:bg-light-primary/5 dark:hover:bg-dark-primary/5 relative after:absolute after:-inset-4 after:content-[''] after:z-10"
                            whileHover={{ y: -2 }}
                        >
                            <span className="relative z-20">{link}</span>
                        </motion.a>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    {/* Theme Toggle - No animations for instant performance */}
                    <button
                        onClick={toggleTheme}
                        className="w-10 h-10 flex items-center justify-center rounded-full glass-card hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 border border-light-text/10 dark:border-dark-text/10 relative after:absolute after:-inset-4 after:content-['']"
                        aria-label="Toggle Theme"
                    >
                        {themeIcon === 'dark' ? (
                            <svg
                                className="w-5 h-5 relative z-10"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="w-5 h-5 relative z-10"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                />
                            </svg>
                        )}
                    </button>

                    {/* Mobile Menu Button */}
                    <motion.button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden w-10 h-10 flex items-center justify-center rounded-full glass-card hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 transition-colors border border-light-text/10 dark:border-dark-text/10 relative after:absolute after:-inset-4 after:content-['']"
                        whileTap={{ scale: 0.9 }}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                            />
                        </svg>
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-light-surface/70 dark:bg-dark-surface/70 backdrop-blur-lg"
                    >
                        <div className="px-6 py-4 space-y-2">
                            {navLinks.map((link) => (
                                <motion.a
                                    key={link}
                                    href={`#${link.toLowerCase()}`}
                                    onClick={(e) => handleNavClick(e, `#${link.toLowerCase()}`)}
                                    className="block text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-colors font-medium py-4 px-4 rounded-lg hover:bg-light-primary/5 dark:hover:bg-dark-primary/5"
                                    whileHover={{ x: 5 }}
                                >
                                    {link}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
