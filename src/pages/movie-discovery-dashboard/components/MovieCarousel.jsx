import React, { useRef } from 'react';
import Icon from '../../../components/AppIcon';
import MovieCard from './MovieCard';

const MovieCarousel = ({ title, movies, onAddToWatchlist, watchlistIds = [] }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = 280; // Width of movie card + gap
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-heading font-heading-bold text-text-primary">
          {title}
        </h2>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 bg-surface hover:bg-surface/80 rounded-full transition-all duration-200 hover:shadow-elevation-sm"
          >
            <Icon name="ChevronLeft" size={20} color="#B3B3B3" strokeWidth={2} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 bg-surface hover:bg-surface/80 rounded-full transition-all duration-200 hover:shadow-elevation-sm"
          >
            <Icon name="ChevronRight" size={20} color="#B3B3B3" strokeWidth={2} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {movies.map((movie) => (
          <div key={movie.id} className="flex-shrink-0 w-48 md:w-52">
            <MovieCard
              movie={movie}
              onAddToWatchlist={onAddToWatchlist}
              isInWatchlist={watchlistIds.includes(movie.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;