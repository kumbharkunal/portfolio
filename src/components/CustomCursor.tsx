import { useEffect } from 'react';

// Extend HTMLElement to include x and y properties for the animation logic
interface CircleElement extends HTMLElement {
    x: number;
    y: number;
}

const CustomCursor = () => {
    useEffect(() => {
        const coords = { x: 0, y: 0 };
        const circles = document.querySelectorAll<CircleElement>('.circle');
        const inputs = document.querySelectorAll('input');
        const textarea = document.querySelectorAll('textarea');
        const buttons = document.querySelectorAll('button');
        const links = document.querySelectorAll('a');

        // Combine all interactive elements
        const fields = [...textarea, ...inputs, ...buttons, ...links];

        const handleMouseOver = () => {
            circles.forEach((circle) => {
                circle.classList.add('circle-thin');
            });
        };

        const handleMouseOut = () => {
            circles.forEach((circle) => {
                circle.classList.remove('circle-thin');
            });
        };

        fields.forEach((el) => {
            el.addEventListener('mouseover', handleMouseOver);
            el.addEventListener('mouseout', handleMouseOut);
        });

        circles.forEach(function (circle) {
            circle.x = 0;
            circle.y = 0;
        });

        const handleMouseMove = (e: MouseEvent) => {
            circles.forEach((circle) => {
                circle.classList.remove('circle-hidden');
            });
            coords.x = e.clientX;
            coords.y = e.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);

        let rafId: number;

        const mainCursor = document.querySelector('.custom-cursor-main') as HTMLElement;

        function animateCircles() {
            let x = coords.x;
            let y = coords.y;

            if (mainCursor) {
                mainCursor.style.left = x + 'px';
                mainCursor.style.top = y + 'px';
            }

            circles.forEach(function (circle, index) {
                circle.style.left = x - 12 + 'px';
                circle.style.top = y - 12 + 'px';
                circle.style.scale = ((circles.length - index) / circles.length) as unknown as string;

                // Hide the first few circles to avoid overlapping with the main cursor
                if (index < 5) {
                    circle.style.opacity = '0';
                } else {
                    circle.style.opacity = '1';
                }

                circle.x = x;
                circle.y = y;

                const nextCircle = circles[index + 1] || circles[0];
                x += (nextCircle.x - x) * 0.35;
                y += (nextCircle.y - y) * 0.35;
            });

            rafId = requestAnimationFrame(animateCircles);
        }

        animateCircles();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(rafId);
            fields.forEach((el) => {
                el.removeEventListener('mouseover', handleMouseOver);
                el.removeEventListener('mouseout', handleMouseOut);
            });
        };
    }, []);

    return (
        <>
            {Array.from({ length: 30 }).map((_, i) => (
                <div
                    key={i}
                    className="circle circle-hidden"
                >
                    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4 4L28 16L16 18L12 28L4 4Z"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M16 18L20 14"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>
            ))}
            <div
                className="custom-cursor-main fixed top-0 left-0 pointer-events-none z-[999999999] -translate-x-1/2 -translate-y-1/2"
                style={{
                    left: 0,
                    top: 0,
                    willChange: 'transform'
                }}
            >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M4 4L28 16L16 18L12 28L4 4Z"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M16 18L20 14"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
        </>
    );
};

export default CustomCursor;
