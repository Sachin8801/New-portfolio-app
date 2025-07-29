import React, { useState, useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

interface Command {
  input: string;
  output: string[];
  delay?: number;
}

const commands: Command[] = [
  {
    input: 'whoami',
    output: ['Sachin_Singh'],
    delay: 500
  },
  {
    input: 'cat experience.txt',
    output: [
      '→ 6 Years of Experience in Maintaining and Devloping IT solutions',
      '→ Cloud-native architecture specialist',
      '→ Kubernetes & Docker expert',
      '→ CI/CD pipeline automation'
    ],
    delay: 800
  },
  {
    input: 'ls skills/',
    output: [
      'aws/          kubernetes/    terraform/',
      'docker/       jenkins/       monitoring/',
      'ansible/      prometheus/    grafana/'
    ],
    delay: 600
  },
  {
    input: 'kubectl get achievements',
    output: [
      'NAME                    STATUS    AGE',
      'cost-reduction-75%      Active    2y',
      'zero-downtime-deploy    Active    1y',
      'infrastructure-as-code  Active    3y',
      'monitoring-excellence   Active    2y'
    ],
    delay: 1000
  }
];

export const InteractiveTerminal: React.FC = () => {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [currentOutput, setCurrentOutput] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentCommandIndex >= commands.length) return;

    const command = commands[currentCommandIndex];
    const timeout = setTimeout(() => {
      setIsTyping(true);
      
      // Simulate typing output line by line
      command.output.forEach((line, index) => {
        setTimeout(() => {
          setCurrentOutput(prev => [...prev, line]);
          if (index === command.output.length - 1) {
            setIsTyping(false);
            setTimeout(() => {
              setCurrentCommandIndex(prev => prev + 1);
            }, 1500);
          }
        }, index * 300);
      });
    }, command.delay || 500);

    return () => clearTimeout(timeout);
  }, [currentCommandIndex]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [currentOutput]);

  const restartDemo = () => {
    setCurrentCommandIndex(0);
    setCurrentOutput([]);
    setIsTyping(false);
  };

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Terminal className="w-4 h-4" />
          <span>shelby.singh@devops-portfolio</span>
        </div>
        <button
          onClick={restartDemo}
          className="text-xs text-gray-400 hover:text-white transition-colors"
        >
          Restart
        </button>
      </div>
      <div 
        ref={terminalRef}
        className="p-4 h-64 overflow-y-auto font-mono text-sm"
      >
        {commands.slice(0, currentCommandIndex + 1).map((command, cmdIndex) => (
          <div key={cmdIndex} className="mb-4">
            <div className="flex items-center space-x-2 text-green-400">
              <span>$</span>
              <span>{command.input}</span>
            </div>
            {cmdIndex < currentCommandIndex && (
              <div className="mt-1 text-gray-300">
                {command.output.map((line, lineIndex) => (
                  <div key={lineIndex} className="ml-4">
                    {line}
                  </div>
                ))}
              </div>
            )}
            {cmdIndex === currentCommandIndex && (
              <div className="mt-1 text-gray-300">
                {currentOutput.map((line, lineIndex) => (
                  <div key={lineIndex} className="ml-4">
                    {line}
                  </div>
                ))}
                {isTyping && (
                  <div className="ml-4">
                    {showCursor && <span className="text-green-400">█</span>}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        {currentCommandIndex < commands.length && !isTyping && (
          <div className="flex items-center space-x-2 text-green-400">
            <span>$</span>
            {showCursor && <span className="text-green-400">█</span>}
          </div>
        )}
      </div>
    </div>
  );
};
