import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Theme } from '../types/theme';

type TimerProps = {
  minutes: number;
  seconds: number;
  isActive: boolean;
  theme: Theme;
  onToggle: () => void;
  onReset: () => void;
};

export function Timer({ minutes, seconds, isActive, theme, onToggle, onReset }: TimerProps) {
  const formatTime = (mins: number, secs: number) => {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-center">
      <div className={`text-7xl font-bold ${theme.text} mb-8 font-mono`}>
        {formatTime(minutes, seconds)}
      </div>

      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={onToggle}
          className={`${theme.accent} ${theme.text} rounded-full p-4 transition-all duration-200 hover:scale-110`}
        >
          {isActive ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
          )}
        </button>
        <button
          onClick={onReset}
          className={`${theme.accent} ${theme.text} rounded-full p-4 transition-all duration-200 hover:scale-110`}
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}