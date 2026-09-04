import React, { useState, useEffect } from 'react';
import { loadNames, saveNames } from '../utils/storage';

interface NameSelectorProps {
  selectedName: string;
  usedNames: string[];
  onNameSelect: (name: string) => void;
  updateNames: (names: string[]) => void;
}

const NameSelector: React.FC<NameSelectorProps> = ({ 
  selectedName, 
  usedNames, 
  onNameSelect,
  updateNames
}) => {
  const [names, setNames] = useState<string[]>([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [nameToDelete, setNameToDelete] = useState('');

  // Load names on component mount
  useEffect(() => {
    const loadedNames = loadNames();
    setNames(loadedNames);
    updateNames(loadedNames);
  }, [updateNames]);

  // Delete a name from the list
  const handleDeleteName = (name: string) => {
    if (usedNames.includes(name)) {
      alert('No se puede eliminar un nombre que está asignado en el tablero');
      return;
    }
    
    setNameToDelete(name);
    setShowConfirmDelete(true);
  };

  // Confirm and delete the name
  const confirmDelete = () => {
    if (!nameToDelete) return;
    
    const updatedNames = names.filter(name => name !== nameToDelete);
    setNames(updatedNames);
    saveNames(updatedNames);
    updateNames(updatedNames);
    setNameToDelete('');
    setShowConfirmDelete(false);
  };

  // Cancel deletion
  const cancelDelete = () => {
    setNameToDelete('');
    setShowConfirmDelete(false);
  };

  return (
    <div className="mb-4">
      <div>
        <label htmlFor="lista-nombres" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Seleccionar nombre:
        </label>
        <select
          id="lista-nombres"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
          value={selectedName}
          onChange={(e) => onNameSelect(e.target.value)}
        >
          <option value="" disabled>Seleccionar nombre</option>
          {names.map((name, index) => (
            <option 
              key={index} 
              value={name}
              disabled={usedNames.includes(name)}
            >
              {name}
            </option>
          ))}
        </select>
      </div>

      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
              Confirmar eliminación
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              ¿Estás seguro de que deseas eliminar el nombre "{nameToDelete}"?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                onClick={cancelDelete}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 transition-colors"
                onClick={confirmDelete}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NameSelector;