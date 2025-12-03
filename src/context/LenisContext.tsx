import React, { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';

interface LenisContextType {
    lenis: Lenis | null;
}

const LenisContext = createContext<LenisContextType | undefined>(undefined);

export const LenisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [lenis, setLenis] = useState<Lenis | null>(null);

    useEffect(() => {
        const newLenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        setLenis(newLenis);

        function raf(time: number) {
            newLenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
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
