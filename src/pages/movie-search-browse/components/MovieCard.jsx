import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MovieCard = ({ movie, onAddToWatchlist, onRemoveFromWatchlist, isInWatchlist }) => {
  const handleWatchlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWatchlist) {
      onRemoveFromWatchlist(movie.id);
    } else {
      onAddToWatchlist(movie);
    }
  };

  return (
    <Link
      to={`/movie-details/${movie.id}`}
      className="group block bg-surface hover:bg-surface/80 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-elevation-md hover:scale-105"
    >
      <div className="relative">
        <div className="aspect-[2/3] overflow-hidden">
          <Image
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-3 left-3 right-3">
            <Button
              variant={isInWatchlist ? "success" : "secondary"}
              size="sm"
              onClick={handleWatchlistClick}
              className="w-full bg-background/90 hover:bg-background text-text-primary border-0"
              iconName={isInWatchlist ? "Check" : "Plus"}
              iconSize={16}
            >
              {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
            </Button>
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-lg">
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={12} color="#FFD700" strokeWidth={0} fill="#FFD700" />
            <span className="text-xs font-body-semibold text-text-primary">{movie.rating}</span>
          </div>
        </div>

        {/* New Badge */}
        {movie.isNew && (
          <div className="absolute top-3 left-3 bg-primary px-2 py-1 rounded-lg">
            <span className="text-xs font-body-semibold text-primary-foreground">NEW</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-heading font-heading-bold text-text-primary text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {movie.title}
        </h3>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-text-secondary text-xs">{movie.year}</span>
          <span className="text-text-secondary text-xs">{movie.duration}</span>
        </div>

        {/* Genre Tags */}
        <div className="flex flex-wrap gap-1 mb-2">
          {movie.genres.slice(0, 2).map((genre) => (
            <span
              key={genre}
              className="bg-background px-2 py-0.5 rounded-full text-xs text-text-secondary"
            >
              {genre}
            </span>
          ))}
          {movie.genres.length > 2 && (
            <span className="text-xs text-text-secondary">+{movie.genres.length - 2}</span>
          )}
        </div>

        {/* Director */}
        <p className="text-text-secondary text-xs line-clamp-1">
          Dir. {movie.director}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;