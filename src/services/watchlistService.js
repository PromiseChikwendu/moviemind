import { supabase } from '../lib/supabase';

class WatchlistService {
  // Get user's watchlist
  async getUserWatchlist(userId, status = null) {
    try {
      let query = supabase
        .from('watchlist_items')
        .select(`
          *,
          movie:movies(*)
        `)
        .eq('user_id', userId)
        .order('added_at', { ascending: false });

      // Filter by status if provided
      if (status) {
        query = query.eq('status', status);
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
      return { success: false, error: 'An unexpected error occurred while loading watchlist.' };
    }
  }

  // Add movie to watchlist
  async addToWatchlist(userId, movieId, status = 'want_to_watch') {
    try {
      const { data, error } = await supabase
        .from('watchlist_items')
        .insert({
          user_id: userId,
          movie_id: movieId,
          status: status
        })
        .select(`
          *,
          movie:movies(*)
        `)
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
      return { success: false, error: 'An unexpected error occurred while adding to watchlist.' };
    }
  }

  // Update watchlist item
  async updateWatchlistItem(itemId, updates) {
    try {
      const { data, error } = await supabase
        .from('watchlist_items')
        .update(updates)
        .eq('id', itemId)
        .select(`
          *,
          movie:movies(*)
        `)
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
      return { success: false, error: 'An unexpected error occurred while updating watchlist item.' };
    }
  }

  // Remove from watchlist
  async removeFromWatchlist(itemId) {
    try {
      const { error } = await supabase
        .from('watchlist_items')
        .delete()
        .eq('id', itemId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted.' 
        };
      }
      return { success: false, error: 'An unexpected error occurred while removing from watchlist.' };
    }
  }

  // Check if movie is in user's watchlist
  async isMovieInWatchlist(userId, movieId) {
    try {
      const { data, error } = await supabase
        .from('watchlist_items')
        .select('id, status')
        .eq('user_id', userId)
        .eq('movie_id', movieId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
        return { success: false, error: error.message };
      }

      return { 
        success: true, 
        data: { 
          inWatchlist: !!data, 
          status: data?.status || null,
          itemId: data?.id || null
        } 
      };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted.' 
        };
      }
      return { success: false, error: 'An unexpected error occurred while checking watchlist status.' };
    }
  }

  // Get watchlist statistics
  async getWatchlistStats(userId) {
    try {
      const { data, error } = await supabase
        .from('watchlist_items')
        .select('status')
        .eq('user_id', userId);

      if (error) {
        return { success: false, error: error.message };
      }

      const stats = {
        total: data?.length || 0,
        want_to_watch: 0,
        watching: 0,
        watched: 0,
        dropped: 0
      };

      data?.forEach(item => {
        if (stats.hasOwnProperty(item.status)) {
          stats[item.status]++;
        }
      });

      return { success: true, data: stats };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted.' 
        };
      }
      return { success: false, error: 'An unexpected error occurred while loading watchlist statistics.' };
    }
  }
}

export default new WatchlistService();