import React from 'react';
import { CellProps } from '../types';

const Cell: React.FC<CellProps> = ({ index, content, onCellClick }) => {
  const getColorClass = () => {
    if (!content) return '';
    
    switch (content.color) {
      case 'verde': return 'bg-green-500 dark:bg-green-600';
      case 'rojo': return 'bg-red-500 dark:bg-red-600';
      case 'azul': return 'bg-blue-500 dark:bg-blue-600';
      case 'amarillo': return 'bg-yellow-400 dark:bg-yellow-500';
      default: return '';
    }
  };

  return (
    <td 
      className={`p-1 sm:p-2 md:p-3 text-center border border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-200 
                 ${content ? 'font-bold text-white ' + getColorClass() : 'dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
      onClick={() => onCellClick(index)}
    >
      <div className="break-words text-xs sm:text-sm md:text-base truncate sm:overflow-visible sm:whitespace-normal min-h-[1.5rem] sm:min-h-[1.75rem] flex items-center justify-center">
        {content?.name || ''}
      </div>
    </td>
  );
};

export default Cell;