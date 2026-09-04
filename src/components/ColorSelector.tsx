import React from 'react';
import { ColorOption } from '../types';

interface ColorSelectorProps {
  selectedColor: ColorOption;
  onColorSelect: (color: ColorOption) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ 
  selectedColor, 
  onColorSelect 
}) => {
  return (
    <div className="mb-4">
      <label htmlFor="lista-colores" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Seleccionar color:
      </label>
      <select
        id="lista-colores"
        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
        value={selectedColor}
        onChange={(e) => onColorSelect(e.target.value as ColorOption)}
      >
        <option value="" disabled>Seleccionar color</option>
        <option value="verde" className="bg-green-100 dark:bg-green-800">Verde</option>
        <option value="rojo" className="bg-red-100 dark:bg-red-800">Rojo</option>
        <option value="azul" className="bg-blue-100 dark:bg-blue-800">Azul</option>
        <option value="amarillo" className="bg-yellow-100 dark:bg-yellow-800">Amarillo</option>
      </select>
    </div>
  );
};

export default ColorSelector;