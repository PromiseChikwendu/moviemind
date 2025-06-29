import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortDropdown = ({ currentSort, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'relevance', label: 'Relevance', icon: 'Target' },
    { value: 'rating-desc', label: 'Highest Rated', icon: 'Star' },
    { value: 'rating-asc', label: 'Lowest Rated', icon: 'Star' },
    { value: 'year-desc', label: 'Newest First', icon: 'Calendar' },
    { value: 'year-asc', label: 'Oldest First', icon: 'Calendar' },
    { value: 'title-asc', label: 'A to Z', icon: 'ArrowUp' },
    { value: 'title-desc', label: 'Z to A', icon: 'ArrowDown' }
  ];

  const currentSortOption = sortOptions.find(option => option.value === currentSort);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortSelect = (sortValue) => {
    onSortChange(sortValue);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="secondary"
        size="md"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-surface hover:bg-surface/80 border border-border rounded-xl px-4 py-3"
      >
        <div className="flex items-center space-x-2">
          <Icon name={currentSortOption?.icon || 'ArrowUpDown'} size={16} color="currentColor" />
          <span className="hidden sm:inline text-sm">{currentSortOption?.label || 'Sort'}</span>
          <Icon 
            name="ChevronDown" 
            size={16} 
            color="currentColor" 
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-surface border border-border rounded-xl shadow-elevation-lg z-50 overflow-hidden">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortSelect(option.value)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-background transition-colors duration-200 ${
                currentSort === option.value 
                  ? 'bg-primary/10 text-primary' :'text-text-primary'
              }`}
            >
              <Icon 
                name={option.icon} 
                size={16} 
                color={currentSort === option.value ? '#E50914' : 'currentColor'} 
              />
              <span className="text-sm font-body">{option.label}</span>
              {currentSort === option.value && (
                <Icon name="Check" size={16} color="#E50914" className="ml-auto" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;