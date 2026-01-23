import { motion } from 'framer-motion';
import ProjectCard from './Projects/ProjectCard';

const Projects = () => {
    const projects = [
        {
            title: 'CodePro – AI GitHub PR Reviewer',
            description:
                'Built an AI-powered GitHub PR reviewer SaaS automating code analysis for bugs, security vulnerabilities, and code quality. Features GitHub/Google OAuth, webhook-triggered reviews, real-time WebSocket updates, in-app notifications, and Stripe subscription billing with scalable Redis background processing.',
            tech: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Redis', 'Clerk', 'Stripe', 'Docker'],
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
            github: 'https://github.com/kumbharkunal',
            live: 'https://codeproapp.online',
        },
        {
            title: 'ZoomWheels – Car Dealership Platform',
            description:
                'Built a full-featured car dealership platform with admin dashboard, seller portal, and role-based access control. Implemented vehicle listing, test drive booking, customer enquiries with validated forms and SMTP email notifications.',
            tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Shadcn UI', 'Firebase'],
            image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop',
            github: 'https://github.com/kumbharkunal',
            live: 'https://zoom-wheels.web.app',
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
