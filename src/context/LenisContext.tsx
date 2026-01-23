import React, { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';

interface LenisContextType {
    lenis: Lenis | null;
}

const LenisContext = createContext<LenisContextType | undefined>(undefined);

export const LenisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [lenis, setLenis] = useState<Lenis | null>(null);

    useEffect(() => {
        // Check if device is touch-based (mobile/tablet)
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isSmallScreen = window.innerWidth < 1024;

        // Skip Lenis on touch/mobile devices - use native scroll which is smoother
        if (isTouchDevice || isSmallScreen) {
            return;
        }

        const newLenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            infinite: false,
        });

        setLenis(newLenis);

        let rafId: number;
        function raf(time: number) {
            newLenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            newLenis.destroy();
            setLenis(null);
        };
    }, []);

    return (
        <LenisContext.Provider value={{ lenis }}>
            {children}
        </LenisContext.Provider>
    );
};

export const useLenis = () => {
    const context = useContext(LenisContext);
    if (context === undefined) {
        throw new Error('useLenis must be used within a LenisProvider');
    }
    return context;
};
