import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchHeader from './components/SearchHeader';
import FilterChips from './components/FilterChips';
import FilterSidebar from './components/FilterSidebar';
import SortDropdown from './components/SortDropdown';
import MovieGrid from './components/MovieGrid';
import LoadingSpinner from './components/LoadingSpinner';

const MovieSearchBrowse = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [currentSort, setCurrentSort] = useState('relevance');
  const [resultCount, setResultCount] = useState(0);
  const [watchlistIds, setWatchlistIds] = useState([1, 5, 8, 12]);

  // Filter state
  const [filters, setFilters] = useState({
    genres: [],
    yearRange: { min: 1900, max: new Date().getFullYear() },
    rating: 0,
    cast: '',
    director: '',
    availability: []
  });

  // Search suggestions
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([
    'The Dark Knight',
    'Inception',
    'Pulp Fiction',
    'The Godfather'
  ]);

  // Mock movie data
  const mockMovies = [
    {
      id: 1,
      title: "The Dark Knight",
      year: 2008,
      rating: 9.0,
      duration: "152 min",
      genres: ["Action", "Crime", "Drama"],
      director: "Christopher Nolan",
      poster: "https://images.unsplash.com/photo-1489599735734-79b4fc8c4c8b?w=400&h=600&fit=crop",
      isNew: false
    },
    {
      id: 2,
      title: "Inception",
      year: 2010,
      rating: 8.8,
      duration: "148 min",
      genres: ["Action", "Sci-Fi", "Thriller"],
      director: "Christopher Nolan",
      poster: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?w=400&h=600&fit=crop",
      isNew: false
    },
    {
      id: 3,
      title: "Dune: Part Two",
      year: 2024,
      rating: 8.5,
      duration: "166 min",
      genres: ["Action", "Adventure", "Sci-Fi"],
      director: "Denis Villeneuve",
      poster: "https://images.pixabay.com/photo/2023/11/20/15/31/ai-generated-8401001_1280.jpg?w=400&h=600&fit=crop",
      isNew: true
    },
    {
      id: 4,
      title: "Oppenheimer",
      year: 2023,
      rating: 8.3,
      duration: "180 min",
      genres: ["Biography", "Drama", "History"],
      director: "Christopher Nolan",
      poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
      isNew: true
    },
    {
      id: 5,
      title: "The Godfather",
      year: 1972,
      rating: 9.2,
      duration: "175 min",
      genres: ["Crime", "Drama"],
      director: "Francis Ford Coppola",
      poster: "https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?w=400&h=600&fit=crop",
      isNew: false
    },
    {
      id: 6,
      title: "Pulp Fiction",
      year: 1994,
      rating: 8.9,
      duration: "154 min",
      genres: ["Crime", "Drama"],
      director: "Quentin Tarantino",
      poster: "https://images.pixabay.com/photo/2019/04/26/07/14/store-4156934_1280.jpg?w=400&h=600&fit=crop",
      isNew: false
    },
    {
      id: 7,
      title: "Avatar: The Way of Water",
      year: 2022,
      rating: 7.6,
      duration: "192 min",
      genres: ["Action", "Adventure", "Fantasy"],
      director: "James Cameron",
      poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      isNew: false
    },
    {
      id: 8,
      title: "Top Gun: Maverick",
      year: 2022,
      rating: 8.3,
      duration: "130 min",
      genres: ["Action", "Drama"],
      director: "Joseph Kosinski",
      poster: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?w=400&h=600&fit=crop",
      isNew: false
    },
    {
      id: 9,
      title: "Spider-Man: No Way Home",
      year: 2021,
      rating: 8.4,
      duration: "148 min",
      genres: ["Action", "Adventure", "Fantasy"],
      director: "Jon Watts",
      poster: "https://images.pixabay.com/photo/2023/11/20/15/31/ai-generated-8401001_1280.jpg?w=400&h=600&fit=crop",
      isNew: false
    },
    {
      id: 10,
      title: "The Batman",
      year: 2022,
      rating: 7.8,
      duration: "176 min",
      genres: ["Action", "Crime", "Drama"],
      director: "Matt Reeves",
      poster: "https://images.unsplash.com/photo-1489599735734-79b4fc8c4c8b?w=400&h=600&fit=crop",
      isNew: false
    },
    {
      id: 11,
      title: "Everything Everywhere All at Once",
      year: 2022,
      rating: 7.8,
      duration: "139 min",
      genres: ["Action", "Adventure", "Comedy"],
      director: "Daniels",
      poster: "https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?w=400&h=600&fit=crop",
      isNew: false
    },
    {
      id: 12,
      title: "John Wick: Chapter 4",
      year: 2023,
      rating: 7.7,
      duration: "169 min",
      genres: ["Action", "Crime", "Thriller"],
      director: "Chad Stahelski",
      poster: "https://images.pixabay.com/photo/2019/04/26/07/14/store-4156934_1280.jpg?w=400&h=600&fit=crop",
      isNew: true
    }
  ];

  // Mock suggestions
  const mockSuggestions = [
    {
      id: 1,
      title: "The Dark Knight",
      type: "Movie",
      year: 2008,
      thumbnail: "https://images.unsplash.com/photo-1489599735734-79b4fc8c4c8b?w=50&h=50&fit=crop"
    },
    {
      id: 2,
      title: "Christopher Nolan",
      type: "Director",
      year: "",
      thumbnail: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?w=50&h=50&fit=crop"
    },
    {
      id: 3,
      title: "Christian Bale",
      type: "Actor",
      year: "",
      thumbnail: "https://images.pixabay.com/photo/2023/11/20/15/31/ai-generated-8401001_1280.jpg?w=50&h=50&fit=crop"
    }
  ];

  // Filter movies based on search and filters
  const filterMovies = useCallback((movieList) => {
    let filtered = [...movieList];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genres.some(genre => genre.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Genre filter
    if (filters.genres.length > 0) {
      filtered = filtered.filter(movie =>
        filters.genres.some(genre => movie.genres.includes(genre))
      );
    }

    // Year range filter
    filtered = filtered.filter(movie =>
      movie.year >= filters.yearRange.min && movie.year <= filters.yearRange.max
    );

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(movie => movie.rating >= filters.rating);
    }

    // Cast filter
    if (filters.cast) {
      // Mock cast filtering - in real app would check cast array
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(filters.cast.toLowerCase())
      );
    }

    // Director filter
    if (filters.director) {
      filtered = filtered.filter(movie =>
        movie.director.toLowerCase().includes(filters.director.toLowerCase())
      );
    }

    return filtered;
  }, [searchQuery, filters]);

  // Sort movies
  const sortMovies = useCallback((movieList) => {
    const sorted = [...movieList];

    switch (currentSort) {
      case 'rating-desc':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'rating-asc':
        return sorted.sort((a, b) => a.rating - b.rating);
      case 'year-desc':
        return sorted.sort((a, b) => b.year - a.year);
      case 'year-asc':
        return sorted.sort((a, b) => a.year - b.year);
      case 'title-asc':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'title-desc':
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return sorted;
    }
  }, [currentSort]);

  // Load movies
  const loadMovies = useCallback(async (reset = false) => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const filtered = filterMovies(mockMovies);
    const sorted = sortMovies(filtered);
    
    setResultCount(sorted.length);
    
    if (reset) {
      setMovies(sorted);
      setPage(1);
    } else {
      setMovies(prev => [...prev, ...sorted]);
    }
    
    setHasMore(false); // For demo, no pagination
    setLoading(false);
  }, [filterMovies, sortMovies]);

  // Search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        setSuggestions(mockSuggestions);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Load movies on mount and filter/sort changes
  useEffect(() => {
    loadMovies(true);
  }, [loadMovies]);

  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    setSearchParams(params);
  }, [searchQuery, setSearchParams]);

  // Get active filters for chips
  const getActiveFilters = () => {
    const active = [];
    
    filters.genres.forEach(genre => {
      active.push({ type: 'genre', value: genre, label: genre });
    });
    
    if (filters.yearRange.min > 1900 || filters.yearRange.max < new Date().getFullYear()) {
      active.push({
        type: 'year',
        value: `${filters.yearRange.min}-${filters.yearRange.max}`,
        label: `${filters.yearRange.min} - ${filters.yearRange.max}`
      });
    }
    
    if (filters.rating > 0) {
      active.push({
        type: 'rating',
        value: filters.rating,
        label: `Rating ${filters.rating}+`
      });
    }
    
    if (filters.cast) {
      active.push({
        type: 'cast',
        value: filters.cast,
        label: `Cast: ${filters.cast}`
      });
    }
    
    if (filters.director) {
      active.push({
        type: 'director',
        value: filters.director,
        label: `Director: ${filters.director}`
      });
    }
    
    return active;
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const handleVoiceSearch = () => {
    // Mock voice search
    console.log('Voice search activated');
  };

  const handleFilterToggle = () => {
    setShowFilterSidebar(!showFilterSidebar);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.title);
    setShowSuggestions(false);
    
    // Add to recent searches
    setRecentSearches(prev => {
      const updated = [suggestion.title, ...prev.filter(s => s !== suggestion.title)];
      return updated.slice(0, 5);
    });
  };

  const handleRecentSearchClick = (search) => {
    setSearchQuery(search);
    setShowSuggestions(false);
  };

  const handleRemoveFilter = (filterToRemove) => {
    if (filterToRemove.type === 'genre') {
      setFilters(prev => ({
        ...prev,
        genres: prev.genres.filter(g => g !== filterToRemove.value)
      }));
    } else if (filterToRemove.type === 'year') {
      setFilters(prev => ({
        ...prev,
        yearRange: { min: 1900, max: new Date().getFullYear() }
      }));
    } else if (filterToRemove.type === 'rating') {
      setFilters(prev => ({ ...prev, rating: 0 }));
    } else if (filterToRemove.type === 'cast') {
      setFilters(prev => ({ ...prev, cast: '' }));
    } else if (filterToRemove.type === 'director') {
      setFilters(prev => ({ ...prev, director: '' }));
    }
  };

  const handleClearAllFilters = () => {
    setFilters({
      genres: [],
      yearRange: { min: 1900, max: new Date().getFullYear() },
      rating: 0,
      cast: '',
      director: '',
      availability: []
    });
  };

  const handleAddToWatchlist = (movie) => {
    setWatchlistIds(prev => [...prev, movie.id]);
  };

  const handleRemoveFromWatchlist = (movieId) => {
    setWatchlistIds(prev => prev.filter(id => id !== movieId));
  };

  const activeFilters = getActiveFilters();

  return (
    <div className="min-h-screen bg-background pt-16 md:pt-32 pb-20 md:pb-8">
      {/* Search Header */}
      <SearchHeader
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onVoiceSearch={handleVoiceSearch}
        onFilterToggle={handleFilterToggle}
        showSuggestions={showSuggestions}
        suggestions={suggestions}
        onSuggestionClick={handleSuggestionClick}
        recentSearches={recentSearches}
        onRecentSearchClick={handleRecentSearchClick}
      />

      {/* Filter Chips */}
      <FilterChips
        activeFilters={activeFilters}
        onRemoveFilter={handleRemoveFilter}
        onClearAll={handleClearAllFilters}
        resultCount={resultCount}
      />

      <div className="flex">
        {/* Filter Sidebar */}
        <FilterSidebar
          isOpen={showFilterSidebar}
          onClose={() => setShowFilterSidebar(false)}
          filters={filters}
          onFilterChange={setFilters}
          onApplyFilters={() => loadMovies(true)}
          onResetFilters={handleClearAllFilters}
          isMobile={window.innerWidth < 1024}
        />

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${showFilterSidebar ? 'lg:ml-80' : ''}`}>
          <div className="px-4 py-6 lg:px-6">
            <div className="max-w-7xl mx-auto">
              {/* Sort and View Options */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <h1 className="text-2xl font-heading font-heading-bold text-text-primary">
                    {searchQuery ? `Search Results for "${searchQuery}"` : 'Browse Movies'}
                  </h1>
                </div>
                
                <div className="flex items-center space-x-3">
                  <SortDropdown
                    currentSort={currentSort}
                    onSortChange={setCurrentSort}
                  />
                </div>
              </div>

              {/* Movie Grid */}
              <MovieGrid
                movies={movies}
                loading={loading}
                onAddToWatchlist={handleAddToWatchlist}
                onRemoveFromWatchlist={handleRemoveFromWatchlist}
                watchlistIds={watchlistIds}
              />

              {/* Load More */}
              {hasMore && !loading && (
                <div className="flex justify-center mt-8">
                  <LoadingSpinner text="Loading more movies..." />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile filter */}
      {showFilterSidebar && window.innerWidth < 1024 && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setShowFilterSidebar(false)}
        />
      )}
    </div>
  );
};

export default MovieSearchBrowse;