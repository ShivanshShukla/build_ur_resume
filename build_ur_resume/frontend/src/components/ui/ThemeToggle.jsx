import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
    // Intelligent Cycle: System -> (Opposite of System) -> ...
    const cycleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else if (theme === 'dark') {
            setTheme('system');
        } else {
            setTheme('light');
        }
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
                <motion.span
                    initial={false}
                    animate={{
                        rotate: theme === 'light' ? 0 : 90,
                        scale: theme === 'light' ? 1 : 0.5,
                        opacity: theme === 'light' ? 1 : 0
                    }}
                    transition={{ duration: 0.2 }}
                    className="material-symbols-outlined absolute inset-0 text-[#fbbf24] fill-current"
                >
                    light_mode
                </motion.span>

                {/* Moon Icon */}
                <motion.span
                    initial={false}
                    animate={{
                        rotate: theme === 'dark' ? 0 : -90,
                        scale: theme === 'dark' ? 1 : 0.5,
                        opacity: theme === 'dark' ? 1 : 0
                    }}
                    transition={{ duration: 0.2 }}
                    className="material-symbols-outlined absolute inset-0 text-[#8b5cf6] dark:text-[#a78bfa] fill-current"
                >
                    dark_mode
                </motion.span>

                {/* System Icon */}
                <motion.span
                    initial={false}
                    animate={{
                        rotate: theme === 'system' ? 0 : 180,
                        scale: theme === 'system' ? 1 : 0.5,
                        opacity: theme === 'system' ? 1 : 0
                    }}
                    transition={{ duration: 0.2 }}
                    className="material-symbols-outlined absolute inset-0 text-stone-500 dark:text-stone-400"
                >
                    brightness_auto
                </motion.span>
            </div>
        </button>
    );
}
