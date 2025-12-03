import { motion } from 'framer-motion';
import ProjectCard from './Projects/ProjectCard';

const Projects = () => {
    const projects = [
        {
            title: 'AI-Powered GitHub PR Reviewer',
            description:
                'Intelligent code review automation tool powered by AI. Analyzes pull requests, provides detailed feedback, suggests improvements, and helps maintain code quality standards.',
            tech: ['React', 'Node.js', 'Tailwind', 'OpenAI', 'Gemini AI', 'TypeScript'],
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
            github: 'https://github.com/kumbharkunal',
            live: '#',
        },
        {
            title: 'Hotel Booking Application',
            description:
                'Full-featured hotel booking platform with real-time availability, secure payments via Stripe, user authentication with Clerk, and responsive design for seamless mobile experience.',
            tech: ['MERN', 'Clerk', 'Stripe', 'Tailwind', 'Redux', 'TypeScript'],
            image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop',
            github: 'https://github.com/kumbharkunal',
            live: '#',
        },
    ];

    return (
        <section id="projects" className="section-padding">
            <div className="container-wide">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-sora font-bold mb-4">
                        <span className="gradient-text">Featured Projects</span>
                    </h2>
                    <p className="text-light-subtle-text dark:text-dark-subtle-text text-lg max-w-2xl mx-auto">
                        Some of my recent work showcasing my skills in full-stack development
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.title} {...project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
