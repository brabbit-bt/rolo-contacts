import React from 'react';

interface PrioritySliderProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export const PrioritySlider: React.FC<PrioritySliderProps> = ({
  value,
  onChange,
  className = '',
}) => {
  const getPriorityColor = (priority: number) => {
    if (priority <= 3) return 'bg-green-500';
    if (priority <= 6) return 'bg-yellow-500';
    if (priority <= 8) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getPriorityLabel = (priority: number) => {
    if (priority <= 2) return 'Low';
    if (priority <= 4) return 'Medium-Low';
    if (priority <= 6) return 'Medium';
    if (priority <= 8) return 'High';
    return 'Critical';
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Relationship Priority
        </label>
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${getPriorityColor(value)}`}>
          {getPriorityLabel(value)} ({value}/10)
        </span>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min="0"
          max="10"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 to-red-500 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: 'linear-gradient(to right, #10b981 0%, #f59e0b 25%, #f97316 50%, #ef4444 100%)'
          }}
        />
        
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0</span>
          <span>2</span>
          <span>4</span>
          <span>6</span>
          <span>8</span>
          <span>10</span>
        </div>
      </div>
    </div>
  );
}; 