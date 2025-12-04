import { memo } from 'react';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';

const SkillsMarquee = memo(() => {
    // Using skill icons from skillicons.dev CDN
    const skills = [
        'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Redux',
        'TailwindCSS', 'Bootstrap', 'MaterialUI', 'Vite', 'Jest',
        'NodeJS', 'ExpressJS', 'Redis', 'MongoDB', 'Supabase',
        'Firebase', 'Docker', 'GitHub', 'Cloudflare', 'Nginx', 'Zod',
    ];

    const halfLength = Math.ceil(skills.length / 2);
    const row1 = skills.slice(0, halfLength);
    const row2 = skills.slice(halfLength);

    // Custom local icons for skills not available on skillicons.dev
    const customIcons: Record<string, string> = {
        'Zod': '/logos/zod.svg',
    };

    const getIconUrl = (skill: string) => {
        // Check if skill has a custom local icon
        if (customIcons[skill]) {
            return customIcons[skill];
        }
        // Otherwise use skillicons.dev CDN
        return `https://skillicons.dev/icons?i=${skill.toLowerCase()}`;
    };

    return (
        <section id="skills" className="section-padding bg-light-surface dark:bg-dark-bg">
            <div className="container-wide">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-sora font-bold mb-4">
                        <span className="gradient-text">Skills & Technologies</span>
                    </h2>
                    <p className="text-light-subtle-text dark:text-dark-subtle-text text-lg max-w-2xl mx-auto">
                        Technologies I work with to build modern, scalable applications
                    </p>
                </motion.div>

                <div className="space-y-8">
                    {/* First Row - Left to Right */}
                    <Marquee gradient={false} speed={50} pauseOnHover>
                        {row1.map((skill) => (
                            <div
                                key={skill}
                                className="mx-4 flex flex-col items-center gap-3 p-6 glass-card rounded-xl hover:scale-110 transition-transform duration-300 min-w-[120px]"
                            >
                                <img
                                    src={getIconUrl(skill)}
                                    alt={skill}
                                    className="w-12 h-12 object-contain"
                                    loading="lazy"
                                />
                                <span className="text-sm font-medium text-light-text dark:text-dark-text whitespace-nowrap">
                                    {skill}
                                </span>
                            </div>
                        ))}
                    </Marquee>

                    {/* Second Row - Right to Left */}
                    <Marquee gradient={false} speed={50} direction="right" pauseOnHover>
                        {row2.map((skill) => (
                            <div
                                key={skill}
                                className="mx-4 flex flex-col items-center gap-3 p-6 glass-card rounded-xl hover:scale-110 transition-transform duration-300 min-w-[120px]"
                            >
                                <img
                                    src={getIconUrl(skill)}
                                    alt={skill}
                                    className="w-12 h-12 object-contain"
                                    loading="lazy"
                                />
                                <span className="text-sm font-medium text-light-text dark:text-dark-text whitespace-nowrap">
                                    {skill}
                                </span>
                            </div>
                        ))}
                    </Marquee>
                </div>
            </div>
        </section>
    );
});

SkillsMarquee.displayName = 'SkillsMarquee';

export default SkillsMarquee;
