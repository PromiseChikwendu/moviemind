import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterChips = ({ activeFilters, onRemoveFilter, onClearAll, resultCount }) => {
  if (activeFilters.length === 0) return null;

  return (
    <div className="px-4 py-3 lg:px-6 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-text-secondary">
            {resultCount.toLocaleString()} results found
          </span>
          <Button
            variant="ghost"
            size="xs"
            onClick={onClearAll}
            className="text-text-secondary hover:text-text-primary"
          >
            Clear All
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <div
              key={`${filter.type}-${filter.value}`}
              className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-body-semibold"
            >
              <span>{filter.label}</span>
              <button
                onClick={() => onRemoveFilter(filter)}
                className="hover:bg-primary/20 rounded-full p-0.5 transition-colors duration-200"
              >
                <Icon name="X" size={14} color="currentColor" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterChips;