import React, { useState, useEffect } from 'react';

interface TerminalAnimationProps {
  messages: string[];
  isVisible: boolean;
  title?: string;
}

export const TerminalAnimation: React.FC<TerminalAnimationProps> = ({
  messages,
  isVisible,
  title = "টেলিপ্রম্পটার.exe"
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    if (!isVisible || messages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentMessageIndex(prev => (prev + 1) % messages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isVisible, messages.length]);

  if (!isVisible) return null;

  return (
    <div className="terminal-loader">
      <div className="terminal-header">
        <div className="terminal-title">{title}</div>
        <div className="terminal-controls">
          <span className="control close"></span>
          <span className="control minimize"></span>
          <span className="control maximize"></span>
        </div>
      </div>
      <div className="text">
        {messages[currentMessageIndex] || ''}
      </div>
    </div>
  );
};
