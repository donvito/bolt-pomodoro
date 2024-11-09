import React from 'react';
import { Settings } from 'lucide-react';
import { Theme } from '../types/theme';

type StatsProps = {
  cycles: number;
  theme: Theme;
  onConfigClick: () => void;
};

export function Stats({ cycles, theme, onConfigClick }: StatsProps) {
  return (
    <div className={`flex justify-between items-center ${theme.accent} rounded-lg p-4`}>
      <div className={theme.text}>
        <span>Cycles completed</span>
        <span className="ml-2 font-bold">{cycles}</span>
      </div>
      <button
        onClick={onConfigClick}
        className={`${theme.text} hover:scale-110 transition-transform duration-200`}
      >
        <Settings className="w-5 h-5" />
      </button>
    </div>
  );
}