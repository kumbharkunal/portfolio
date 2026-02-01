import { memo } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

interface ProjectCardProps {
    title: string;
    description: string;
    tech: string[];
    image: string;
    live?: string;
    index: number;
}

const ProjectCard = memo(({ title, description, tech, image, live, index }: ProjectCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
        >
            <Tilt
                tiltMaxAngleX={15}
                tiltMaxAngleY={15}
                scale={1.05}
                transitionSpeed={400}
                glareEnable={false}
            >
                <div className="glass-card p-6 h-full hover:shadow-2xl transition-shadow duration-300 flex flex-col">
                    <div className="relative overflow-hidden rounded-xl mb-6 h-48 group shrink-0">
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                            decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <h3 className="text-2xl font-sora font-bold mb-3 gradient-text shrink-0">
                        {title}
                    </h3>

                    {/* Flex-grow container for description and tech to push button to bottom */}
                    <div className="flex flex-col flex-grow">
                        <p className="text-light-subtle-text dark:text-dark-subtle-text mb-4 leading-relaxed">
                            {description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {tech.map((t) => (
                                <span
                                    key={t}
                                    className="px-3 py-1 text-sm rounded-full bg-light-primary/10 dark:bg-dark-primary/10 text-light-primary dark:text-dark-primary font-medium"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    {live && (
                        <motion.a
                            href={live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full btn-primary text-center group mt-auto shrink-0"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span>View Live Demo</span>
                            <svg
                                className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </motion.a>
                    )}
                </div>
            </Tilt>
        </motion.div>
    );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
