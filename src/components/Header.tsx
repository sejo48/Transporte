import React from 'react';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-500 dark:text-blue-400">Salidas</h1>
        <ThemeToggle />
      </div>
      <img 
        src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEim7dN655q4xWgS-Y5SzI94ZaB35LX6DOSVVJ-FirzuMx_br9n3iOL95F7qBA4c7XdmFhG7QxRQddznSETleVxYo8W6RC6GOifKOgv4iDxlnbx8nrQCgJ2iapGF7Tl-LM-AtjIo_TnLdlbQkI_eqUp0zvgQl2NOQmnLQEoQWm6lCUUvzoGUGPfo-rQuUz8/s320/Gemini_Generated_Image_cs35jgcs35jgcs35.jpeg" 
        className="w-80 h-auto max-w-full block mx-auto mb-4 rounded-lg object-cover" 
        alt="Salidas Grupo"
      />
    </div>
  );
};

export default Header;