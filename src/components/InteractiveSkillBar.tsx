import React, { useState, useEffect, useRef } from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface InteractiveSkillBarProps {
  name: string;
  icon: LucideIcon;
  level: number;
  color: string;
  delay?: number;
}

export const InteractiveSkillBar: React.FC<InteractiveSkillBarProps> = ({
  name,
  icon: Icon,
  level,
  color,
  delay = 0
}) => {
  const [animatedLevel, setAnimatedLevel] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const skillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (skillRef.current) {
      observer.observe(skillRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        const interval = setInterval(() => {
          setAnimatedLevel(prev => {
            if (prev >= level) {
              clearInterval(interval);
              return level;
            }
            return prev + 2;
          });
        }, 20);

        return () => clearInterval(interval);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [isVisible, level, delay]);

  return (
    <div
      ref={skillRef}
      className={`bg-gradient-to-br from-gray-800/80 to-gray-800/60 backdrop-blur-sm rounded-lg p-6 border border-gray-600/50 transition-all duration-300 transform cursor-pointer ${
        isHovered ? 'border-cyan-400/50 -translate-y-2 shadow-xl shadow-cyan-400/20' : 'hover:border-cyan-400/30 hover:-translate-y-1'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}>
          <div className="relative">
            <Icon className={`w-8 h-8 transition-colors duration-300 ${isHovered ? 'text-cyan-300' : 'text-cyan-400'}`} />
            {isHovered && <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-sm"></div>}
          </div>
        </div>
        <div className="text-right">
          <span className={`text-lg font-bold transition-all duration-300 ${isHovered ? 'text-cyan-300' : 'text-gray-300'}`}>
            {animatedLevel}%
          </span>
          <div className="text-xs text-gray-500">Proficiency</div>
        </div>
      </div>
      <h3 className={`font-semibold mb-3 transition-colors duration-300 ${isHovered ? 'text-cyan-300' : 'text-white'}`}>
        {name}
      </h3>
      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
        <div 
          className={`h-3 rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${color}`}
          style={{ width: `${animatedLevel}%` }}
        >
          <div className="h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
        </div>
      </div>
      {isHovered && (
        <div className="mt-3 text-xs text-gray-400 animate-fade-in">
          Click to see related projects →
        </div>
      )}
    </div>
  );
};
