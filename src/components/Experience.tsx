import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Experience = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });



    const experience = [
        {
            role: 'Programmer Analyst',
            company: 'Napps',
            period: 'Nov 2025 – Present',
            description: [
                'Developing production-grade MERN stack applications with focus on scalability and performance optimization.',
                'Architecting RESTful APIs, third-party API integrations, and optimizing MongoDB queries for efficiency.',
                'Leading code reviews, mentoring intern developers, and ensuring best practices in full-stack development.',
            ],
        },
        {
            role: 'Programmer Analyst Trainee',
            company: 'Napps',
            period: 'Nov 2024 – Oct 2025',
            description: [
                'Built SilverFoil (silverfoil.napps.in) – live food delivery app with order tracking & payment integration.',
                'Developed admin dashboard for restaurant management, menu CRUD operations, and order analytics.',
                'Integrated responsive UI with Tailwind CSS and optimized performance for mobile devices.',
            ],
        },
        {
            role: 'Full Stack Developer Intern',
            company: 'Napps',
            period: 'Aug 2024 – Oct 2024',
            description: [
                'Built responsive web apps using React.js, Node.js, Express.js, MongoDB.',
                'Assisted in API development, database schema design, and deployment.',
                'Collaborated with senior developers to implement real-world features.',
            ],
        },
        {
            role: 'Web Developer Intern',
            company: 'Vocabulix',
            period: 'Mar 2023 – Apr 2023',
            description: [
                'Built dynamic, responsive web interfaces using HTML, CSS, and JavaScript, boosting customer engagement by 25%.',
                'Enhanced UI/UX across client projects, reducing complaints by 30% and improving user retention by 20%.',
            ],
        },
    ];

    return (
        <section id="experience" className="section-padding bg-light-surface dark:bg-dark-bg relative">
            <div className="container-wide relative z-10" ref={containerRef}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 md:pl-20"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-sora font-bold mb-4 tracking-wider uppercase">
                        Experience
                    </h2>
                    <p className="text-light-subtle-text dark:text-dark-subtle-text text-lg max-w-2xl">
                        My professional journey and career milestones
                    </p>
                </motion.div>

                <div className="relative pl-12 md:pl-20">
                    {/* Premium Timeline Container */}
                    <div className="absolute left-[13px] md:left-[35px] top-0 bottom-0 w-[4px] bg-light-primary/10 dark:bg-dark-primary/10 rounded-full overflow-hidden">
                        {/* Animated Gradient Fill */}
                        <motion.div
                            style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                            className="w-full bg-gradient-to-b from-light-primary via-light-accent to-light-primary dark:from-dark-primary dark:via-dark-accent dark:to-dark-primary shadow-[0_0_20px_rgba(var(--color-primary),0.5)]"
                        />
                    </div>

                    {/* Glowing Traveler (The "Wheel") */}
                    <motion.div
                        className="absolute left-[5px] md:left-[27px] z-20"
                        style={{
                            top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
                            opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
                        }}
                    >
                        <div className="relative w-5 h-5 md:w-5 md:h-5">
                            {/* Core Core */}
                            <div className="absolute inset-0 bg-light-bg dark:bg-dark-bg rounded-full border-2 border-light-primary dark:border-dark-primary z-10" />
                            {/* Spinning Ring */}
                            <div className="absolute -inset-2 border border-light-primary/50 dark:border-dark-primary/50 rounded-full border-t-transparent animate-spin" />
                            {/* Glowing Aura */}
                            <div className="absolute -inset-4 bg-light-primary/30 dark:bg-dark-primary/30 rounded-full blur-md animate-pulse" />
                        </div>
                    </motion.div>

                    <div className="space-y-16">
                        {experience.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative group"
                            >
                                {/* Connection Line to Timeline */}
                                <div className="absolute top-8 -left-[34px] md:-left-[45px] w-8 md:w-16 h-[2px] bg-gradient-to-r from-light-primary/20 to-transparent dark:from-dark-primary/20" />

                                {/* Timeline Node Point */}
                                <div className="absolute top-[26px] -left-[40px] md:-left-[48px] w-3 h-3 md:w-4 md:h-4 rounded-full bg-light-bg dark:bg-dark-bg border-2 border-light-subtle-text/30 dark:border-dark-subtle-text/30 group-hover:border-light-primary dark:group-hover:border-dark-primary group-hover:scale-125 transition-all duration-300 z-10" />

                                <div className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-light-primary/5 dark:hover:shadow-dark-primary/5 hover:-translate-y-1">
                                    {/* Card Hover Glow */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-light-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                    <div className="relative z-10">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                                            <h3 className="text-xl md:text-2xl font-sora font-bold text-light-text dark:text-dark-text group-hover:text-light-primary dark:group-hover:text-dark-primary transition-colors">
                                                {exp.role}
                                            </h3>
                                            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-light-surface dark:bg-dark-surface border border-light-card dark:border-dark-card text-light-subtle-text dark:text-dark-subtle-text whitespace-nowrap">
                                                {exp.period}
                                            </span>
                                        </div>

                                        <div className="mb-4">
                                            <span className="text-light-primary dark:text-dark-primary font-bold text-sm tracking-wider uppercase flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                                {exp.company}
                                            </span>
                                        </div>

                                        <ul className="space-y-3 text-light-subtle-text dark:text-dark-subtle-text">
                                            {exp.description.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm md:text-base leading-relaxed">
                                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-light-accent dark:bg-dark-accent shrink-0 opacity-70" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
