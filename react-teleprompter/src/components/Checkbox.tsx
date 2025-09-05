import React from 'react';

interface CheckboxProps {
  id: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  color?: 'indigo' | 'emerald' | 'rose' | 'amber';
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked = false,
  onChange,
  color = 'indigo',
  className = ''
}) => {
  const colorClasses = {
    indigo: {
      checked: 'bg-indigo-500 border-indigo-500',
      focus: 'focus:ring-indigo-300'
    },
    emerald: {
      checked: 'bg-emerald-500 border-emerald-500',
      focus: 'focus:ring-emerald-300'
    },
    rose: {
      checked: 'bg-rose-500 border-rose-500',
      focus: 'focus:ring-rose-300'
    },
    amber: {
      checked: 'bg-amber-500 border-amber-500',
      focus: 'focus:ring-amber-300'
    }
  };

  return (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onChange?.(e.target.checked)}
      className={`
        appearance-none w-5 h-5 border-2 border-white/30 rounded cursor-pointer
        transition-all duration-200 ease-in-out relative flex-shrink-0
        ${checked ? colorClasses[color].checked : 'bg-transparent'}
        ${colorClasses[color].focus}
        focus:outline-none focus:ring-2 focus:ring-offset-0
        hover:border-white/50
        ${checked ? 'transform scale-105' : ''}
        active:scale-95
        ${className}
      `}
      style={{
        backgroundImage: checked ? "url('data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m13.854 3.646-7.5 7.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6 10.293l7.146-7.147a.5.5 0 0 1 .708.708z'/%3e%3c/svg%3e')" : 'none',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    />
  );
};
