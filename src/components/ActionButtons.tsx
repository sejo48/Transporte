import React from 'react';

interface ActionButtonsProps {
  onClearAssignments: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onClearAssignments }) => {
  return (
    <div className="mb-4">
      <button
        className="bg-red-500 dark:bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-600 dark:hover:bg-red-700 transition-colors w-full sm:w-auto"
        onClick={onClearAssignments}
      >
        Borrar asignaciones
      </button>
    </div>
  );
};

export default ActionButtons;