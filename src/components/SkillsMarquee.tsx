import { memo, useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
                    {/* First Row - Left to Right with drag */}
                    <DraggableMarquee skills={row1} direction="left" getIconUrl={getIconUrl} />

                    {/* Second Row - Right to Left with drag */}
                    <DraggableMarquee skills={row2} direction="right" getIconUrl={getIconUrl} />
                </div>
            </div>
        </section>
    );
});

// Draggable Marquee Component
interface DraggableMarqueeProps {
    skills: string[];
    direction: 'left' | 'right';
    getIconUrl: (skill: string) => string;
}

const DraggableMarquee = memo<DraggableMarqueeProps>(({ skills, direction, getIconUrl }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const animationRef = useRef<number | null>(null);

    // Duplicate skills for infinite scroll effect
    const duplicatedSkills = [...skills, ...skills, ...skills];

    // Auto-scroll animation
    useEffect(() => {
        const scroll = scrollRef.current;
        if (!scroll) return;

        const animate = () => {
            if (!isDragging) {
                const speed = 0.3; // Reduced from 0.5 for smoother scrolling
                const currentScroll = scroll.scrollLeft;
                const maxScroll = scroll.scrollWidth / 3; // Since we have 3 copies

                if (direction === 'left') {
                    scroll.scrollLeft = currentScroll + speed;
                    // Reset to middle copy when reaching the end
                    if (currentScroll >= maxScroll * 2) {
                        scroll.scrollLeft = maxScroll;
                    }
                } else {
                    scroll.scrollLeft = currentScroll - speed;
                    // Reset to middle copy when reaching the start
                    if (currentScroll <= 0) {
                        scroll.scrollLeft = maxScroll;
                    }
                }
            }
            animationRef.current = requestAnimationFrame(animate);
        };

        // Only set initial position if not already set
        if (scroll.scrollLeft === 0) {
            scroll.scrollLeft = scroll.scrollWidth / 3;
        }
        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isDragging, direction]);

    // Mouse drag handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
        setScrollLeft(scrollRef.current?.scrollLeft || 0);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - (scrollRef.current.offsetLeft || 0);
        const walk = (x - startX) * 1; // Reduced from 2 for smoother scrolling
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            setIsDragging(false);
        }
    };

    // Touch drag handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        setStartX(e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0));
        setScrollLeft(scrollRef.current?.scrollLeft || 0);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging || !scrollRef.current) return;
        const x = e.touches[0].pageX - (scrollRef.current.offsetLeft || 0);
        const walk = (x - startX) * 1; // Reduced from 2 for smoother scrolling
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    return (
        <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
            }}
        >
            {duplicatedSkills.map((skill, index) => (
                <div
                    key={`${skill}-${index}`}
                    className="mx-4 flex flex-col items-center gap-3 p-6 glass-card rounded-xl hover:scale-110 transition-transform duration-300 min-w-[120px] flex-shrink-0"
                >
                    <img
                        src={getIconUrl(skill)}
                        alt={skill}
                        className="w-12 h-12 object-contain pointer-events-none"
                        loading="lazy"
                        draggable="false"
                    />
                    <span className="text-sm font-medium text-light-text dark:text-dark-text whitespace-nowrap">
                        {skill}
                    </span>
                </div>
            ))}
        </div>
    );
});

DraggableMarquee.displayName = 'DraggableMarquee';
SkillsMarquee.displayName = 'SkillsMarquee';

export default SkillsMarquee;
