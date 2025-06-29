import React from 'react';

const GenreFilter = ({ genres, selectedGenre, onGenreSelect }) => {
  return (
    <div className="mb-6">
      <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-2">
        <button
          onClick={() => onGenreSelect('all')}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-body-semibold transition-all duration-200 ${
            selectedGenre === 'all' ?'bg-primary text-primary-foreground shadow-elevation-sm' :'bg-surface text-text-secondary hover:text-text-primary hover:bg-surface/80'
          }`}
        >
          All Genres
        </button>
        
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => onGenreSelect(genre)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-body-semibold transition-all duration-200 ${
              selectedGenre === genre
                ? 'bg-primary text-primary-foreground shadow-elevation-sm'
                : 'bg-surface text-text-secondary hover:text-text-primary hover:bg-surface/80'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;