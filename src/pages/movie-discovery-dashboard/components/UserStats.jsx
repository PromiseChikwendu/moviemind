import React from 'react';
import Icon from '../../../components/AppIcon';

const UserStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Movies Watched',
      value: stats.moviesWatched,
      icon: 'Eye',
      color: '#46D369'
    },
    {
      label: 'In Watchlist',
      value: stats.watchlistCount,
      icon: 'Bookmark',
      color: '#E50914'
    },
    {
      label: 'Reviews Written',
      value: stats.reviewsCount,
      icon: 'MessageSquare',
      color: '#FF9500'
    },
    {
      label: 'Average Rating',
      value: stats.averageRating,
      icon: 'Star',
      color: '#FFD700'
    }
  ];

  return (
    <div className="bg-surface rounded-xl p-4 shadow-elevation-sm mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="BarChart3" size={20} color="#E50914" strokeWidth={2} />
        <h3 className="text-lg font-heading font-heading-semibold text-text-primary">
          Your Stats
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {statItems.map((item) => (
          <div key={item.label} className="text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 bg-background rounded-lg">
                <Icon
                  name={item.icon}
                  size={20}
                  color={item.color}
                  strokeWidth={2}
                />
              </div>
            </div>
            <div className="text-xl font-heading font-heading-bold text-text-primary">
              {item.value}
            </div>
            <div className="text-xs text-text-secondary font-body">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserStats;