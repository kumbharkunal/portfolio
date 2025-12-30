import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Certifications = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const certifications = [
        {
            title: 'Full Stack Developer',
            issuer: 'Apna College',
            date: '2024',
            description: [
                'Mastered the MERN Stack (MongoDB, Express.js, React.js, Node.js) for building scalable web applications.',
                'Gained in-depth knowledge of modern JavaScript (ES6+), DOM manipulation, and asynchronous programming.',
                'Built and deployed full-stack projects implementing RESTful APIs, Authentication (JWT), and Database design.',
                'Learned backend technologies including Node.js runtime environment and Express.js framework.',
                'Developed responsive frontend interfaces using React.js, Hooks, and Redux for state management.',
            ],
        },
    ];

    return (
        <section id="certifications" className="section-padding bg-light-bg dark:bg-dark-bg">
            <div className="container-wide" ref={containerRef}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 pl-0 md:pl-20"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-sora font-bold mb-4 tracking-wider uppercase">
                        Certifications
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

                    {certifications.map((cert, index) => (
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
                                    {cert.title}
                                </h3>
                                <p className="text-light-primary dark:text-dark-primary font-medium tracking-widest uppercase text-sm mb-4">
                                    {cert.issuer} | {cert.date}
                                </p>
                                <ul className="space-y-2 text-light-subtle-text dark:text-dark-subtle-text">
                                    {cert.description.map((item, i) => (
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

export default Certifications;
