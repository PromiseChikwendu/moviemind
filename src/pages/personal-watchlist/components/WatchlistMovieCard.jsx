import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const WatchlistMovieCard = ({ 
  movie, 
  onRemove, 
  onMarkWatched, 
  onMoveToFavorites,
  viewMode = 'grid' 
}) => {
  const [showActions, setShowActions] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async () => {
    setIsRemoving(true);
    await onRemove(movie.id);
    setIsRemoving(false);
  };

  const handleMarkWatched = () => {
    onMarkWatched(movie.id);
  };

  const handleMoveToFavorites = () => {
    onMoveToFavorites(movie.id);
  };

  const getRatingColor = (rating) => {
    if (rating >= 8) return 'text-success';
    if (rating >= 6) return 'text-warning';
    return 'text-error';
  };

  const getGenreColor = (genre) => {
    const colors = {
      'Action': 'bg-red-500/20 text-red-400',
      'Comedy': 'bg-yellow-500/20 text-yellow-400',
      'Drama': 'bg-blue-500/20 text-blue-400',
      'Horror': 'bg-purple-500/20 text-purple-400',
      'Romance': 'bg-pink-500/20 text-pink-400',
      'Sci-Fi': 'bg-green-500/20 text-green-400',
      'Thriller': 'bg-orange-500/20 text-orange-400'
    };
    return colors[genre] || 'bg-gray-500/20 text-gray-400';
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-surface border border-border rounded-lg p-4 hover:shadow-elevation-md transition-all duration-200 group">
        <div className="flex items-center space-x-4">
          {/* Poster */}
          <div className="flex-shrink-0">
            <Link to={`/movie-details/${movie.id}`}>
              <div className="w-16 h-24 rounded-lg overflow-hidden bg-background">
                <Image
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
          </div>

          {/* Movie Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <Link to={`/movie-details/${movie.id}`}>
                  <h3 className="text-lg font-heading font-heading-semibold text-text-primary group-hover:text-primary transition-colors duration-200 truncate">
                    {movie.title}
                  </h3>
                </Link>
                <p className="text-sm text-text-secondary font-body mt-1">
                  {movie.year} • {movie.duration}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} color="#FFD700" fill="#FFD700" />
                    <span className={`text-sm font-body-semibold ${getRatingColor(movie.rating)}`}>
                      {movie.rating}
                    </span>
                  </div>
                  <span className="text-text-secondary">•</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-caption ${getGenreColor(movie.genre)}`}>
                    {movie.genre}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 ml-4">
                {!movie.watched && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleMarkWatched}
                    iconName="Check"
                    className="text-success hover:bg-success/10"
                  />
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMoveToFavorites}
                  iconName="Heart"
                  className="text-primary hover:bg-primary/10"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemove}
                  loading={isRemoving}
                  iconName="Trash2"
                  className="text-error hover:bg-error/10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden hover:shadow-elevation-md transition-all duration-200 group relative">
      {/* Movie Poster */}
      <div className="relative">
        <Link to={`/movie-details/${movie.id}`}>
          <div className="aspect-[2/3] bg-background">
            <Image
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>

        {/* Status Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {movie.watched && (
            <span className="bg-success/90 text-success-foreground text-xs px-2 py-1 rounded-full font-caption-semibold backdrop-blur-sm">
              Watched
            </span>
          )}
          {movie.isFavorite && (
            <span className="bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded-full font-caption-semibold backdrop-blur-sm">
              Favorite
            </span>
          )}
        </div>

        {/* Quick Actions - Mobile */}
        <div className="absolute top-2 right-2 lg:hidden">
          <button
            onClick={() => setShowActions(!showActions)}
            className="w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center"
          >
            <Icon name="MoreVertical" size={16} color="#FFFFFF" />
          </button>
        </div>

        {/* Quick Actions - Desktop */}
        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden lg:flex items-center justify-center space-x-2">
          {!movie.watched && (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleMarkWatched}
              iconName="Check"
            >
              Mark Watched
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleMoveToFavorites}
            iconName="Heart"
            className="bg-background/50 hover:bg-primary/20"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            loading={isRemoving}
            iconName="Trash2"
            className="bg-background/50 hover:bg-error/20 text-error"
          />
        </div>
      </div>

      {/* Movie Details */}
      <div className="p-4">
        <Link to={`/movie-details/${movie.id}`}>
          <h3 className="text-base font-heading font-heading-semibold text-text-primary group-hover:text-primary transition-colors duration-200 line-clamp-2 mb-2">
            {movie.title}
          </h3>
        </Link>

        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-secondary font-body">
            {movie.year}
          </span>
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={14} color="#FFD700" fill="#FFD700" />
            <span className={`text-sm font-body-semibold ${getRatingColor(movie.rating)}`}>
              {movie.rating}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className={`text-xs px-2 py-1 rounded-full font-caption ${getGenreColor(movie.genre)}`}>
            {movie.genre}
          </span>
          <span className="text-xs text-text-secondary font-caption">
            Added {movie.addedDate}
          </span>
        </div>

        {/* Streaming Availability */}
        {movie.streamingPlatforms && movie.streamingPlatforms.length > 0 && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center space-x-2">
              <Icon name="Play" size={12} color="#B3B3B3" />
              <span className="text-xs text-text-secondary font-caption">
                Available on {movie.streamingPlatforms.join(', ')}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Action Menu */}
      {showActions && (
        <div className="absolute top-12 right-2 bg-surface border border-border rounded-lg shadow-elevation-lg z-50 lg:hidden">
          {!movie.watched && (
            <button
              onClick={handleMarkWatched}
              className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-background transition-colors duration-200 first:rounded-t-lg text-success"
            >
              <Icon name="Check" size={16} />
              <span className="font-body text-sm">Mark as Watched</span>
            </button>
          )}
          <button
            onClick={handleMoveToFavorites}
            className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-background transition-colors duration-200 text-primary"
          >
            <Icon name="Heart" size={16} />
            <span className="font-body text-sm">Add to Favorites</span>
          </button>
          <button
            onClick={handleRemove}
            className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-background transition-colors duration-200 last:rounded-b-lg text-error"
          >
            <Icon name="Trash2" size={16} />
            <span className="font-body text-sm">Remove from Watchlist</span>
          </button>
        </div>
      )}

      {/* Click outside to close mobile menu */}
      {showActions && (
        <div 
          className="fixed inset-0 z-40 lg:hidden" 
          onClick={() => setShowActions(false)}
        />
      )}
    </div>
  );
};

export default WatchlistMovieCard;