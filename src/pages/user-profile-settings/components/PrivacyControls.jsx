import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const PrivacyControls = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showWatchlist: true,
    showRatings: true,
    allowRecommendations: true,
    showActivity: false,
    allowFollowers: true
  });

  const handleSettingChange = (setting, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const visibilityOptions = [
    { value: 'public', label: 'Public', description: 'Anyone can view your profile' },
    { value: 'friends', label: 'Friends Only', description: 'Only your followers can view' },
    { value: 'private', label: 'Private', description: 'Only you can view your profile' }
  ];

  return (
    <div className="bg-surface rounded-xl shadow-elevation-md overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 flex items-center justify-between hover:bg-surface/80 transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name="Shield" size={20} color="#FF9500" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-heading font-heading-semibold text-text-primary">
              Privacy Controls
            </h3>
            <p className="text-text-secondary font-body text-sm">
              Manage your profile visibility and data sharing
            </p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          color="#B3B3B3" 
          className="transition-transform duration-200"
        />
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 space-y-6 border-t border-border">
          {/* Profile Visibility */}
          <div className="space-y-3">
            <h4 className="text-text-primary font-body font-body-semibold text-sm">
              Profile Visibility
            </h4>
            <div className="space-y-2">
              {visibilityOptions.map((option) => (
                <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="profileVisibility"
                    value={option.value}
                    checked={privacySettings.profileVisibility === option.value}
                    onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                    className="mt-1 w-4 h-4 text-primary bg-background border-border focus:ring-primary focus:ring-2"
                  />
                  <div className="flex-1">
                    <div className="text-text-primary font-body text-sm">{option.label}</div>
                    <div className="text-text-secondary font-body text-xs">{option.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Data Sharing Controls */}
          <div className="space-y-3">
            <h4 className="text-text-primary font-body font-body-semibold text-sm">
              Data Sharing
            </h4>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <div>
                  <div className="text-text-secondary font-body text-sm">Show my watchlist</div>
                  <div className="text-text-secondary font-body text-xs">Others can see movies you want to watch</div>
                </div>
                <input
                  type="checkbox"
                  checked={privacySettings.showWatchlist}
                  onChange={(e) => handleSettingChange('showWatchlist', e.target.checked)}
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                />
              </label>

              <label className="flex items-center justify-between">
                <div>
                  <div className="text-text-secondary font-body text-sm">Show my ratings</div>
                  <div className="text-text-secondary font-body text-xs">Others can see your movie ratings</div>
                </div>
                <input
                  type="checkbox"
                  checked={privacySettings.showRatings}
                  onChange={(e) => handleSettingChange('showRatings', e.target.checked)}
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                />
              </label>

              <label className="flex items-center justify-between">
                <div>
                  <div className="text-text-secondary font-body text-sm">Allow friend recommendations</div>
                  <div className="text-text-secondary font-body text-xs">Friends can send you movie suggestions</div>
                </div>
                <input
                  type="checkbox"
                  checked={privacySettings.allowRecommendations}
                  onChange={(e) => handleSettingChange('allowRecommendations', e.target.checked)}
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                />
              </label>

              <label className="flex items-center justify-between">
                <div>
                  <div className="text-text-secondary font-body text-sm">Show activity feed</div>
                  <div className="text-text-secondary font-body text-xs">Others can see your recent activity</div>
                </div>
                <input
                  type="checkbox"
                  checked={privacySettings.showActivity}
                  onChange={(e) => handleSettingChange('showActivity', e.target.checked)}
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                />
              </label>

              <label className="flex items-center justify-between">
                <div>
                  <div className="text-text-secondary font-body text-sm">Allow new followers</div>
                  <div className="text-text-secondary font-body text-xs">Others can follow your profile</div>
                </div>
                <input
                  type="checkbox"
                  checked={privacySettings.allowFollowers}
                  onChange={(e) => handleSettingChange('allowFollowers', e.target.checked)}
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                />
              </label>
            </div>
          </div>

          {/* Data Management */}
          <div className="space-y-3">
            <h4 className="text-text-primary font-body font-body-semibold text-sm">
              Data Management
            </h4>
            <div className="space-y-2">
              <button className="w-full text-left p-3 bg-background hover:bg-surface rounded-lg border border-border transition-colors duration-200 flex items-center justify-between">
                <div>
                  <div className="text-text-primary font-body text-sm">Download my data</div>
                  <div className="text-text-secondary font-body text-xs">Export your profile and activity data</div>
                </div>
                <Icon name="Download" size={16} color="#B3B3B3" />
              </button>
              
              <button className="w-full text-left p-3 bg-background hover:bg-surface rounded-lg border border-border transition-colors duration-200 flex items-center justify-between">
                <div>
                  <div className="text-text-primary font-body text-sm">Clear recommendation history</div>
                  <div className="text-text-secondary font-body text-xs">Reset your recommendation algorithm</div>
                </div>
                <Icon name="RotateCcw" size={16} color="#B3B3B3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyControls;