import React, { useState, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch if used in SSR contexts, though basic SPA is fine.
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Cycle: Light -> Dark -> System -> Light
    const cycleTheme = () => {
        if (theme === 'light') setTheme('dark');
        else if (theme === 'dark') setTheme('system');
        else setTheme('light');
    };

    return (
        <button
            onClick={cycleTheme}
            className="relative flex items-center justify-center w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors focus:outline-none group overflow-hidden"
            aria-label="Toggle theme"
            title={`Current theme: ${theme.charAt(0).toUpperCase() + theme.slice(1)}`}
        >
            <div className="relative w-6 h-6">
                {/* Sun Icon */}
                <span
                    className={`material-symbols-outlined absolute inset-0 text-[#fbbf24] transform transition-all duration-500 ease-out fill-current
            ${theme === 'light' ? 'rotate-0 opacity-100 scale-100' : 'rotate-90 opacity-0 scale-50'}
          `}
                >
                    light_mode
                </span>

                {/* Moon Icon */}
                <span
                    className={`material-symbols-outlined absolute inset-0 text-[#8b5cf6] dark:text-[#a78bfa] transform transition-all duration-500 ease-out fill-current
            ${theme === 'dark' ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-50'}
          `}
                >
                    dark_mode
                </span>

                {/* System Icon */}
                <span
                    className={`material-symbols-outlined absolute inset-0 text-stone-500 dark:text-stone-400 transform transition-all duration-500 ease-out
            ${theme === 'system' ? 'rotate-0 opacity-100 scale-100' : 'rotate-180 opacity-0 scale-50'}
          `}
                >
                    brightness_auto
                </span>
            </div>
        </button>
    );
}
