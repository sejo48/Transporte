import React from 'react';
import Cell from './Cell';
import { Assignment } from '../types';

interface AssignmentGridProps {
  gridData: Record<number, Assignment>;
  onCellClick: (index: number) => void;
}

const AssignmentGrid: React.FC<AssignmentGridProps> = ({ gridData, onCellClick }) => {
  // Create a 5x5 grid
  const renderGrid = () => {
    const rows = [];
    
    for (let row = 0; row < 5; row++) {
      const cells = [];
      
      for (let col = 0; col < 5; col++) {
        const index = row * 5 + col;
        cells.push(
          <Cell 
            key={index} 
            index={index} 
            content={gridData[index] || null}
            onCellClick={onCellClick} 
          />
        );
      }
      
      rows.push(<tr key={row}>{cells}</tr>);
    }
    
    return rows;
  };

  return (
    <div className="mb-6 overflow-x-auto">
      <table className="w-full table-fixed border-collapse bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="p-1 sm:p-2 md:p-3 bg-gray-900 text-white dark:bg-gray-950 font-bold w-1/5 text-xs sm:text-sm md:text-base">1</th>
            <th className="p-1 sm:p-2 md:p-3 bg-gray-900 text-white dark:bg-gray-950 font-bold w-1/5 text-xs sm:text-sm md:text-base">2</th>
            <th className="p-1 sm:p-2 md:p-3 bg-gray-900 text-white dark:bg-gray-950 font-bold w-1/5 text-xs sm:text-sm md:text-base">3</th>
            <th className="p-1 sm:p-2 md:p-3 bg-gray-900 text-white dark:bg-gray-950 font-bold w-1/5 text-xs sm:text-sm md:text-base">4</th>
            <th className="p-1 sm:p-2 md:p-3 bg-gray-900 text-white dark:bg-gray-950 font-bold w-1/5 text-xs sm:text-sm md:text-base">5</th>
          </tr>
        </thead>
        <tbody>
          {renderGrid()}
        </tbody>
      </table>
    </div>
  );
};

export default AssignmentGrid;