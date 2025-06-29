import React from 'react';
import MovieCard from './MovieCard';

const MovieGrid = ({ 
  movies, 
  loading, 
  onAddToWatchlist, 
  onRemoveFromWatchlist, 
  watchlistIds 
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="aspect-[2/3] bg-surface rounded-xl mb-3"></div>
            <div className="space-y-2">
              <div className="h-4 bg-surface rounded w-3/4"></div>
              <div className="h-3 bg-surface rounded w-1/2"></div>
              <div className="flex space-x-1">
                <div className="h-5 bg-surface rounded-full w-12"></div>
                <div className="h-5 bg-surface rounded-full w-16"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-12 h-12 text-text-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-heading font-heading-bold text-text-primary mb-2">
          No movies found
        </h3>
        <p className="text-text-secondary max-w-md">
          Try adjusting your search terms or filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onAddToWatchlist={onAddToWatchlist}
          onRemoveFromWatchlist={onRemoveFromWatchlist}
          isInWatchlist={watchlistIds.includes(movie.id)}
        />
      ))}
    </div>
  );
};

export default MovieGrid;