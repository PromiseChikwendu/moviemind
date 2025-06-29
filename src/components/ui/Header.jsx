import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const location = useLocation();
  
  const isAuthPage = location.pathname === '/user-login' || location.pathname === '/user-registration';
  
  const Logo = () => (
    <Link to="/movie-discovery-dashboard" className="flex items-center space-x-2 group">
      <div className="relative">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-elevation-md group-hover:shadow-elevation-lg transition-all duration-200">
          <Icon name="Film" size={20} color="#FFFFFF" strokeWidth={2.5} />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-heading font-heading-bold text-text-primary tracking-tight">
          MovieMind
        </span>
        <span className="text-xs font-caption text-text-secondary -mt-1">
          Discover • Watch • Share
        </span>
      </div>
    </Link>
  );

  if (isAuthPage) {
    return (
      <header className="w-full bg-background border-b border-border px-4 py-4 lg:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo />
          <div className="flex items-center space-x-4">
            <Link 
              to="/user-login" 
              className="text-text-secondary hover:text-text-primary transition-colors duration-200 font-body text-sm"
            >
              Sign In
            </Link>
            <Link 
              to="/user-registration"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-body font-body-semibold text-sm transition-all duration-200 hover:shadow-elevation-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="px-4 py-3 lg:px-6 lg:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo />
          
          <div className="flex items-center space-x-4">
            {/* Search Quick Access */}
            <Link
              to="/movie-search-browse"
              className="hidden md:flex items-center space-x-2 bg-surface hover:bg-surface/80 px-3 py-2 rounded-lg transition-all duration-200 hover:shadow-elevation-sm group"
            >
              <Icon name="Search" size={16} color="#B3B3B3" className="group-hover:text-text-primary transition-colors duration-200" />
              <span className="text-text-secondary group-hover:text-text-primary text-sm font-body transition-colors duration-200">
                Search movies...
              </span>
            </Link>

            {/* Notifications */}
            <button className="relative p-2 hover:bg-surface rounded-lg transition-all duration-200 hover:shadow-elevation-sm group">
              <Icon name="Bell" size={20} color="#B3B3B3" className="group-hover:text-text-primary transition-colors duration-200" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-primary-foreground rounded-full"></span>
              </span>
            </button>

            {/* User Menu */}
            <Link
              to="/user-profile-settings"
              className="flex items-center space-x-2 hover:bg-surface px-2 py-2 rounded-lg transition-all duration-200 hover:shadow-elevation-sm group"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="#FFFFFF" />
              </div>
              <span className="hidden lg:block text-text-secondary group-hover:text-text-primary text-sm font-body transition-colors duration-200">
                Profile
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;