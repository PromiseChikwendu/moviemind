import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ProfileHeader = ({ user, stats }) => {
  return (
    <div className="bg-surface rounded-xl p-6 shadow-elevation-md">
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
        {/* Avatar Section */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-primary to-accent p-0.5">
            <div className="w-full h-full rounded-full overflow-hidden bg-surface">
              <Image
                src={user.avatar}
                alt={`${user.name}'s profile picture`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary hover:bg-primary/90 rounded-full flex items-center justify-center shadow-elevation-md transition-all duration-200">
            <Icon name="Camera" size={16} color="#FFFFFF" />
          </button>
        </div>

        {/* User Info */}
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl font-heading font-heading-bold text-text-primary mb-1">
            {user.name}
          </h1>
          <p className="text-text-secondary font-body mb-2">@{user.username}</p>
          <p className="text-text-secondary font-body text-sm leading-relaxed">
            {user.bio}
          </p>
          
          {/* Member Since */}
          <div className="flex items-center justify-center sm:justify-start space-x-2 mt-3">
            <Icon name="Calendar" size={16} color="#B3B3B3" />
            <span className="text-text-secondary font-caption text-sm">
              Member since {user.memberSince}
            </span>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="flex flex-col space-y-2">
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-body font-body-semibold text-sm transition-all duration-200 hover:shadow-elevation-md flex items-center space-x-2">
            <Icon name="Edit" size={16} color="#FFFFFF" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-heading font-heading-bold text-text-primary">
            {stats.moviesWatched}
          </div>
          <div className="text-text-secondary font-caption text-sm">
            Movies Watched
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-heading font-heading-bold text-text-primary">
            {stats.reviewsWritten}
          </div>
          <div className="text-text-secondary font-caption text-sm">
            Reviews Written
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-heading font-heading-bold text-text-primary">
            {stats.followers}
          </div>
          <div className="text-text-secondary font-caption text-sm">
            Followers
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;