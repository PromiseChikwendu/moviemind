import React, { useState } from 'react';

const GenrePreferenceSelector = ({ selectedGenres, onGenreChange }) => {
  const genres = [
    { id: 'action', name: 'Action', emoji: '💥' },
    { id: 'comedy', name: 'Comedy', emoji: '😂' },
    { id: 'drama', name: 'Drama', emoji: '🎭' },
    { id: 'horror', name: 'Horror', emoji: '👻' },
    { id: 'romance', name: 'Romance', emoji: '💕' },
    { id: 'thriller', name: 'Thriller', emoji: '🔥' },
    { id: 'sci-fi', name: 'Sci-Fi', emoji: '🚀' },
    { id: 'fantasy', name: 'Fantasy', emoji: '🧙‍♂️' },
    { id: 'animation', name: 'Animation', emoji: '🎨' },
    { id: 'documentary', name: 'Documentary', emoji: '📽️' },
    { id: 'crime', name: 'Crime', emoji: '🕵️' },
    { id: 'adventure', name: 'Adventure', emoji: '🗺️' }
  ];

  const handleGenreToggle = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      onGenreChange(selectedGenres.filter(id => id !== genreId));
    } else if (selectedGenres.length < 5) {
      onGenreChange([...selectedGenres, genreId]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-body font-body-semibold text-text-primary">
          Choose Your Favorite Genres
        </label>
        <span className="text-xs text-text-secondary">
          {selectedGenres.length}/5 selected
        </span>
      </div>
      <p className="text-xs text-text-secondary">
        Select 3-5 genres to get personalized movie recommendations
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {genres.map((genre) => {
          const isSelected = selectedGenres.includes(genre.id);
          const isDisabled = !isSelected && selectedGenres.length >= 5;
          
          return (
            <button
              key={genre.id}
              type="button"
              onClick={() => handleGenreToggle(genre.id)}
              disabled={isDisabled}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                isSelected
                  ? 'bg-primary/10 border-primary text-primary shadow-elevation-sm'
                  : isDisabled
                  ? 'bg-surface/50 border-border text-text-secondary cursor-not-allowed opacity-50' :'bg-surface border-border text-text-secondary hover:border-primary/50 hover:text-text-primary hover:bg-surface/80'
              }`}
            >
              <span className="text-sm">{genre.emoji}</span>
              <span className="text-xs font-caption truncate">{genre.name}</span>
            </button>
          );
        })}
      </div>
      {selectedGenres.length < 3 && (
        <p className="text-xs text-warning">
          Please select at least 3 genres for better recommendations
        </p>
      )}
    </div>
  );
};

export default GenrePreferenceSelector;