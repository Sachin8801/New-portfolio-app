import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Github, Play } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tech: string[];
  impact: string;
  details?: {
    challenge: string;
    solution: string;
    results: string[];
    architecture?: string[];
    metrics?: { label: string; value: string; improvement: string }[];
  };
  links?: {
    demo?: string;
    github?: string;
    documentation?: string;
  };
}

interface ExpandableProjectCardProps {
  project: Project;
  index: number;
}

export const ExpandableProjectCard: React.FC<ExpandableProjectCardProps> = ({ project, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-gradient-to-br from-gray-800/80 to-gray-800/60 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-600/50 transition-all duration-500 transform ${
        isHovered ? 'border-cyan-400/50 shadow-xl shadow-cyan-400/20 -translate-y-2' : 'hover:border-cyan-400/30'
      } ${isExpanded ? 'scale-105' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className={`text-xl font-semibold transition-colors duration-300 ${
            isHovered ? 'bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent' : 'bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'
          }`}>
            {project.title}
          </h3>
          <div className="flex items-center space-x-2">
            {project.links?.demo && (
              <a
                href={project.links.demo}
                className="p-2 bg-gray-700/50 rounded-lg hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
                title="View Demo"
              >
                <Play className="w-4 h-4" />
              </a>
            )}
            {project.links?.github && (
              <a
                href={project.links.github}
                className="p-2 bg-gray-700/50 rounded-lg hover:bg-purple-600 transition-all duration-300"
                title="View Code"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
        
        <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, idx) => (
            <span
              key={idx}
              className={`px-3 py-1 text-sm rounded-full border transition-all duration-300 ${
                isHovered 
                  ? 'bg-gradient-to-r from-cyan-600/30 to-blue-600/30 text-cyan-200 border-cyan-400/30' 
                  : 'bg-gray-700/50 text-cyan-300 border-gray-600/50'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="border-t border-gray-700 pt-4 mb-4">
          <p className="text-sm bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent font-medium">Impact: {project.impact}</p>
        </div>

        {project.details && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors w-full justify-center py-2 border-t border-gray-700"
          >
            <span>{isExpanded ? 'Show Less' : 'Show Details'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}
      </div>

      {isExpanded && project.details && (
        <div className="border-t border-gray-700 bg-gradient-to-br from-gray-800/70 to-gray-800/50 p-6 animate-fade-in">
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">Challenge</h4>
              <p className="text-gray-300">{project.details.challenge}</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">Solution</h4>
              <p className="text-gray-300">{project.details.solution}</p>
            </div>

            {project.details.architecture && (
              <div>
                <h4 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">Architecture</h4>
                <ul className="space-y-1">
                  {project.details.architecture.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 flex-shrink-0 shadow-sm shadow-purple-400/50"></div>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.details.metrics && (
              <div>
                <h4 className="text-lg font-semibold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-3">Key Metrics</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {project.details.metrics.map((metric, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-gray-700/50 to-gray-700/30 rounded-lg p-3 text-center border border-gray-600/30">
                      <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">{metric.value}</div>
                      <div className="text-sm text-gray-300">{metric.label}</div>
                      <div className="text-xs text-green-300">{metric.improvement}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div>
              <h4 className="text-lg font-semibold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">Results</h4>
              <ul className="space-y-2">
                {project.details.results.map((result, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mt-2 flex-shrink-0 shadow-sm shadow-green-400/50"></div>
                    <span className="text-gray-300">{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
