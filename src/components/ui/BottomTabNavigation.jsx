import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomTabNavigation = () => {
  const location = useLocation();
  
  const navigationItems = [
    {
      label: 'Home',
      path: '/movie-discovery-dashboard',
      icon: 'Home',
      activeIcon: 'Home',
    },
    {
      label: 'Search',
      path: '/movie-search-browse',
      icon: 'Search',
      activeIcon: 'Search',
    },
    {
      label: 'Watchlist',
      path: '/personal-watchlist',
      icon: 'Bookmark',
      activeIcon: 'Bookmark',
      badge: true,
    },
    {
      label: 'Profile',
      path: '/user-profile-settings',
      icon: 'User',
      activeIcon: 'User',
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-200 bg-surface/95 backdrop-blur-sm border-t border-border md:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          {navigationItems.map((item) => {
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-all duration-200 min-w-0 flex-1 relative group ${
                  active 
                    ? 'bg-primary/10 text-primary' :'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                }`}
              >
                <div className="relative">
                  <Icon 
                    name={active ? item.activeIcon : item.icon} 
                    size={20} 
                    color={active ? '#E50914' : 'currentColor'}
                    strokeWidth={active ? 2.5 : 2}
                  />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"></span>
                  )}
                </div>
                <span className={`text-xs font-caption mt-1 transition-colors duration-200 ${
                  active ? 'text-primary font-caption-semibold' : 'text-text-secondary'
                }`}>
                  {item.label}
                </span>
                {active && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop Top Navigation */}
      <nav className="hidden md:block fixed top-16 left-0 right-0 z-100 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center space-x-8 py-3">
            {navigationItems.map((item) => {
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 relative group ${
                    active 
                      ? 'bg-primary/10 text-primary shadow-elevation-sm' 
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                  }`}
                >
                  <div className="relative">
                    <Icon 
                      name={active ? item.activeIcon : item.icon} 
                      size={18} 
                      color={active ? '#E50914' : 'currentColor'}
                      strokeWidth={active ? 2.5 : 2}
                    />
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"></span>
                    )}
                  </div>
                  <span className={`text-sm font-body transition-colors duration-200 ${
                    active ? 'text-primary font-body-semibold' : 'text-text-secondary group-hover:text-text-primary'
                  }`}>
                    {item.label}
                  </span>
                  {active && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-primary rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};

export default BottomTabNavigation;