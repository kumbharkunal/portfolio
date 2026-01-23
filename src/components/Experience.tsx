import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Experience = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

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
        <section id="experience" className="section-padding bg-light-surface dark:bg-dark-bg">
            <div className="container-wide" ref={containerRef}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 pl-0 md:pl-20"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-sora font-bold mb-4 tracking-wider uppercase">
                        Experience
                    </h2>
                </motion.div>

                <div className="relative pl-8 md:pl-20">
                    {/* Timeline line background */}
                    <div className="absolute left-[13px] md:left-[35px] top-2 bottom-0 w-[2px] bg-light-primary/20 dark:bg-dark-primary/20" />

                    {/* Animated Timeline line */}
                    <motion.div
                        style={{ scaleY, originY: 0 }}
                        className="absolute left-[13px] md:left-[35px] top-2 bottom-0 w-[2px] bg-light-primary dark:bg-dark-primary"
                    />

                    {experience.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="relative mb-12 last:mb-0"
                        >
                            {/* Timeline dot */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.2 + 0.2 }}
                                className="absolute -left-[27px] md:-left-[61px] top-[6px] w-[14px] h-[14px] rounded-full border-2 border-light-primary dark:border-dark-primary bg-light-bg dark:bg-dark-bg z-10"
                            />

                            <div className="relative">
                                <h3 className="text-2xl font-sora font-normal mb-1 text-light-text dark:text-dark-text">
                                    {exp.role}
                                </h3>
                                <p className="text-light-primary dark:text-dark-primary font-medium tracking-widest uppercase text-sm mb-4">
                                    {exp.company} | {exp.period}
                                </p>
                                <ul className="space-y-2 text-light-subtle-text dark:text-dark-subtle-text">
                                    {exp.description.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-light-subtle-text dark:bg-dark-subtle-text shrink-0" />
                                            <span className="leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
