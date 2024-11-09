import React from 'react';
import { X } from 'lucide-react';
import { Theme } from '../types/theme';
import { TimerConfig } from '../types/config';

type ConfigModalProps = {
  isOpen: boolean;
  onClose: () => void;
  config: TimerConfig;
  onConfigChange: (config: TimerConfig) => void;
  theme: Theme;
};

export function ConfigModal({ isOpen, onClose, config, onConfigChange, theme }: ConfigModalProps) {
  if (!isOpen) return null;

  const handleChange = (key: keyof TimerConfig, value: string | boolean) => {
    const numValue = typeof value === 'string' ? parseInt(value, 10) : value;
    onConfigChange({ ...config, [key]: numValue });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className={`bg-white/10 backdrop-blur-lg rounded-2xl p-6 w-full max-w-md border border-white/20 ${theme.text}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Timer Settings</h2>
          <button onClick={onClose} className={`${theme.accent} rounded-full p-2`}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm">Work Duration (minutes)</label>
            <input
              type="number"
              min="1"
              max="60"
              value={config.workDuration}
              onChange={(e) => handleChange('workDuration', e.target.value)}
              className="w-full bg-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">Break Duration (minutes)</label>
            <input
              type="number"
              min="1"
              max="30"
              value={config.breakDuration}
              onChange={(e) => handleChange('breakDuration', e.target.value)}
              className="w-full bg-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">Long Break Duration (minutes)</label>
            <input
              type="number"
              min="1"
              max="60"
              value={config.longBreakDuration}
              onChange={(e) => handleChange('longBreakDuration', e.target.value)}
              className="w-full bg-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">Long Break Interval (sessions)</label>
            <input
              type="number"
              min="1"
              max="10"
              value={config.longBreakInterval}
              onChange={(e) => handleChange('longBreakInterval', e.target.value)}
              className="w-full bg-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="autoStartBreaks"
              checked={config.autoStartBreaks}
              onChange={(e) => handleChange('autoStartBreaks', e.target.checked)}
              className="rounded bg-white/10"
            />
            <label htmlFor="autoStartBreaks" className="text-sm">Auto-start breaks</label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="autoStartWork"
              checked={config.autoStartWork}
              onChange={(e) => handleChange('autoStartWork', e.target.checked)}
              className="rounded bg-white/10"
            />
            <label htmlFor="autoStartWork" className="text-sm">Auto-start work sessions</label>
          </div>
        </div>
      </div>
    </div>
  );
}