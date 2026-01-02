import React, { useState, useRef, useEffect } from 'react';
import { City } from '../types';
import { CITIES } from '../constants';

interface LocationSelectorProps {
  currentCity: City;
  onCityChange: (city: City) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ currentCity, onCityChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (city: City) => {
    onCityChange(city);
    setIsOpen(false);
  };

  return (
    <div className="relative z-50 w-full flex justify-center mt-4" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          relative overflow-hidden px-8 py-3 rounded-full 
          bg-white/10 backdrop-blur-md border border-white/20 
          shadow-lg text-white font-bold text-lg tracking-wide
          transition-all duration-300 active:scale-95
          flex items-center justify-center gap-2
          outline-none ring-0
        `}
      >
        <span className="drop-shadow-md">{currentCity.name}</span>
        {/* Subtle indicator without a heavy arrow icon */}
        <span className={`w-1.5 h-1.5 rounded-full bg-white/60 transition-transform ${isOpen ? 'translate-y-1' : ''}`}></span>
      </button>

      {isOpen && (
        <div className="absolute top-16 w-48 p-2 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl animate-fade-in-down origin-top">
          <ul className="flex flex-col gap-1 max-h-60 overflow-y-auto no-scrollbar">
            {CITIES.map((city) => (
              <li key={city.name}>
                <button
                  onClick={() => handleSelect(city)}
                  className={`
                    w-full text-center py-3 rounded-xl text-white font-medium
                    transition-colors duration-200
                    ${city.name === currentCity.name ? 'bg-white/20 shadow-inner' : 'hover:bg-white/10'}
                  `}
                >
                  {city.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
