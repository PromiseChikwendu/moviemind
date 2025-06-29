import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = ({ featuredMovie, onAddToWatchlist, onPlayTrailer }) => {
  return (
    <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden rounded-2xl mb-6">
      <Image
        src={featuredMovie.backdrop}
        alt={featuredMovie.title}
        className="w-full h-full object-cover"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      
      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="px-4 md:px-6 lg:px-8 max-w-2xl">
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-accent text-accent-foreground px-2 py-1 rounded-lg text-xs font-body-semibold">
              Featured Today
            </span>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} color="#FFD700" strokeWidth={2} />
              <span className="text-sm font-body-semibold text-white">{featuredMovie.rating}</span>
            </div>
          </div>
          
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-heading-bold text-white mb-2 line-clamp-2">
            {featuredMovie.title}
          </h1>
          
          <p className="text-text-secondary text-sm md:text-base font-body mb-4 line-clamp-3 max-w-lg">
            {featuredMovie.description}
          </p>
          
          <div className="flex items-center space-x-2 mb-4 text-sm text-text-secondary">
            <span className="font-body">{featuredMovie.year}</span>
            <span>•</span>
            <span className="font-body">{featuredMovie.genre}</span>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} color="#B3B3B3" strokeWidth={2} />
              <span className="font-body">{featuredMovie.duration}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="primary"
              iconName="Play"
              iconPosition="left"
              onClick={() => onPlayTrailer(featuredMovie.id)}
              className="shadow-elevation-md"
            >
              Watch Trailer
            </Button>
            
            <Button
              variant="outline"
              iconName="Bookmark"
              iconPosition="left"
              onClick={() => onAddToWatchlist(featuredMovie.id)}
              className="bg-black/40 backdrop-blur-sm border-white/20 text-white hover:bg-white/10"
            >
              Add to Watchlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;