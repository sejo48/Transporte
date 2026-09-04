import { Assignment, GridData } from '../types';

// Default names
const DEFAULT_NAMES = [
  'Carmen', 'Elvira', 'Marielos', 'libre', 'libre',
  'Elisabet', 'Janet', 'Judth S', 'Bertilia F', 'Clara',
  'Vilma A', 'Gudelia', 'Cristina', 'libre', 'D.Rosa',
  'Lloyd', 'Josefa', 'Margarita'
];

// Load names from localStorage or use defaults
export const loadNames = (): string[] => {
  const storedNames = localStorage.getItem('nombres');
  return storedNames ? JSON.parse(storedNames) : DEFAULT_NAMES;
};

// Save names to localStorage
export const saveNames = (names: string[]): void => {
  localStorage.setItem('nombres', JSON.stringify(names));
};

// Load grid data from localStorage
export const loadGridData = (): GridData => {
  const gridData: GridData = {};
  
  for (let i = 0; i < 25; i++) {
    const storedData = localStorage.getItem(`datos${i}`);
    if (storedData) {
      gridData[i] = JSON.parse(storedData);
    }
  }
  
  return gridData;
};

// Save assignment to localStorage
export const saveAssignment = (index: number, assignment: Assignment | null): void => {
  if (assignment) {
    localStorage.setItem(`datos${index}`, JSON.stringify(assignment));
  } else {
    localStorage.removeItem(`datos${index}`);
  }
};

// Clear all assignments from localStorage
export const clearAllAssignments = (): void => {
  for (let i = 0; i < 25; i++) {
    localStorage.removeItem(`datos${i}`);
  }
};