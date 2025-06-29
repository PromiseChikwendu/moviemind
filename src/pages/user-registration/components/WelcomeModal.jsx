import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const WelcomeModal = ({ isOpen, onClose, userName }) => {
  if (!isOpen) return null;

  const onboardingTips = [
    {
      icon: 'Star',
      title: 'Rate Movies',
      description: 'Rate movies you\'ve watched to get better recommendations'
    },
    {
      icon: 'Bookmark',
      title: 'Build Your Watchlist',
      description: 'Save movies you want to watch for later'
    },
    {
      icon: 'Users',
      title: 'Follow Friends',
      description: 'Connect with friends to see their movie recommendations'
    }
  ];

  return (
    <div className="fixed inset-0 z-300 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface rounded-2xl p-6 w-full max-w-md shadow-elevation-lg border border-border">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Sparkles" size={32} color="#FFFFFF" />
          </div>
          <h2 className="text-xl font-heading font-heading-bold text-text-primary mb-2">
            Welcome to MovieMind, {userName}! 🎬
          </h2>
          <p className="text-sm text-text-secondary">
            Your personalized movie discovery journey starts now
          </p>
        </div>

        {/* Onboarding Tips */}
        <div className="space-y-4 mb-6">
          {onboardingTips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={tip.icon} size={16} color="#E50914" />
              </div>
              <div>
                <h3 className="text-sm font-body font-body-semibold text-text-primary">
                  {tip.title}
                </h3>
                <p className="text-xs text-text-secondary mt-1">
                  {tip.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            variant="primary"
            fullWidth
            onClick={onClose}
            iconName="ArrowRight"
            iconPosition="right"
          >
            Start Exploring
          </Button>
          <button
            onClick={onClose}
            className="w-full text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;