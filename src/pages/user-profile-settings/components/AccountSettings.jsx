import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const AccountSettings = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    email: "john.doe@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // Mock save functionality
    console.log('Account settings saved:', formData);
  };

  return (
    <div className="bg-surface rounded-xl shadow-elevation-md overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 flex items-center justify-between hover:bg-surface/80 transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Settings" size={20} color="#E50914" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-heading font-heading-semibold text-text-primary">
              Account Settings
            </h3>
            <p className="text-text-secondary font-body text-sm">
              Manage your email, password, and security
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
          {/* Email Settings */}
          <div className="space-y-3">
            <label className="block text-text-primary font-body font-body-semibold text-sm">
              Email Address
            </label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full"
            />
          </div>

          {/* Password Settings */}
          <div className="space-y-4">
            <h4 className="text-text-primary font-body font-body-semibold text-sm">
              Change Password
            </h4>
            <div className="space-y-3">
              <Input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                placeholder="Current password"
                className="w-full"
              />
              <Input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="New password"
                className="w-full"
              />
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm new password"
                className="w-full"
              />
            </div>
          </div>

          {/* Notification Settings */}
          <div className="space-y-3">
            <h4 className="text-text-primary font-body font-body-semibold text-sm">
              Notification Preferences
            </h4>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-text-secondary font-body text-sm">
                  Email notifications for new recommendations
                </span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-text-secondary font-body text-sm">
                  Push notifications for friend activity
                </span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-text-secondary font-body text-sm">
                  Weekly digest emails
                </span>
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                />
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
            <Button variant="primary" onClick={handleSave} className="flex-1">
              Save Changes
            </Button>
            <Button variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettings;