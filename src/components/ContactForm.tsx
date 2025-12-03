import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [isCopied, setIsCopied] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const copyEmail = () => {
        navigator.clipboard.writeText('kumbharkunaldaulat@gmail.com');
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <section id="contact" className="section-padding relative overflow-hidden bg-light-surface dark:bg-dark-bg">
            {/* Background Decorative Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-64 w-96 h-96 bg-light-primary/20 dark:bg-dark-primary/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-light-accent/20 dark:bg-dark-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="container-wide relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 md:mb-20"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-sora font-black mb-6 tracking-tighter relative">
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-light-text/10 to-light-text/5 dark:from-dark-text/10 dark:to-dark-text/5 absolute left-1/2 -translate-x-1/2 -top-8 md:-top-16 w-full select-none pointer-events-none uppercase text-5xl sm:text-6xl md:text-8xl">
                            Contact
                        </span>
                        <span className="gradient-text relative z-10">Get In Touch</span>
                    </h2>
                    <p className="text-light-subtle-text dark:text-dark-subtle-text text-lg md:text-xl max-w-2xl mx-auto font-medium">
                        Let's build something amazing togetherrrrr.
                    </p>
                </motion.div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
                    {/* Contact Info - Spans 2 columns */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-2 space-y-6 md:space-y-8"
                    >
                        <div className="space-y-4 md:space-y-6">
                            <h3 className="text-2xl font-sora font-bold text-light-text dark:text-dark-text">
                                Contact Details
                            </h3>
                            <p className="text-light-subtle-text dark:text-dark-subtle-text leading-relaxed">
                                I'm currently available for freelance work and open to full-time opportunities.
                            </p>
                        </div>

                        <div className="space-y-4 md:space-y-6">
                            <div className="group flex items-center gap-4 md:gap-6 p-3 md:p-4 rounded-2xl hover:bg-light-surface/50 dark:hover:bg-dark-surface/50 transition-colors border border-transparent hover:border-light-primary/10 dark:hover:border-dark-primary/10">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-light-primary/10 to-light-accent/10 dark:from-dark-primary/10 dark:to-dark-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shrink-0">
                                    <svg className="w-5 h-5 md:w-6 md:h-6 text-light-primary dark:text-dark-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-light-subtle-text dark:text-dark-subtle-text uppercase tracking-wider mb-1">Email</p>
                                    <div className="flex items-center gap-2">
                                        <a href="mailto:kumbharkunaldaulat@gmail.com" className="font-medium text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-colors truncate text-sm md:text-base">
                                            kumbharkunaldaulat@gmail.com
                                        </a>
                                        <button
                                            onClick={copyEmail}
                                            className="relative flex items-center gap-2 p-2 hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 rounded-lg transition-colors shrink-0 overflow-visible group cursor-pointer"
                                            title="Copy email address"
                                            aria-label="Copy email address"
                                        >
                                            {/* Invisible hit area extension */}
                                            <span className="absolute -inset-3" aria-hidden="true" />

                                            <AnimatePresence mode="wait" initial={false}>
                                                {isCopied ? (
                                                    <motion.div
                                                        key="check"
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -20 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="flex items-center gap-1.5 relative z-10"
                                                    >
                                                        <span className="text-xs font-bold text-green-500">Copied!</span>
                                                        <svg
                                                            className="w-5 h-5 text-green-500"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </motion.div>
                                                ) : (
                                                    <motion.svg
                                                        key="copy"
                                                        initial={{ scale: 0, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        exit={{ scale: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="w-5 h-5 text-light-subtle-text dark:text-dark-subtle-text group-hover:text-light-primary dark:group-hover:text-dark-primary transition-colors relative z-10"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                    </motion.svg>
                                                )}
                                            </AnimatePresence>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="group flex items-center gap-4 md:gap-6 p-3 md:p-4 rounded-2xl hover:bg-light-surface/50 dark:hover:bg-dark-surface/50 transition-colors border border-transparent hover:border-light-primary/10 dark:hover:border-dark-primary/10">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-light-primary/10 to-light-accent/10 dark:from-dark-primary/10 dark:to-dark-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shrink-0">
                                    <svg className="w-5 h-5 md:w-6 md:h-6 text-light-primary dark:text-dark-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-light-subtle-text dark:text-dark-subtle-text uppercase tracking-wider mb-1">Phone</p>
                                    <p className="font-medium text-light-text dark:text-dark-text text-sm md:text-base">+91 9067878078</p>
                                </div>
                            </div>

                            <div className="group flex items-center gap-4 md:gap-6 p-3 md:p-4 rounded-2xl hover:bg-light-surface/50 dark:hover:bg-dark-surface/50 transition-colors border border-transparent hover:border-light-primary/10 dark:hover:border-dark-primary/10">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-light-primary/10 to-light-accent/10 dark:from-dark-primary/10 dark:to-dark-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shrink-0">
                                    <svg className="w-5 h-5 md:w-6 md:h-6 text-light-primary dark:text-dark-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-light-subtle-text dark:text-dark-subtle-text uppercase tracking-wider mb-1">Location</p>
                                    <p className="font-medium text-light-text dark:text-dark-text text-sm md:text-base">Pune, India</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form - Spans 3 columns */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-3 w-full"
                    >
                        <form onSubmit={handleSubmit} className="glass-card p-6 md:p-10 rounded-3xl space-y-6 md:space-y-8 border border-light-card/50 dark:border-dark-card/50 shadow-2xl shadow-light-primary/5 dark:shadow-dark-primary/5 relative overflow-hidden">
                            {/* Glow effect inside card */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-light-primary/5 dark:bg-dark-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="relative group">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="peer w-full px-0 py-3 bg-transparent border-b-2 border-light-subtle-text/20 dark:border-dark-subtle-text/20 focus:border-light-primary dark:focus:border-dark-primary outline-none transition-colors placeholder-transparent"
                                        placeholder="Name"
                                        required
                                    />
                                    <label
                                        htmlFor="name"
                                        className="absolute left-0 -top-3.5 text-sm text-light-primary dark:text-dark-primary font-medium transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-light-subtle-text dark:peer-placeholder-shown:text-dark-subtle-text peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-light-primary dark:peer-focus:text-dark-primary"
                                    >
                                        Your Name
                                    </label>
                                </div>

                                <div className="relative group">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="peer w-full px-0 py-3 bg-transparent border-b-2 border-light-subtle-text/20 dark:border-dark-subtle-text/20 focus:border-light-primary dark:focus:border-dark-primary outline-none transition-colors placeholder-transparent"
                                        placeholder="Email"
                                        required
                                    />
                                    <label
                                        htmlFor="email"
                                        className="absolute left-0 -top-3.5 text-sm text-light-primary dark:text-dark-primary font-medium transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-light-subtle-text dark:peer-placeholder-shown:text-dark-subtle-text peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-light-primary dark:peer-focus:text-dark-primary"
                                    >
                                        Your Email
                                    </label>
                                </div>
                            </div>

                            <div className="relative group">
                                <textarea
                                    name="message"
                                    id="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className="peer w-full px-0 py-3 bg-transparent border-b-2 border-light-subtle-text/20 dark:border-dark-subtle-text/20 focus:border-light-primary dark:focus:border-dark-primary outline-none transition-colors placeholder-transparent resize-none"
                                    placeholder="Message"
                                    required
                                />
                                <label
                                    htmlFor="message"
                                    className="absolute left-0 -top-3.5 text-sm text-light-primary dark:text-dark-primary font-medium transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-light-subtle-text dark:peer-placeholder-shown:text-dark-subtle-text peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-light-primary dark:peer-focus:text-dark-primary"
                                >
                                    Your Message
                                </label>
                            </div>

                            <div className="pt-4">
                                <motion.button
                                    type="submit"
                                    className="btn-primary w-full flex items-center justify-center gap-3 group"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span>Send Message</span>
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
