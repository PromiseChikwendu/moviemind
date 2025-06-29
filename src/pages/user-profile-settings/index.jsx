import React from 'react';
import Header from '../../components/ui/Header';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import ProfileHeader from './components/ProfileHeader';
import AccountSettings from './components/AccountSettings';
import PreferencesSettings from './components/PreferencesSettings';
import PrivacyControls from './components/PrivacyControls';
import AppSettings from './components/AppSettings';
import ViewingStatistics from './components/ViewingStatistics';
import SocialFeatures from './components/SocialFeatures';
import AdvancedOptions from './components/AdvancedOptions';

const UserProfileSettings = () => {
  // Mock user data
  const userData = {
    name: "John Doe",
    username: "johndoe_movies",
    email: "john.doe@example.com",
    bio: `Movie enthusiast and critic with a passion for discovering hidden gems and sharing great cinema experiences. Always looking for the next great film to add to my collection.`,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    memberSince: "March 2022"
  };

  const userStats = {
    moviesWatched: 128,
    reviewsWritten: 45,
    followers: 234
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main Content */}
      <main className="pt-16 md:pt-32 pb-20 md:pb-8">
        <div className="max-w-4xl mx-auto px-4 py-6 lg:px-6 lg:py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-heading-bold text-text-primary mb-2">
              Profile &amp; Settings
            </h1>
            <p className="text-text-secondary font-body">
              Manage your account, preferences, and personalize your movie discovery experience
            </p>
          </div>

          {/* Settings Sections */}
          <div className="space-y-6">
            {/* Profile Header */}
            <ProfileHeader user={userData} stats={userStats} />

            {/* Account Settings */}
            <AccountSettings />

            {/* Movie Preferences */}
            <PreferencesSettings />

            {/* Privacy Controls */}
            <PrivacyControls />

            {/* App Settings */}
            <AppSettings />

            {/* Viewing Statistics */}
            <ViewingStatistics />

            {/* Social Features */}
            <SocialFeatures />

            {/* Advanced Options */}
            <AdvancedOptions />
          </div>

          {/* Footer Actions */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div className="text-center sm:text-left">
                <p className="text-text-secondary font-body text-sm">
                  Need help? Visit our{' '}
                  <button className="text-primary hover:text-primary/80 transition-colors duration-200">
                    Help Center
                  </button>{' '}
                  or{' '}
                  <button className="text-primary hover:text-primary/80 transition-colors duration-200">
                    Contact Support
                  </button>
                </p>
              </div>
              <div className="text-text-secondary font-body text-sm">
                Last updated: {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomTabNavigation />
    </div>
  );
};

export default UserProfileSettings;