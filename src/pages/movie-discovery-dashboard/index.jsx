import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Header from '../../components/ui/Header';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import HeroSection from './components/HeroSection';
import MovieCarousel from './components/MovieCarousel';
import GenreFilter from './components/GenreFilter';
import ActivityFeed from './components/ActivityFeed';
import UserStats from './components/UserStats';
import LoadingSpinner from './components/LoadingSpinner';

const MovieDiscoveryDashboard = () => {
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [watchlistIds, setWatchlistIds] = useState([1, 5, 8, 12]);

  // Mock data
  const featuredMovie = {
    id: 1,
    title: "The Dark Knight",
    description: `When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.\n\nWith the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.`,
    backdrop: "https://images.unsplash.com/photo-1489599735734-79b4212bea79?w=1200&h=600&fit=crop",
    poster: "https://images.unsplash.com/photo-1489599735734-79b4212bea79?w=400&h=600&fit=crop",
    rating: 9.0,
    year: 2008,
    genre: "Action",
    duration: "2h 32m"
  };

  const recommendedMovies = [
    {
      id: 1,
      title: "The Dark Knight",
      poster: "https://images.unsplash.com/photo-1489599735734-79b4212bea79?w=400&h=600&fit=crop",
      rating: 9.0,
      year: 2008,
      genre: "Action",
      duration: "2h 32m"
    },
    {
      id: 2,
      title: "Inception",
      poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
      rating: 8.8,
      year: 2010,
      genre: "Sci-Fi",
      duration: "2h 28m"
    },
    {
      id: 3,
      title: "Interstellar",
      poster: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=600&fit=crop",
      rating: 8.6,
      year: 2014,
      genre: "Sci-Fi",
      duration: "2h 49m"
    },
    {
      id: 4,
      title: "The Godfather",
      poster: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=600&fit=crop",
      rating: 9.2,
      year: 1972,
      genre: "Crime",
      duration: "2h 55m"
    },
    {
      id: 5,
      title: "Pulp Fiction",
      poster: "https://images.unsplash.com/photo-1489599735734-79b4212bea79?w=400&h=600&fit=crop",
      rating: 8.9,
      year: 1994,
      genre: "Crime",
      duration: "2h 34m"
    }
  ];

  const trendingMovies = [
    {
      id: 6,
      title: "Dune: Part Two",
      poster: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=600&fit=crop",
      rating: 8.7,
      year: 2024,
      genre: "Sci-Fi",
      duration: "2h 46m"
    },
    {
      id: 7,
      title: "Oppenheimer",
      poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
      rating: 8.4,
      year: 2023,
      genre: "Biography",
      duration: "3h 0m"
    },
    {
      id: 8,
      title: "Spider-Man: No Way Home",
      poster: "https://images.unsplash.com/photo-1489599735734-79b4212bea79?w=400&h=600&fit=crop",
      rating: 8.2,
      year: 2021,
      genre: "Action",
      duration: "2h 28m"
    },
    {
      id: 9,
      title: "Top Gun: Maverick",
      poster: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=600&fit=crop",
      rating: 8.3,
      year: 2022,
      genre: "Action",
      duration: "2h 11m"
    },
    {
      id: 10,
      title: "Avatar: The Way of Water",
      poster: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=600&fit=crop",
      rating: 7.6,
      year: 2022,
      genre: "Sci-Fi",
      duration: "3h 12m"
    }
  ];

  const recentlyAddedMovies = [
    {
      id: 11,
      title: "The Batman",
      poster: "https://images.unsplash.com/photo-1489599735734-79b4212bea79?w=400&h=600&fit=crop",
      rating: 7.8,
      year: 2022,
      genre: "Action",
      duration: "2h 56m"
    },
    {
      id: 12,
      title: "Everything Everywhere All at Once",
      poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
      rating: 7.8,
      year: 2022,
      genre: "Comedy",
      duration: "2h 19m"
    },
    {
      id: 13,
      title: "The Menu",
      poster: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=600&fit=crop",
      rating: 7.2,
      year: 2022,
      genre: "Thriller",
      duration: "1h 47m"
    },
    {
      id: 14,
      title: "Glass Onion",
      poster: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=600&fit=crop",
      rating: 7.1,
      year: 2022,
      genre: "Mystery",
      duration: "2h 19m"
    }
  ];

  const genres = ["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Thriller", "Crime", "Biography", "Mystery"];

  const userStats = {
    moviesWatched: 247,
    watchlistCount: 23,
    reviewsCount: 45,
    averageRating: "4.2"
  };

  const friendActivities = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
      },
      type: "watched",
      action: "just watched",
      movie: "The Batman",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      user: {
        name: "Mike Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
      },
      type: "rated",
      action: "rated 5 stars",
      movie: "Dune: Part Two",
      timestamp: "4 hours ago"
    },
    {
      id: 3,
      user: {
        name: "Emma Wilson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
      },
      type: "added",
      action: "added to watchlist",
      movie: "Oppenheimer",
      timestamp: "6 hours ago"
    },
    {
      id: 4,
      user: {
        name: "David Rodriguez",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
      },
      type: "reviewed",
      action: "wrote a review for",
      movie: "Everything Everywhere All at Once",
      timestamp: "1 day ago"
    }
  ];

  const handleAddToWatchlist = (movieId) => {
    setWatchlistIds(prev => 
      prev.includes(movieId) 
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    );
  };

  const handlePlayTrailer = (movieId) => {
    console.log('Playing trailer for movie:', movieId);
    // Trailer functionality would be implemented here
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate refresh
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main Content */}
      <main className="pt-16 md:pt-32 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Sidebar - Desktop Only */}
            <aside className="hidden lg:block w-80 space-y-6">
              <UserStats stats={userStats} />
              
              {/* Quick Actions */}
              <div className="bg-surface rounded-xl p-4 shadow-elevation-sm">
                <h3 className="text-lg font-heading font-heading-semibold text-text-primary mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Link
                    to="/movie-search-browse"
                    className="flex items-center space-x-3 p-3 bg-background hover:bg-background/80 rounded-lg transition-colors duration-200"
                  >
                    <Icon name="Search" size={20} color="#E50914" strokeWidth={2} />
                    <span className="text-text-primary font-body">Browse Movies</span>
                  </Link>
                  <Link
                    to="/personal-watchlist"
                    className="flex items-center space-x-3 p-3 bg-background hover:bg-background/80 rounded-lg transition-colors duration-200"
                  >
                    <Icon name="Bookmark" size={20} color="#E50914" strokeWidth={2} />
                    <span className="text-text-primary font-body">My Watchlist</span>
                  </Link>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1">
              {/* Pull to Refresh Indicator */}
              {isLoading && (
                <div className="mb-4">
                  <LoadingSpinner message="Updating recommendations..." />
                </div>
              )}

              {/* Hero Section */}
              <HeroSection
                featuredMovie={featuredMovie}
                onAddToWatchlist={handleAddToWatchlist}
                onPlayTrailer={handlePlayTrailer}
              />

              {/* Genre Filter */}
              <GenreFilter
                genres={genres}
                selectedGenre={selectedGenre}
                onGenreSelect={handleGenreSelect}
              />

              {/* Movie Carousels */}
              <div className="space-y-8">
                <MovieCarousel
                  title="Recommended for You"
                  movies={recommendedMovies}
                  onAddToWatchlist={handleAddToWatchlist}
                  watchlistIds={watchlistIds}
                />

                <MovieCarousel
                  title="Trending Now"
                  movies={trendingMovies}
                  onAddToWatchlist={handleAddToWatchlist}
                  watchlistIds={watchlistIds}
                />

                <MovieCarousel
                  title="Recently Added"
                  movies={recentlyAddedMovies}
                  onAddToWatchlist={handleAddToWatchlist}
                  watchlistIds={watchlistIds}
                />
              </div>

              {/* Mobile Stats - Mobile Only */}
              <div className="lg:hidden mt-8">
                <UserStats stats={userStats} />
              </div>
            </div>

            {/* Right Sidebar - Desktop Only */}
            <aside className="hidden lg:block w-80">
              <ActivityFeed activities={friendActivities} />
            </aside>
          </div>
        </div>

        {/* Refresh Button - Mobile */}
        <button
          onClick={handleRefresh}
          className="fixed bottom-24 right-4 md:hidden bg-primary hover:bg-primary/90 text-primary-foreground p-3 rounded-full shadow-elevation-lg transition-all duration-200 z-50"
        >
          <Icon name="RefreshCw" size={20} strokeWidth={2} />
        </button>
      </main>

      <BottomTabNavigation />
    </div>
  );
};

export default MovieDiscoveryDashboard;