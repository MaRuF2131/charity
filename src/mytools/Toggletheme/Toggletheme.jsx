// DarkModeToggle.jsx
import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from "react-icons/fa";
import localforage from "localforage";

const DarkModeToggle = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await localforage.getItem('theme');
      const finalTheme = savedTheme || 'light';

      // Apply theme class
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(finalTheme);

      setTheme(finalTheme);
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    // Update DOM
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);

    setTheme(newTheme);
    await localforage.setItem('theme', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-1 rounded-full shadow-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:scale-105 transition-all"
    >
      {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
      <span className="text-sm font-medium">{theme === 'dark' ? 'Light' : 'Dark'}</span>
    </button>
  );
};

export default DarkModeToggle;
