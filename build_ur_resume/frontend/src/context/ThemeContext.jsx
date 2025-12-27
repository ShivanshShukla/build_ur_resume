import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(
        () => localStorage.getItem('theme') || 'system'
    );

    useEffect(() => {
        const root = window.document.documentElement;
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const removeTheme = () => {
            root.classList.remove('dark');
            root.classList.remove('light');
        };

        const applyTheme = () => {
            removeTheme();
            if (theme === 'dark') {
                root.classList.add('dark');
            } else if (theme === 'light') {
                // optionally add 'light' class
                root.classList.add('light');
            } else {
                // System
                if (mediaQuery.matches) {
                    root.classList.add('dark');
                }
            }
        };

        applyTheme();
        localStorage.setItem('theme', theme);

        // Listen for system changes if mode is system
        if (theme === 'system') {
            mediaQuery.addEventListener('change', applyTheme);
            return () => mediaQuery.removeEventListener('change', applyTheme);
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
