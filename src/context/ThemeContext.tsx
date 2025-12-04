import React, { createContext, useContext, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    toggleTheme: () => void;
    getTheme: () => Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Initialize theme on mount
    useEffect(() => {
        const stored = localStorage.getItem('theme');
        const initialTheme = (stored === 'light' || stored === 'dark')
            ? stored
            : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

        const root = document.documentElement;
        if (initialTheme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', initialTheme);
    }, []);

    const getTheme = (): Theme => {
        return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    };

    const toggleTheme = () => {
        const root = document.documentElement;
        const currentTheme = getTheme();
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        // Instant DOM update
        if (newTheme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        localStorage.setItem('theme', newTheme);

        // Force re-render of components using this context
        window.dispatchEvent(new Event('theme-changed'));
    };

    return (
        <ThemeContext.Provider value={{ toggleTheme, getTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return context;
};
