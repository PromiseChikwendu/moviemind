import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterSidebar = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFilterChange, 
  onApplyFilters, 
  onResetFilters,
  isMobile 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const genres = [
    "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary",
    "Drama", "Family", "Fantasy", "History", "Horror", "Music", "Mystery",
    "Romance", "Science Fiction", "Thriller", "War", "Western"
  ];

  const handleGenreToggle = (genre) => {
    const updatedGenres = localFilters.genres.includes(genre)
      ? localFilters.genres.filter(g => g !== genre)
      : [...localFilters.genres, genre];
    
    setLocalFilters(prev => ({ ...prev, genres: updatedGenres }));
  };

  const handleYearChange = (type, value) => {
    setLocalFilters(prev => ({
      ...prev,
      yearRange: { ...prev.yearRange, [type]: parseInt(value) }
    }));
  };

  const handleApply = () => {
    onFilterChange(localFilters);
    onApplyFilters();
    if (isMobile) onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      genres: [],
      yearRange: { min: 1900, max: new Date().getFullYear() },
      rating: 0,
      cast: '',
      director: '',
      availability: []
    };
    setLocalFilters(resetFilters);
    onResetFilters();
  };

  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div 
              className="absolute bottom-0 left-0 right-0 bg-surface rounded-t-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-lg font-heading font-heading-bold text-text-primary">Filters</h2>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <Icon name="X" size={20} color="currentColor" />
                </Button>
              </div>

              {/* Filter Content */}
              <div className="p-4 space-y-6">
                <FilterContent
                  localFilters={localFilters}
                  genres={genres}
                  handleGenreToggle={handleGenreToggle}
                  handleYearChange={handleYearChange}
                  setLocalFilters={setLocalFilters}
                />
              </div>

              {/* Actions */}
              <div className="p-4 border-t border-border bg-background">
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="flex-1"
                  >
                    Reset
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleApply}
                    className="flex-1"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop Sidebar
  return (
    <div className={`w-80 bg-surface border-r border-border transition-all duration-300 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } fixed left-0 top-32 bottom-0 z-40 overflow-y-auto lg:relative lg:top-0 lg:translate-x-0`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-heading font-heading-bold text-text-primary">Filters</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
            <Icon name="X" size={20} color="currentColor" />
          </Button>
        </div>

        <div className="space-y-6">
          <FilterContent
            localFilters={localFilters}
            genres={genres}
            handleGenreToggle={handleGenreToggle}
            handleYearChange={handleYearChange}
            setLocalFilters={setLocalFilters}
          />
        </div>

        <div className="flex space-x-3 mt-8">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex-1"
          >
            Reset
          </Button>
          <Button
            variant="primary"
            onClick={handleApply}
            className="flex-1"
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

const FilterContent = ({ localFilters, genres, handleGenreToggle, handleYearChange, setLocalFilters }) => {
  return (
    <>
      {/* Genres */}
      <div>
        <h3 className="text-sm font-body-semibold text-text-primary mb-3">Genres</h3>
        <div className="grid grid-cols-2 gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreToggle(genre)}
              className={`p-2 rounded-lg text-sm transition-all duration-200 ${
                localFilters.genres.includes(genre)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-text-secondary hover:text-text-primary hover:bg-background/80'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Release Year */}
      <div>
        <h3 className="text-sm font-body-semibold text-text-primary mb-3">Release Year</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Input
              type="number"
              placeholder="From"
              value={localFilters.yearRange.min}
              onChange={(e) => handleYearChange('min', e.target.value)}
              className="flex-1"
            />
            <span className="text-text-secondary">to</span>
            <Input
              type="number"
              placeholder="To"
              value={localFilters.yearRange.max}
              onChange={(e) => handleYearChange('max', e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-sm font-body-semibold text-text-primary mb-3">Minimum Rating</h3>
        <div className="flex items-center space-x-2">
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={localFilters.rating}
            onChange={(e) => setLocalFilters(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
            className="flex-1 accent-primary"
          />
          <span className="text-text-primary font-body-semibold w-8">{localFilters.rating}</span>
        </div>
      </div>

      {/* Cast */}
      <div>
        <h3 className="text-sm font-body-semibold text-text-primary mb-3">Cast</h3>
        <Input
          type="text"
          placeholder="Search by actor name..."
          value={localFilters.cast}
          onChange={(e) => setLocalFilters(prev => ({ ...prev, cast: e.target.value }))}
        />
      </div>

      {/* Director */}
      <div>
        <h3 className="text-sm font-body-semibold text-text-primary mb-3">Director</h3>
        <Input
          type="text"
          placeholder="Search by director name..."
          value={localFilters.director}
          onChange={(e) => setLocalFilters(prev => ({ ...prev, director: e.target.value }))}
        />
      </div>
    </>
  );
};

export default FilterSidebar;