import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingSpinner = ({ message = "Loading recommendations..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-surface rounded-full animate-spin border-t-primary"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon name="Film" size={20} color="#E50914" strokeWidth={2} />
        </div>
      </div>
      <p className="text-text-secondary font-body text-sm mt-4">{message}</p>
    </div>
  );
};

export default LoadingSpinner;