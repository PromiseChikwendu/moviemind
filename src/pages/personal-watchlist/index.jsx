import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import WatchlistHeader from './components/WatchlistHeader';
import WatchlistMovieCard from './components/WatchlistMovieCard';
import EmptyWatchlistState from './components/EmptyWatchlistState';
import BulkActionsBar from './components/BulkActionsBar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const PersonalWatchlist = () => {
  const navigate = useNavigate();
  
  // Mock watchlist data
  const [watchlistMovies] = useState([
    {
      id: 1,
      title: "Oppenheimer",
      poster: "https://images.unsplash.com/photo-1489599735734-79b4212bdd26?w=400&h=600&fit=crop",
      rating: 8.4,
      year: 2023,
      duration: "3h 0m",
      genre: "Biography",
      addedDate: "2 days ago",
      watched: false,
      isFavorite: false,
      streamingPlatforms: ["Netflix", "Prime Video"],
      personalRating: null,
      notes: ""
    },
    {
      id: 2,
      title: "Barbie",
      poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      rating: 7.2,
      year: 2023,
      duration: "1h 54m",
      genre: "Comedy",
      addedDate: "1 week ago",
      watched: true,
      isFavorite: true,
      streamingPlatforms: ["HBO Max"],
      personalRating: 8.0,
      notes: "Surprisingly deep and entertaining!"
    },
    {
      id: 3,
      title: "Dune: Part Two",
      poster: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
      rating: 8.8,
      year: 2024,
      duration: "2h 46m",
      genre: "Sci-Fi",
      addedDate: "3 days ago",
      watched: false,
      isFavorite: false,
      streamingPlatforms: ["Prime Video"],
      personalRating: null,
      notes: ""
    },
    {
      id: 4,
      title: "The Batman",
      poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      rating: 7.8,
      year: 2022,
      duration: "2h 56m",
      genre: "Action",
      addedDate: "2 weeks ago",
      watched: true,
      isFavorite: false,
      streamingPlatforms: ["Netflix"],
      personalRating: 7.5,
      notes: "Great cinematography, a bit long"
    },
    {
      id: 5,
      title: "Everything Everywhere All at Once",
      poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
      rating: 7.8,
      year: 2022,
      duration: "2h 19m",
      genre: "Sci-Fi",
      addedDate: "1 month ago",
      watched: false,
      isFavorite: true,
      streamingPlatforms: ["Prime Video", "Apple TV"],
      personalRating: null,
      notes: ""
    },
    {
      id: 6,
      title: "Top Gun: Maverick",
      poster: "https://images.unsplash.com/photo-1489599735734-79b4212bdd26?w=400&h=600&fit=crop",
      rating: 8.3,
      year: 2022,
      duration: "2h 11m",
      genre: "Action",
      addedDate: "3 weeks ago",
      watched: true,
      isFavorite: true,
      streamingPlatforms: ["Paramount+"],
      personalRating: 9.0,
      notes: "Incredible action sequences!"
    },
    {
      id: 7,
      title: "Nope",
      poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      rating: 6.8,
      year: 2022,
      duration: "2h 10m",
      genre: "Horror",
      addedDate: "1 week ago",
      watched: false,
      isFavorite: false,
      streamingPlatforms: ["Peacock"],
      personalRating: null,
      notes: ""
    },
    {
      id: 8,
      title: "Avatar: The Way of Water",
      poster: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
      rating: 7.6,
      year: 2022,
      duration: "3h 12m",
      genre: "Sci-Fi",
      addedDate: "2 months ago",
      watched: false,
      isFavorite: false,
      streamingPlatforms: ["Disney+"],
      personalRating: null,
      notes: ""
    }
  ]);

  // State management
  const [sortBy, setSortBy] = useState('recently-added');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filterBy, setFilterBy] = useState('all');

  // Filtered and sorted movies
  const filteredAndSortedMovies = useMemo(() => {
    let filtered = watchlistMovies;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.year.toString().includes(searchQuery)
      );
    }

    // Apply status filter
    switch (filterBy) {
      case 'unwatched':
        filtered = filtered.filter(movie => !movie.watched);
        break;
      case 'watched':
        filtered = filtered.filter(movie => movie.watched);
        break;
      case 'favorites':
        filtered = filtered.filter(movie => movie.isFavorite);
        break;
      default:
        break;
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'recently-added':
          return new Date(b.addedDate) - new Date(a.addedDate);
        case 'release-date':
          return b.year - a.year;
        case 'rating':
          return b.rating - a.rating;
        case 'genre':
          return a.genre.localeCompare(b.genre);
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return sorted;
  }, [watchlistMovies, searchQuery, sortBy, filterBy]);

  // Handle pull-to-refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  // Movie actions
  const handleRemoveMovie = async (movieId) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Removing movie:', movieId);
  };

  const handleMarkWatched = (movieId) => {
    console.log('Marking as watched:', movieId);
  };

  const handleMoveToFavorites = (movieId) => {
    console.log('Moving to favorites:', movieId);
  };

  // Bulk actions
  const handleSelectAll = () => {
    setSelectedMovies(filteredAndSortedMovies.map(movie => movie.id));
  };

  const handleDeselectAll = () => {
    setSelectedMovies([]);
  };

  const handleBulkMarkWatched = () => {
    console.log('Bulk marking as watched:', selectedMovies);
    setSelectedMovies([]);
  };

  const handleBulkRemove = () => {
    console.log('Bulk removing:', selectedMovies);
    setSelectedMovies([]);
  };

  const handleBulkMoveToFavorites = () => {
    console.log('Bulk moving to favorites:', selectedMovies);
    setSelectedMovies([]);
  };

  // Handle movie selection
  const handleMovieSelect = (movieId) => {
    setSelectedMovies(prev => 
      prev.includes(movieId) 
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    );
  };

  // Show empty state if no movies
  if (watchlistMovies.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 lg:pt-32">
          <EmptyWatchlistState />
        </div>
        <BottomTabNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main Content */}
      <div className="pt-16 lg:pt-32 pb-20 lg:pb-8">
        <WatchlistHeader
          movieCount={filteredAndSortedMovies.length}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
        />

        {/* Refresh Indicator */}
        {isRefreshing && (
          <div className="flex items-center justify-center py-4">
            <div className="flex items-center space-x-2 text-text-secondary">
              <Icon name="RefreshCw" size={16} className="animate-spin" />
              <span className="text-sm font-body">Updating availability...</span>
            </div>
          </div>
        )}

        {/* Movies Grid/List */}
        <div className="px-4 lg:px-6">
          <div className="max-w-7xl mx-auto">
            {filteredAndSortedMovies.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="Search" size={48} color="#B3B3B3" className="mx-auto mb-4" />
                <h3 className="text-lg font-heading font-heading-semibold text-text-primary mb-2">
                  No movies found
                </h3>
                <p className="text-text-secondary font-body mb-4">
                  Try adjusting your search or filters
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setFilterBy('all');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6" :"space-y-4"
              }>
                {filteredAndSortedMovies.map((movie) => (
                  <div key={movie.id} className="relative">
                    {/* Selection Checkbox - Desktop Only */}
                    {selectedMovies.length > 0 && (
                      <div className="absolute top-2 left-2 z-10 hidden lg:block">
                        <button
                          onClick={() => handleMovieSelect(movie.id)}
                          className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                            selectedMovies.includes(movie.id)
                              ? 'bg-primary border-primary' :'bg-background/80 border-border hover:border-primary'
                          }`}
                        >
                          {selectedMovies.includes(movie.id) && (
                            <Icon name="Check" size={14} color="#FFFFFF" strokeWidth={2.5} />
                          )}
                        </button>
                      </div>
                    )}
                    
                    <WatchlistMovieCard
                      movie={movie}
                      onRemove={handleRemoveMovie}
                      onMarkWatched={handleMarkWatched}
                      onMoveToFavorites={handleMoveToFavorites}
                      viewMode={viewMode}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Load More Button */}
        {filteredAndSortedMovies.length > 0 && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              iconName="ChevronDown"
              iconPosition="right"
            >
              Load More Movies
            </Button>
          </div>
        )}
      </div>

      {/* Bulk Actions Bar */}
      <BulkActionsBar
        selectedCount={selectedMovies.length}
        totalCount={filteredAndSortedMovies.length}
        isAllSelected={selectedMovies.length === filteredAndSortedMovies.length}
        onSelectAll={handleSelectAll}
        onDeselectAll={handleDeselectAll}
        onBulkMarkWatched={handleBulkMarkWatched}
        onBulkRemove={handleBulkRemove}
        onBulkMoveToFavorites={handleBulkMoveToFavorites}
      />

      {/* Floating Action Button - Mobile */}
      <div className="fixed bottom-24 right-4 z-50 lg:hidden">
        <Button
          variant="primary"
          size="lg"
          shape="circle"
          onClick={() => navigate('/movie-search-browse')}
          iconName="Plus"
          className="shadow-elevation-lg"
        />
      </div>

      <BottomTabNavigation />
    </div>
  );
};

export default PersonalWatchlist;