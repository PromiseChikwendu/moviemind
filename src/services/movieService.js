import { supabase } from '../lib/supabase';

class MovieService {
  // Get all movies with optional filters
  async getMovies(filters = {}) {
    try {
      let query = supabase
        .from('movies')
        .select('*')
        .order('rating', { ascending: false });

      // Apply genre filter if provided
      if (filters?.genres?.length > 0) {
        query = query.overlaps('genres', filters.genres);
      }

      // Apply rating filter if provided
      if (filters?.minRating) {
        query = query.gte('rating', filters.minRating);
      }

      // Apply limit if provided
      if (filters?.limit) {
        query = query.limit(filters.limit);
      }

      const { data, error } = await query;

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted.' 
        };
      }
      return { success: false, error: 'An unexpected error occurred while loading movies.' };
    }
  }

  // Get a single movie by ID
  async getMovieById(movieId) {
    try {
      const { data, error } = await supabase
        .from('movies')
        .select('*')
        .eq('id', movieId)
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted.' 
        };
      }
      return { success: false, error: 'An unexpected error occurred while loading movie details.' };
    }
  }

  // Search movies by title
  async searchMovies(searchTerm, filters = {}) {
    try {
      let query = supabase
        .from('movies')
        .select('*')
        .ilike('title', `%${searchTerm}%`)
        .order('rating', { ascending: false });

      // Apply filters
      if (filters?.genres?.length > 0) {
        query = query.overlaps('genres', filters.genres);
      }

      if (filters?.limit) {
        query = query.limit(filters.limit);
      }

      const { data, error } = await query;

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted.' 
        };
      }
      return { success: false, error: 'An unexpected error occurred while searching movies.' };
    }
  }

  // Get trending movies (high rated recent movies)
  async getTrendingMovies(limit = 10) {
    try {
      const { data, error } = await supabase
        .from('movies')
        .select('*')
        .gte('rating', 7.0)
        .order('rating', { ascending: false })
        .limit(limit);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted.' 
        };
      }
      return { success: false, error: 'An unexpected error occurred while loading trending movies.' };
    }
  }

  // Get movies by genre
  async getMoviesByGenre(genre, limit = 20) {
    try {
      const { data, error } = await supabase
        .from('movies')
        .select('*')
        .contains('genres', [genre])
        .order('rating', { ascending: false })
        .limit(limit);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted.' 
        };
      }
      return { success: false, error: 'An unexpected error occurred while loading movies by genre.' };
    }
  }
}

export default new MovieService();