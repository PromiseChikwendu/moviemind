import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EmptyWatchlistState = () => {
  const trendingMovies = [
    {
      id: 1,
      title: "Oppenheimer",
      poster: "https://images.unsplash.com/photo-1489599735734-79b4212bdd26?w=300&h=450&fit=crop",
      rating: 8.4,
      year: 2023,
      genre: "Biography"
    },
    {
      id: 2,
      title: "Barbie",
      poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop",
      rating: 7.2,
      year: 2023,
      genre: "Comedy"
    },
    {
      id: 3,
      title: "Dune: Part Two",
      poster: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop",
      rating: 8.8,
      year: 2024,
      genre: "Sci-Fi"
    },
    {
      id: 4,
      title: "The Batman",
      poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop",
      rating: 7.8,
      year: 2022,
      genre: "Action"
    }
  ];

  const personalizedSuggestions = [
    {
      id: 5,
      title: "Inception",
      poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop",
      rating: 8.8,
      year: 2010,
      genre: "Sci-Fi",
      reason: "Based on your love for mind-bending plots"
    },
    {
      id: 6,
      title: "Parasite",
      poster: "https://images.unsplash.com/photo-1489599735734-79b4212bdd26?w=300&h=450&fit=crop",
      rating: 8.6,
      year: 2019,
      genre: "Thriller",
      reason: "Highly rated thriller you might enjoy"
    },
    {
      id: 7,
      title: "La La Land",
      poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop",
      rating: 8.0,
      year: 2016,
      genre: "Musical",
      reason: "Perfect for your weekend movie night"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Empty State Hero */}
      <div className="text-center py-12 px-4">
        <div className="max-w-md mx-auto">
          {/* Illustration */}
          <div className="w-32 h-32 mx-auto mb-6 bg-surface rounded-full flex items-center justify-center">
            <Icon name="Bookmark" size={48} color="#E50914" strokeWidth={1.5} />
          </div>

          {/* Title & Description */}
          <h2 className="text-2xl font-heading font-heading-bold text-text-primary mb-3">
            Your Watchlist is Empty
          </h2>
          <p className="text-text-secondary font-body mb-8 leading-relaxed">
            Start building your personal movie collection by adding films you want to watch. 
            Discover new favorites and never forget a recommendation again.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/movie-search-browse">
              <Button
                variant="primary"
                iconName="Search"
                iconPosition="left"
                fullWidth
                className="sm:w-auto"
              >
                Browse Movies
              </Button>
            </Link>
            <Link to="/movie-discovery-dashboard">
              <Button
                variant="outline"
                iconName="Compass"
                iconPosition="left"
                fullWidth
                className="sm:w-auto"
              >
                Discover New
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Trending Movies Section */}
      <div className="px-4 lg:px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-heading font-heading-bold text-text-primary mb-2">
                Trending This Week
              </h3>
              <p className="text-text-secondary font-body text-sm">
                Popular movies everyone's talking about
              </p>
            </div>
            <Link to="/movie-search-browse">
              <Button variant="ghost" iconName="ArrowRight" iconPosition="right">
                View All
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trendingMovies.map((movie) => (
              <div key={movie.id} className="group cursor-pointer">
                <div className="bg-surface border border-border rounded-lg overflow-hidden hover:shadow-elevation-md transition-all duration-200">
                  <div className="aspect-[2/3] bg-background relative">
                    <Image
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <Button
                        variant="primary"
                        size="sm"
                        iconName="Plus"
                        iconPosition="left"
                      >
                        Add to Watchlist
                      </Button>
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="font-heading font-heading-semibold text-text-primary text-sm mb-1 line-clamp-2">
                      {movie.title}
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-secondary font-body">
                        {movie.year}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={12} color="#FFD700" fill="#FFD700" />
                        <span className="text-xs font-body-semibold text-warning">
                          {movie.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Personalized Suggestions */}
      <div className="px-4 lg:px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-heading font-heading-bold text-text-primary mb-2">
                Recommended for You
              </h3>
              <p className="text-text-secondary font-body text-sm">
                Handpicked movies based on your preferences
              </p>
            </div>
            <Button variant="ghost" iconName="RefreshCw" iconPosition="left">
              Refresh
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {personalizedSuggestions.map((movie) => (
              <div key={movie.id} className="bg-surface border border-border rounded-lg p-4 hover:shadow-elevation-md transition-all duration-200 group">
                <div className="flex space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-24 bg-background rounded-lg overflow-hidden">
                      <Image
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading font-heading-semibold text-text-primary mb-1 line-clamp-2">
                      {movie.title}
                    </h4>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm text-text-secondary font-body">
                        {movie.year}
                      </span>
                      <span className="text-text-secondary">•</span>
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={12} color="#FFD700" fill="#FFD700" />
                        <span className="text-sm font-body-semibold text-warning">
                          {movie.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-text-secondary font-body mb-3 line-clamp-2">
                      {movie.reason}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Plus"
                      iconPosition="left"
                      fullWidth
                    >
                      Add to Watchlist
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="px-4 lg:px-6 pb-20 lg:pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-surface border border-border rounded-lg p-6">
            <h3 className="text-lg font-heading font-heading-bold text-text-primary mb-4">
              Pro Tips for Your Watchlist
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Search" size={16} color="#E50914" />
                </div>
                <div>
                  <h4 className="font-body font-body-semibold text-text-primary mb-1">
                    Use Search & Filters
                  </h4>
                  <p className="text-sm text-text-secondary font-body">
                    Find movies by genre, year, rating, or cast to discover hidden gems.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Bell" size={16} color="#FFD700" />
                </div>
                <div>
                  <h4 className="font-body font-body-semibold text-text-primary mb-1">
                    Get Notifications
                  </h4>
                  <p className="text-sm text-text-secondary font-body">
                    We'll notify you when your watchlisted movies are available to stream.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Users" size={16} color="#46D369" />
                </div>
                <div>
                  <h4 className="font-body font-body-semibold text-text-primary mb-1">
                    Follow Friends
                  </h4>
                  <p className="text-sm text-text-secondary font-body">
                    See what your friends are watching and get personalized recommendations.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Share" size={16} color="#FF9500" />
                </div>
                <div>
                  <h4 className="font-body font-body-semibold text-text-primary mb-1">
                    Share Your List
                  </h4>
                  <p className="text-sm text-text-secondary font-body">
                    Export and share your watchlist with friends and family.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyWatchlistState;