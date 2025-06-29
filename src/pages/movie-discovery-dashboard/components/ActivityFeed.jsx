import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'watched':
        return 'Eye';
      case 'rated':
        return 'Star';
      case 'added':
        return 'Bookmark';
      case 'reviewed':
        return 'MessageSquare';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'watched':
        return '#46D369';
      case 'rated':
        return '#FFD700';
      case 'added':
        return '#E50914';
      case 'reviewed':
        return '#FF9500';
      default:
        return '#B3B3B3';
    }
  };

  return (
    <div className="bg-surface rounded-xl p-4 shadow-elevation-sm">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Users" size={20} color="#E50914" strokeWidth={2} />
        <h3 className="text-lg font-heading font-heading-semibold text-text-primary">
          Friend Activity
        </h3>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Image
                src={activity.user.avatar}
                alt={activity.user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm font-body-semibold text-text-primary truncate">
                  {activity.user.name}
                </span>
                <Icon
                  name={getActivityIcon(activity.type)}
                  size={14}
                  color={getActivityColor(activity.type)}
                  strokeWidth={2}
                />
              </div>
              
              <p className="text-xs text-text-secondary font-body line-clamp-2">
                {activity.action} <span className="text-text-primary font-body-semibold">{activity.movie}</span>
              </p>
              
              <span className="text-xs text-text-secondary font-body">
                {activity.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 text-sm text-primary hover:text-primary/80 font-body-semibold transition-colors duration-200">
        View All Activity
      </button>
    </div>
  );
};

export default ActivityFeed;