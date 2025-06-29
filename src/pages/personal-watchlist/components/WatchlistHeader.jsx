import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WatchlistHeader = ({ 
  movieCount, 
  sortBy, 
  onSortChange, 
  viewMode, 
  onViewModeChange,
  onSearch,
  searchQuery 
}) => {
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const sortOptions = [
    { value: 'recently-added', label: 'Recently Added', icon: 'Clock' },
    { value: 'release-date', label: 'Release Date', icon: 'Calendar' },
    { value: 'rating', label: 'Rating', icon: 'Star' },
    { value: 'genre', label: 'Genre', icon: 'Tag' },
    { value: 'alphabetical', label: 'A-Z', icon: 'ArrowUpDown' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Movies', count: movieCount },
    { value: 'unwatched', label: 'Not Watched', count: Math.floor(movieCount * 0.7) },
    { value: 'watched', label: 'Watched', count: Math.floor(movieCount * 0.3) },
    { value: 'favorites', label: 'Favorites', count: Math.floor(movieCount * 0.2) }
  ];

  return (
    <div className="bg-surface border-b border-border sticky top-0 z-50">
      <div className="px-4 py-4 lg:px-6">
        {/* Header Title */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Bookmark" size={20} color="#E50914" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-heading font-heading-bold text-text-primary">
                My Watchlist
              </h1>
              <p className="text-sm text-text-secondary font-body">
                {movieCount} {movieCount === 1 ? 'movie' : 'movies'} saved
              </p>
            </div>
          </div>

          {/* Desktop View Toggle */}
          <div className="hidden lg:flex items-center space-x-2 bg-background rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === 'grid' ?'bg-primary text-primary-foreground shadow-elevation-sm' :'text-text-secondary hover:text-text-primary hover:bg-surface'
              }`}
            >
              <Icon name="Grid3X3" size={16} />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === 'list' ?'bg-primary text-primary-foreground shadow-elevation-sm' :'text-text-secondary hover:text-text-primary hover:bg-surface'
              }`}
            >
              <Icon name="List" size={16} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Search" size={18} color="#B3B3B3" />
          </div>
          <input
            type="text"
            placeholder="Search your watchlist..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
          />
          {searchQuery && (
            <button
              onClick={() => onSearch('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <Icon name="X" size={18} color="#B3B3B3" />
            </button>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Sort Dropdown */}
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setShowSortMenu(!showSortMenu)}
                iconName="ArrowUpDown"
                iconPosition="left"
                className="text-sm"
              >
                Sort
              </Button>
              
              {showSortMenu && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-surface border border-border rounded-lg shadow-elevation-lg z-50">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        onSortChange(option.value);
                        setShowSortMenu(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-background transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                        sortBy === option.value ? 'bg-primary/10 text-primary' : 'text-text-secondary'
                      }`}
                    >
                      <Icon name={option.icon} size={16} />
                      <span className="font-body text-sm">{option.label}</span>
                      {sortBy === option.value && (
                        <Icon name="Check" size={16} className="ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                iconName="Filter"
                iconPosition="left"
                className="text-sm"
              >
                Filter
              </Button>
              
              {showFilterMenu && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-surface border border-border rounded-lg shadow-elevation-lg z-50">
                  {filterOptions.map((option) => (
                    <button
                      key={option.value}
                      className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-background transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg text-text-secondary"
                    >
                      <span className="font-body text-sm">{option.label}</span>
                      <span className="text-xs bg-background px-2 py-1 rounded-full">
                        {option.count}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Export Button - Desktop Only */}
          <div className="hidden lg:block">
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
              className="text-sm"
            >
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showSortMenu || showFilterMenu) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowSortMenu(false);
            setShowFilterMenu(false);
          }}
        />
      )}
    </div>
  );
};

export default WatchlistHeader;