import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchHeader = ({ 
  searchQuery, 
  onSearchChange, 
  onVoiceSearch, 
  onFilterToggle, 
  showSuggestions, 
  suggestions, 
  onSuggestionClick,
  recentSearches,
  onRecentSearchClick 
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef(null);

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    // Delay to allow suggestion clicks
    setTimeout(() => setIsSearchFocused(false), 200);
  };

  const clearSearch = () => {
    onSearchChange('');
    searchInputRef.current?.focus();
  };

  return (
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="px-4 py-3 lg:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="relative">
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <div className="relative">
                  <Icon 
                    name="Search" 
                    size={20} 
                    color="#B3B3B3" 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10"
                  />
                  <Input
                    ref={searchInputRef}
                    type="search"
                    placeholder="Search movies, actors, directors..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                    className="pl-10 pr-20 py-3 bg-surface border-border focus:border-primary rounded-xl text-text-primary placeholder-text-secondary"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                    {searchQuery && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearSearch}
                        className="p-1 hover:bg-surface/50 rounded-lg"
                      >
                        <Icon name="X" size={16} color="#B3B3B3" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onVoiceSearch}
                      className="p-2 hover:bg-surface/50 rounded-lg"
                    >
                      <Icon name="Mic" size={18} color="#B3B3B3" />
                    </Button>
                  </div>
                </div>

                {/* Search Suggestions Dropdown */}
                {isSearchFocused && (showSuggestions || recentSearches.length > 0) && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-xl shadow-elevation-lg max-h-80 overflow-y-auto z-50">
                    {/* Recent Searches */}
                    {!searchQuery && recentSearches.length > 0 && (
                      <div className="p-3 border-b border-border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-body-semibold text-text-secondary">Recent Searches</span>
                          <Button variant="ghost" size="xs" className="text-text-secondary hover:text-text-primary">
                            Clear All
                          </Button>
                        </div>
                        {recentSearches.map((search, index) => (
                          <button
                            key={index}
                            onClick={() => onRecentSearchClick(search)}
                            className="flex items-center space-x-3 w-full p-2 hover:bg-background rounded-lg transition-colors duration-200"
                          >
                            <Icon name="Clock" size={16} color="#B3B3B3" />
                            <span className="text-text-primary text-sm">{search}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Search Suggestions */}
                    {showSuggestions && suggestions.length > 0 && (
                      <div className="p-2">
                        {suggestions.map((suggestion) => (
                          <button
                            key={suggestion.id}
                            onClick={() => onSuggestionClick(suggestion)}
                            className="flex items-center space-x-3 w-full p-2 hover:bg-background rounded-lg transition-colors duration-200"
                          >
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-surface flex-shrink-0">
                              <img
                                src={suggestion.thumbnail}
                                alt={suggestion.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = '/assets/images/no_image.png';
                                }}
                              />
                            </div>
                            <div className="flex-1 text-left">
                              <p className="text-text-primary text-sm font-body-semibold">{suggestion.title}</p>
                              <p className="text-text-secondary text-xs">{suggestion.type} • {suggestion.year}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Filter Toggle */}
              <Button
                variant="secondary"
                size="md"
                onClick={onFilterToggle}
                className="px-4 py-3 bg-surface hover:bg-surface/80 border border-border rounded-xl"
                iconName="SlidersHorizontal"
                iconSize={20}
              >
                <span className="hidden sm:inline ml-2">Filters</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;