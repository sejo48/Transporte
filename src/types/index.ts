export interface Assignment {
  name: string;
  color: ColorOption;
}

export type ColorOption = 'verde' | 'rojo' | 'azul' | 'amarillo' | '';

export interface CellProps {
  index: number;
  content: Assignment | null;
  onCellClick: (index: number) => void;
}

export interface GridData {
  [key: string]: Assignment;
}