import React from 'react';

import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MovieCard = ({ movie, onAddToWatchlist, isInWatchlist = false }) => {
  const handleWatchlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToWatchlist(movie.id);
  };

  return (
    <div className="relative group bg-surface rounded-xl overflow-hidden shadow-elevation-sm hover:shadow-elevation-md transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Rating Badge */}
        <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center space-x-1">
          <Icon name="Star" size={12} color="#FFD700" strokeWidth={2} />
          <span className="text-xs font-body-semibold text-white">{movie.rating}</span>
        </div>

        {/* Watchlist Button */}
        <button
          onClick={handleWatchlistClick}
          className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
            isInWatchlist 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-black/60 text-white hover:bg-primary hover:text-primary-foreground'
          }`}
        >
          <Icon 
            name={isInWatchlist ? "BookmarkCheck" : "Bookmark"} 
            size={16} 
            strokeWidth={2}
          />
        </button>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-primary/90 hover:bg-primary text-primary-foreground p-3 rounded-full shadow-elevation-lg transform scale-90 group-hover:scale-100 transition-transform duration-200">
            <Icon name="Play" size={20} strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="p-3">
        <h3 className="font-heading font-heading-semibold text-text-primary text-sm line-clamp-2 mb-1">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span className="font-body">{movie.year}</span>
          <span className="font-body">{movie.genre}</span>
        </div>
        <div className="flex items-center space-x-1 mt-1">
          <Icon name="Clock" size={12} color="#B3B3B3" strokeWidth={2} />
          <span className="text-xs text-text-secondary font-body">{movie.duration}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;