import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const PreferencesSettings = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState(['Action', 'Drama', 'Sci-Fi']);
  const [contentRating, setContentRating] = useState('PG-13');
  const [streamingServices, setStreamingServices] = useState(['Netflix', 'Prime Video']);

  const genres = [
    'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
    'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music',
    'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'War', 'Western'
  ];

  const contentRatings = ['G', 'PG', 'PG-13', 'R', 'NC-17'];

  const services = [
    { name: 'Netflix', icon: 'Play' },
    { name: 'Prime Video', icon: 'Play' },
    { name: 'Disney+', icon: 'Play' },
    { name: 'HBO Max', icon: 'Play' },
    { name: 'Hulu', icon: 'Play' },
    { name: 'Apple TV+', icon: 'Play' }
  ];

  const toggleGenre = (genre) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const toggleService = (service) => {
    setStreamingServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  return (
    <div className="bg-surface rounded-xl shadow-elevation-md overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 flex items-center justify-between hover:bg-surface/80 transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Heart" size={20} color="#FFD700" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-heading font-heading-semibold text-text-primary">
              Movie Preferences
            </h3>
            <p className="text-text-secondary font-body text-sm">
              Customize your recommendation algorithm
            </p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          color="#B3B3B3" 
          className="transition-transform duration-200"
        />
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 space-y-6 border-t border-border">
          {/* Favorite Genres */}
          <div className="space-y-3">
            <h4 className="text-text-primary font-body font-body-semibold text-sm">
              Favorite Genres
            </h4>
            <p className="text-text-secondary font-body text-xs">
              Select your preferred genres to get better recommendations
            </p>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={`px-3 py-1.5 rounded-full text-sm font-body transition-all duration-200 ${
                    selectedGenres.includes(genre)
                      ? 'bg-primary text-primary-foreground shadow-elevation-sm'
                      : 'bg-background text-text-secondary hover:bg-surface hover:text-text-primary border border-border'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Content Rating */}
          <div className="space-y-3">
            <h4 className="text-text-primary font-body font-body-semibold text-sm">
              Content Rating Preference
            </h4>
            <div className="flex flex-wrap gap-2">
              {contentRatings.map((rating) => (
                <button
                  key={rating}
                  onClick={() => setContentRating(rating)}
                  className={`px-4 py-2 rounded-lg text-sm font-body transition-all duration-200 ${
                    contentRating === rating
                      ? 'bg-accent text-accent-foreground shadow-elevation-sm'
                      : 'bg-background text-text-secondary hover:bg-surface hover:text-text-primary border border-border'
                  }`}
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>

          {/* Streaming Services */}
          <div className="space-y-3">
            <h4 className="text-text-primary font-body font-body-semibold text-sm">
              Available Streaming Services
            </h4>
            <p className="text-text-secondary font-body text-xs">
              Filter recommendations by your subscriptions
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {services.map((service) => (
                <button
                  key={service.name}
                  onClick={() => toggleService(service.name)}
                  className={`p-3 rounded-lg border transition-all duration-200 flex items-center space-x-2 ${
                    streamingServices.includes(service.name)
                      ? 'bg-primary/10 border-primary text-primary' :'bg-background border-border text-text-secondary hover:bg-surface hover:text-text-primary'
                  }`}
                >
                  <Icon 
                    name={service.icon} 
                    size={16} 
                    color={streamingServices.includes(service.name) ? '#E50914' : '#B3B3B3'} 
                  />
                  <span className="text-sm font-body">{service.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Language Preferences */}
          <div className="space-y-3">
            <h4 className="text-text-primary font-body font-body-semibold text-sm">
              Language Preferences
            </h4>
            <div className="space-y-2">
              <label className="flex items-center justify-between">
                <span className="text-text-secondary font-body text-sm">
                  Include foreign language films
                </span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-text-secondary font-body text-sm">
                  Show subtitled content
                </span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreferencesSettings;