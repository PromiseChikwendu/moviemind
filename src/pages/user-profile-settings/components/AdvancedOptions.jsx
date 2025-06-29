import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AdvancedOptions = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const algorithmInsights = [
    {
      reason: "Genre Preference",
      description: "You frequently watch Action and Sci-Fi movies",
      weight: 85,
      color: "#E50914"
    },
    {
      reason: "Rating Patterns",
      description: "You tend to rate movies with complex plots higher",
      weight: 72,
      color: "#FFD700"
    },
    {
      reason: "Social Influence",
      description: "Movies liked by users you follow",
      weight: 58,
      color: "#46D369"
    },
    {
      reason: "Release Timing",
      description: "You prefer newer releases and recent classics",
      weight: 45,
      color: "#FF9500"
    }
  ];

  const handleDataExport = () => {
    console.log('Exporting user data...');
    // Mock export functionality
  };

  const handleResetAlgorithm = () => {
    console.log('Resetting recommendation algorithm...');
    // Mock reset functionality
  };

  const handleDeleteAccount = () => {
    console.log('Account deletion requested...');
    setShowDeleteConfirm(false);
    // Mock account deletion
  };

  return (
    <div className="bg-surface rounded-xl shadow-elevation-md overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 flex items-center justify-between hover:bg-surface/80 transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
            <Icon name="Settings2" size={20} color="#FF453A" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-heading font-heading-semibold text-text-primary">
              Advanced Options
            </h3>
            <p className="text-text-secondary font-body text-sm">
              Algorithm insights, data management, and account controls
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
          {/* Algorithm Transparency */}
          <div className="space-y-4">
            <h4 className="text-text-primary font-body font-body-semibold text-sm">
              Recommendation Algorithm Insights
            </h4>
            <p className="text-text-secondary font-body text-xs">
              Understanding why specific movies are recommended to you
            </p>
            
            <div className="space-y-3">
              {algorithmInsights.map((insight, index) => (
                <div key={index} className="bg-background rounded-lg p-4 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-text-primary font-body font-body-semibold text-sm">
                      {insight.reason}
                    </h5>
                    <span className="text-text-secondary font-body text-xs">
                      {insight.weight}% influence
                    </span>
                  </div>
                  <p className="text-text-secondary font-body text-xs mb-3">
                    {insight.description}
                  </p>
                  <div className="w-full bg-border rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${insight.weight}%`,
                        backgroundColor: insight.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data Management */}
          <div className="space-y-4">
            <h4 className="text-text-primary font-body font-body-semibold text-sm">
              Data Management
            </h4>
            
            <div className="space-y-3">
              <div className="bg-background rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-text-primary font-body font-body-semibold text-sm">
                      Export Personal Data
                    </h5>
                    <p className="text-text-secondary font-body text-xs">
                      Download all your profile data, ratings, and activity history
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={handleDataExport}
                    iconName="Download"
                    iconPosition="left"
                  >
                    Export
                  </Button>
                </div>
              </div>

              <div className="bg-background rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-text-primary font-body font-body-semibold text-sm">
                      Reset Recommendation Algorithm
                    </h5>
                    <p className="text-text-secondary font-body text-xs">
                      Clear your recommendation history and start fresh
                    </p>
                  </div>
                  <Button 
                    variant="warning" 
                    onClick={handleResetAlgorithm}
                    iconName="RotateCcw"
                    iconPosition="left"
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="space-y-4">
            <h4 className="text-text-primary font-body font-body-semibold text-sm">
              Account Actions
            </h4>
            
            <div className="bg-background rounded-lg p-4 border border-error">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h5 className="text-error font-body font-body-semibold text-sm mb-1">
                    Delete Account
                  </h5>
                  <p className="text-text-secondary font-body text-xs mb-3">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <ul className="text-text-secondary font-body text-xs space-y-1 mb-4">
                    <li>• All your ratings and reviews will be removed</li>
                    <li>• Your watchlist and favorites will be deleted</li>
                    <li>• Social connections will be severed</li>
                    <li>• Recommendation history will be cleared</li>
                  </ul>
                </div>
              </div>
              
              {!showDeleteConfirm ? (
                <Button 
                  variant="danger" 
                  onClick={() => setShowDeleteConfirm(true)}
                  iconName="Trash2"
                  iconPosition="left"
                >
                  Delete Account
                </Button>
              ) : (
                <div className="space-y-3">
                  <div className="bg-error/10 border border-error rounded-lg p-3">
                    <p className="text-error font-body text-sm font-body-semibold mb-2">
                      Are you absolutely sure?
                    </p>
                    <p className="text-text-secondary font-body text-xs">
                      Type "DELETE" to confirm account deletion
                    </p>
                    <input
                      type="text"
                      placeholder="Type DELETE to confirm"
                      className="w-full mt-2 p-2 bg-background border border-border rounded text-text-primary font-body text-sm focus:ring-2 focus:ring-error focus:border-error"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <Button 
                      variant="danger" 
                      onClick={handleDeleteAccount}
                      className="flex-1"
                    >
                      Confirm Delete
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowDeleteConfirm(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Support & Feedback */}
          <div className="space-y-3">
            <h4 className="text-text-primary font-body font-body-semibold text-sm">
              Support & Feedback
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button className="p-3 bg-background hover:bg-surface rounded-lg border border-border transition-colors duration-200 flex items-center space-x-3">
                <Icon name="HelpCircle" size={16} color="#B3B3B3" />
                <span className="text-text-secondary font-body text-sm">Help Center</span>
              </button>
              <button className="p-3 bg-background hover:bg-surface rounded-lg border border-border transition-colors duration-200 flex items-center space-x-3">
                <Icon name="MessageSquare" size={16} color="#B3B3B3" />
                <span className="text-text-secondary font-body text-sm">Send Feedback</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedOptions;