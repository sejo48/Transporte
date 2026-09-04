import React, { useState, useEffect } from 'react';
import { loadNames, saveNames } from '../utils/storage';
import { X } from 'lucide-react';

interface ManageNamesModalProps {
  isOpen: boolean;
  onClose: () => void;
  usedNames: string[];
  updateNames: (names: string[]) => void;
}

const ManageNamesModal: React.FC<ManageNamesModalProps> = ({ 
  isOpen, 
  onClose, 
  usedNames,
  updateNames 
}) => {
  const [names, setNames] = useState<string[]>([]);
  
  useEffect(() => {
    if (isOpen) {
      setNames(loadNames());
    }
  }, [isOpen]);

  const handleDeleteName = (nameToDelete: string) => {
    if (usedNames.includes(nameToDelete)) {
      alert('No se puede eliminar un nombre que está asignado en el tablero');
      return;
    }

    if (confirm(`¿Estás seguro de que deseas eliminar "${nameToDelete}"?`)) {
      const updatedNames = names.filter(name => name !== nameToDelete);
      setNames(updatedNames);
      saveNames(updatedNames);
      updateNames(updatedNames);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Administrar nombres
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
        
        {names.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No hay nombres en la lista
          </p>
        ) : (
          <div className="max-h-60 overflow-y-auto mb-4">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {names.map((name, index) => (
                <li key={index} className="py-2 flex justify-between items-center">
                  <span className={`${usedNames.includes(name) ? 'text-gray-500' : 'text-gray-900 dark:text-gray-100'}`}>
                    {name}
                    {usedNames.includes(name) && (
                      <span className="ml-2 text-xs text-blue-500">(en uso)</span>
                    )}
                  </span>
                  <button
                    onClick={() => handleDeleteName(name)}
                    className={`text-red-500 hover:text-red-700 text-sm py-1 px-2 rounded
                              ${usedNames.includes(name) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={usedNames.includes(name)}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <button
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ManageNamesModal;