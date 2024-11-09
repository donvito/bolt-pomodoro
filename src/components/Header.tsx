import React from 'react';
import { Timer as TimerIcon, Coffee } from 'lucide-react';
import { Theme } from '../types/theme';

type HeaderProps = {
  isBreak: boolean;
  theme: Theme;
};

export function Header({ isBreak, theme }: HeaderProps) {
  return (
    <div className="flex items-center justify-center mb-6">
      {isBreak ? (
        <Coffee className={`w-8 h-8 ${theme.text} mr-2`} />
      ) : (
        <TimerIcon className={`w-8 h-8 ${theme.text} mr-2`} />
      )}
      <h1 className={`text-2xl font-bold ${theme.text}`}>
        {isBreak ? 'Break Time' : 'Focus Time'}
      </h1>
    </div>
  );
}