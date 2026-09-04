import React, { useState, useEffect } from 'react';
import { loadNames, saveNames } from '../utils/storage';

interface NewNameFormProps {
  updateNames: (names: string[]) => void;
}

const NewNameForm: React.FC<NewNameFormProps> = ({ 
  updateNames
}) => {
  const [names, setNames] = useState<string[]>([]);
  const [newName, setNewName] = useState('');

  // Load names on component mount
  useEffect(() => {
    setNames(loadNames());
  }, []);

  // Add a new name to the list
  const handleAddName = () => {
    if (newName.trim() === '') return;
    
    if (!names.includes(newName)) {
      const updatedNames = [...names, newName];
      setNames(updatedNames);
      saveNames(updatedNames);
      updateNames(updatedNames);
      setNewName('');
    } else {
      alert('Este nombre ya existe en la lista');
    }
  };

  return (
    <div className="mb-4">
      <div>
        <label htmlFor="nuevo-nombre" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Nuevo nombre:
        </label>
        <div className="flex">
          <input
            type="text"
            id="nuevo-nombre"
            className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ingrese nuevo nombre"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddName();
              }
            }}
          />
          <button
            className="bg-green-500 text-white px-3 py-2 rounded-r-md hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 transition-colors"
            onClick={handleAddName}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewNameForm;