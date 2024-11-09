import React from 'react';
import { Palette } from 'lucide-react';
import { Theme, themes } from '../types/theme';

type ThemeSelectorProps = {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
};

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  return (
    <div className="absolute top-4 right-4">
      <div className="relative group">
        <button className={`${currentTheme.accent} ${currentTheme.text} rounded-full p-3 transition-all duration-200 hover:scale-110`}>
          <Palette className="w-5 h-5" />
        </button>
        
        <div className="absolute right-0 mt-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-2 shadow-xl border border-white/20">
            {themes.map((theme) => (
              <button
                key={theme.name}
                onClick={() => onThemeChange(theme)}
                className={`block w-full text-left px-4 py-2 rounded-md ${
                  currentTheme.name === theme.name ? 'bg-white/20' : 'hover:bg-white/10'
                } ${currentTheme.text} transition-colors duration-150 text-sm`}
              >
                {theme.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}