import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AssignmentGrid from './components/AssignmentGrid';
import NewsSection from './components/NewsSection';
import NameSelector from './components/NameSelector';
import ColorSelector from './components/ColorSelector';
import NewNameForm from './components/NewNameForm';
import ActionButtons from './components/ActionButtons';
import ManageNamesModal from './components/ManageNamesModal';
import { Assignment, ColorOption, GridData } from './types';
import { loadGridData, saveAssignment, clearAllAssignments } from './utils/storage';

function App() {
  const [gridData, setGridData] = useState<GridData>({});
  const [selectedName, setSelectedName] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<ColorOption>('');
  const [usedNames, setUsedNames] = useState<string[]>([]);
  const [names, setNames] = useState<string[]>([]);
  const [isManageNamesModalOpen, setIsManageNamesModalOpen] = useState(false);

  // Load grid data on component mount
  useEffect(() => {
    const data = loadGridData();
    setGridData(data);
    
    // Extract used names from grid data
    const names = Object.values(data).map(assignment => assignment.name);
    setUsedNames(names);
  }, []);

  // Handle cell click
  const handleCellClick = (index: number) => {
    const newGridData = { ...gridData };

    // If cell already has content, clear it
    if (newGridData[index]) {
      const nameToRemove = newGridData[index].name;
      delete newGridData[index];
      saveAssignment(index, null);
      
      // Update used names
      setUsedNames(prevNames => prevNames.filter(name => name !== nameToRemove));
      
      setGridData(newGridData);
      return;
    }
    
    // For empty cells, require name and color
    if (!selectedName || !selectedColor) {
      alert('Por favor, seleccione un nombre y un color');
      return;
    }

    // Assign name and color to cell
    const assignment: Assignment = {
      name: selectedName,
      color: selectedColor
    };
    
    newGridData[index] = assignment;
    saveAssignment(index, assignment);
    
    // Update used names
    setUsedNames(prevNames => [...prevNames, selectedName]);
    
    // Reset selections
    setSelectedName('');
    setSelectedColor('');
    
    setGridData(newGridData);
  };

  // Clear all assignments
  const handleClearAssignments = () => {
    setGridData({});
    clearAllAssignments();
    setUsedNames([]);
  };

  // Update names list
  const updateNames = (newNames: string[]) => {
    setNames(newNames);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-2 px-1 sm:py-4 sm:px-2 md:py-8 md:px-4 transition-colors duration-200">
      <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 p-2 sm:p-4 md:p-6 rounded-lg shadow-md">
        <NewsSection />
        
        <Header />
        
        <AssignmentGrid 
          gridData={gridData} 
          onCellClick={handleCellClick}
        />
        
        <div className="flex flex-col space-y-4">
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Controles</h2>
            <button
              onClick={() => setIsManageNamesModalOpen(true)}
              className="text-sm bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
            >
              Administrar nombres
            </button>
          </div>
          
          <NameSelector 
            selectedName={selectedName} 
            usedNames={usedNames}
            onNameSelect={setSelectedName} 
            updateNames={updateNames}
          />
          
          <ColorSelector 
            selectedColor={selectedColor} 
            onColorSelect={setSelectedColor} 
          />
          
          <NewNameForm 
            updateNames={updateNames}
          />
          
          <ActionButtons 
            onClearAssignments={handleClearAssignments} 
          />
        </div>
      </div>
      
      <ManageNamesModal 
        isOpen={isManageNamesModalOpen}
        onClose={() => setIsManageNamesModalOpen(false)}
        usedNames={usedNames}
        updateNames={updateNames}
      />
    </div>
  );
}

export default App;