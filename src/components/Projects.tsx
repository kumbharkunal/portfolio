import { motion } from 'framer-motion';
import ProjectCard from './Projects/ProjectCard';

const Projects = () => {
    const projects = [
        {
            title: 'CodePro – AI GitHub PR Reviewer',
            description:
                'Built an AI-powered GitHub PR reviewer SaaS automating code analysis for bugs, security vulnerabilities, and code quality. Features GitHub/Google OAuth, webhook-triggered reviews, real-time WebSocket updates, in-app notifications, and Stripe subscription billing with Redis caching for scalable backend performance.',
            tech: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Redis', 'Clerk', 'Stripe', 'Docker'],
            image: '/codepro-thumbnail.png',
            live: 'https://codeproapp.online',
        },
        {
            title: 'ZoomWheels – Car Dealership Platform',
            description:
                'Built a full-featured car dealership platform with admin dashboard, seller portal, and role-based access control. Implemented vehicle listing, test drive booking, customer enquiries with validated forms and SMTP email notifications. Optimized for fast performance with lazy loading and efficient state management.',
            tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Shadcn UI', 'Firebase'],
            image: '/zoomwheels-thumbnail.png',
            live: 'https://zoom-wheels.web.app',
        },
        {
            title: 'SilverFoil – Food Delivery App',
            description:
                'Built a live food delivery application with order tracking & payment integration. Developed admin dashboards for restaurant management, menu CRUD operations, and order analytics. Implemented responsive UI using Tailwind CSS and optimized performance for mobile devices.',
            tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
            image: '/silverfoil-thumbnail.png',
            live: 'https://silverfoil.napps.in',
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
                        <ProjectCard
                            key={project.title}
                            {...project}
                            index={index}
                            className={index === 2 ? "md:col-span-2 md:mx-auto md:w-full md:max-w-xl" : ""}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
