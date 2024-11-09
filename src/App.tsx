import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Timer } from './components/Timer';
import { Stats } from './components/Stats';
import { ThemeSelector } from './components/ThemeSelector';
import { ConfigModal } from './components/ConfigModal';
import { themes } from './types/theme';
import { defaultConfig } from './types/config';
import { Heart } from 'lucide-react';

function App() {
  const [minutes, setMinutes] = useState(defaultConfig.workDuration);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isLongBreak, setIsLongBreak] = useState(false);
  const [cycles, setCycles] = useState(0);
  const [currentTheme, setCurrentTheme] = useState(themes[0]);
  const [config, setConfig] = useState(defaultConfig);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload the background image
  useEffect(() => {
    const img = new Image();
    img.src = currentTheme.image;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(false);

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [currentTheme.image]);

  useEffect(() => {
    let interval: number;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
            audio.play();
            
            if (isBreak) {
              setMinutes(config.workDuration);
              setIsBreak(false);
              setIsLongBreak(false);
              setCycles(c => c + 1);
              if (config.autoStartWork) {
                setIsActive(true);
              } else {
                setIsActive(false);
              }
            } else {
              const completedCycles = cycles + 1;
              const isLongBreakDue = completedCycles % config.longBreakInterval === 0;
              
              if (isLongBreakDue) {
                setMinutes(config.longBreakDuration);
                setIsLongBreak(true);
              } else {
                setMinutes(config.breakDuration);
                setIsLongBreak(false);
              }
              
              setIsBreak(true);
              if (config.autoStartBreaks) {
                setIsActive(true);
              } else {
                setIsActive(false);
              }
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, isBreak, cycles, config]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(config.workDuration);
    setSeconds(0);
    setIsBreak(false);
    setIsLongBreak(false);
    setCycles(0);
  };

  const handleConfigChange = (newConfig: typeof config) => {
    setConfig(newConfig);
    if (!isActive) {
      setMinutes(isBreak ? (isLongBreak ? newConfig.longBreakDuration : newConfig.breakDuration) : newConfig.workDuration);
      setSeconds(0);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background image with fade-in effect */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 transition-transform duration-1000 ease-in-out transform scale-105"
          style={{
            backgroundImage: `url(${currentTheme.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(4px)',
          }}
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${currentTheme.background} transition-colors duration-500`} />
      </div>
      
      {/* Fallback background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentTheme.background} transition-opacity duration-500 ${
        imageLoaded ? 'opacity-0' : 'opacity-100'
      }`} />
      
      <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
        <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
        
        <div className="bg-black/10 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md shadow-xl border border-white/20">
          <Header isBreak={isBreak} theme={currentTheme} />
          
          <Timer
            minutes={minutes}
            seconds={seconds}
            isActive={isActive}
            theme={currentTheme}
            onToggle={toggleTimer}
            onReset={resetTimer}
          />
          
          <Stats 
            cycles={cycles} 
            theme={currentTheme} 
            onConfigClick={() => setIsConfigOpen(true)}
          />
        </div>

        {/* Footer */}
        <div className={`mt-8 text-sm ${currentTheme.text} text-center`}>
          <p className="flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-500 animate-pulse" /> by{' '}
            <a 
              href="https://donvitocodes.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline"
            >
              DonvitoCodes
            </a>
          </p>
          <div className="flex items-center justify-center gap-4 mt-2">
            <a 
              href="https://github.com/donvito" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
            <a 
              href="https://x.com/donvito" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline"
            >
              X (Twitter)
            </a>
          </div>
        </div>

        <ConfigModal
          isOpen={isConfigOpen}
          onClose={() => setIsConfigOpen(false)}
          config={config}
          onConfigChange={handleConfigChange}
          theme={currentTheme}
        />
      </div>
    </div>
  );
}

export default App;