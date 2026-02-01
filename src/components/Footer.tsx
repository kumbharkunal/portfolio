import { motion } from 'framer-motion';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-light-surface dark:bg-dark-surface border-t border-light-card dark:border-dark-card">
            <div className="container-wide px-6 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center md:text-left"
                    >
                        <h3 className="text-2xl font-sora font-bold gradient-text mb-2">
                            Kunal Kumbhar
                        </h3>
                        <p className="text-light-subtle-text dark:text-dark-subtle-text text-sm">
                            Full Stack Developer • React • Node.js • MERN
                        </p>
                    </motion.div>

                    {/* Social Links with Brand Colors */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="flex gap-4"
                    >
                        {/* GitHub */}
                        <motion.a
                            href="https://github.com/kumbharkunal"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 glass-card rounded-full hover:bg-[#24292e]/10 dark:hover:bg-white/10 transition-all duration-300 group"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label="GitHub"
                        >
                            <svg className="w-6 h-6 fill-[#24292e] dark:fill-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </motion.a>

                        {/* LinkedIn */}
                        <motion.a
                            href="https://www.linkedin.com/in/kumbharkunal/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 glass-card rounded-full hover:bg-[#0A66C2]/10 transition-all duration-300 group"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label="LinkedIn"
                        >
                            <svg className="w-6 h-6 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                <rect width="24" height="24" rx="2" fill="#0A66C2" />
                                <path fill="white" d="M6.94 5a1.685 1.685 0 1 0 0 3.37 1.685 1.685 0 0 0 0-3.37zM5.5 9.72h2.88v9.28H5.5V9.72zm5.23 0h2.76v1.27c.39-.75 1.34-1.53 2.75-1.53 2.94 0 3.48 1.94 3.48 4.46v5.08h-2.88v-4.5c0-1.07-.02-2.45-1.49-2.45-1.49 0-1.72 1.17-1.72 2.37v4.58h-2.9V9.72z" />
                            </svg>
                        </motion.a>

                        {/* Email */}
                        <motion.a
                            href="mailto:kumbharkunaldaulat@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 glass-card rounded-full hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 transition-all duration-300 group"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Email"
                        >
                            <svg className="w-6 h-6 text-light-primary dark:text-dark-primary group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </motion.a>
                    </motion.div>
                </div>

                {/* Copyright */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-center mt-8 pt-8 border-t border-light-card dark:border-dark-card"
                >
                    <p className="text-light-subtle-text dark:text-dark-subtle-text text-sm">
                        © {currentYear} Kunal Kumbhar. All rights reserved.
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
