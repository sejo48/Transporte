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
        src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjt4HZM-U3T8OmbhBk3HF85eWcU4SSPOn_THPrdkxuq1x4mIRYAtqQrBoZslObm-bTBKzyGUYgUuFrXblo4XuckRRcBJCvGamlHdkjZ55rSNZv7BjOWBJlDwhGRKp54qLZkHJMQ13CQtvHCHxBjM5TB5S5kCv5KfcfWLUuDpHaMNZVSPzI_nAwRWZ_ctDs/s320/ChatGPT%20Image%205%20sept%202026,%2010_17_24.png" 
        className="w-80 h-auto max-w-full block mx-auto mb-4 rounded-lg object-cover" 
        alt="Salidas Grupo"
      />
    </div>
  );
};

export default Header;