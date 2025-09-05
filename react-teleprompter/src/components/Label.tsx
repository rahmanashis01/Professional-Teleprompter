import React from 'react';

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
  strikethrough?: boolean;
}

export const Label: React.FC<LabelProps> = ({
  htmlFor,
  children,
  className = '',
  strikethrough = false
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`
        text-white/80 text-sm cursor-pointer transition-all duration-200
        hover:text-white/90 user-select-none
        ${strikethrough ? 'line-through text-white/60' : ''}
        ${className}
      `}
    >
      {children}
    </label>
  );
};
