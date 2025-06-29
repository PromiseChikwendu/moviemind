import React from 'react';

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-border border-t-primary mb-3`}></div>
      <p className="text-text-secondary text-sm font-body">{text}</p>
    </div>
  );
};

export default LoadingSpinner;