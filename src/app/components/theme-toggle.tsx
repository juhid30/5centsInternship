    "use client";
    import { useTheme } from "next-themes";
    import { useEffect, useState } from "react";
    import { Sun, Moon } from "lucide-react";
    import { motion } from "framer-motion";

    export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white dark:bg-gray-800/30 shadow-lg hover:shadow-xl transition-shadow duration-200"
        aria-label="Toggle theme"
        >
        {theme === "dark" ? (
            <Sun className="w-6 h-6 text-yellow-500" />
        ) : (
            <Moon className="w-6 h-6  dark:text-white" />
        )}
        </motion.button>
    );
    }
