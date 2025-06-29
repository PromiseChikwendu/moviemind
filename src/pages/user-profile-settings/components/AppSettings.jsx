import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AppSettings = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('en');
  const [dataUsage, setDataUsage] = useState('wifi');

  const themes = [
    { value: 'dark', label: 'Dark Mode', icon: 'Moon' },
    { value: 'light', label: 'Light Mode', icon: 'Sun' },
    { value: 'auto', label: 'Auto (System)', icon: 'Monitor' }
  ];

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
    { value: 'it', label: 'Italiano' },
    { value: 'pt', label: 'Português' }
  ];

  const dataOptions = [
    { value: 'always', label: 'Always load images', description: 'Best quality, uses more data' },
    { value: 'wifi', label: 'WiFi only', description: 'Load images only on WiFi' },
    { value: 'never', label: 'Never load images', description: 'Save data, text only' }
  ];

  return (
    <div className="bg-surface rounded-xl shadow-elevation-md overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 flex items-center justify-between hover:bg-surface/80 transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="Smartphone" size={20} color="#46D369" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-heading font-heading-semibold text-text-primary">
              App Settings
            </h3>
            <p className="text-text-secondary font-body text-sm">
              Customize your app experience and performance
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
          {/* Theme Settings */}
          <div className="space-y-3">
            <h4 className="text-text-primary font-body font-body-semibold text-sm">
              Theme Preference
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {themes.map((themeOption) => (
                <button
                  key={themeOption.value}
                  onClick={() => setTheme(themeOption.value)}
                  className={`p-3 rounded-lg border transition-all duration-200 flex items-center space-x-2 ${
                    theme === themeOption.value
                      ? 'bg-primary/10 border-primary text-primary' :'bg-background border-border text-text-secondary hover:bg-surface hover:text-text-primary'
                  }`}
                >
                  <Icon 
                    name={themeOption.icon} 
                    size={16} 
                    color={theme === themeOption.value ? '#E50914' : '#B3B3B3'} 
                  />
                  <span className="text-sm font-body">{themeOption.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Language Settings */}
          <div className="space-y-3">
            <h4 className="text-text-primary font-body font-body-semibold text-sm">
              Language
            </h4>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-3 bg-background border border-border rounded-lg text-text-primary font-body text-sm focus:ring-2 focus:ring-primary focus:border-primary"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* Data Usage Settings */}
          <div className="space-y-3">
            <h4 className="text-text-primary font-body font-body-semibold text-sm">
              Data Usage
            </h4>
            <div className="space-y-2">
              {dataOptions.map((option) => (
                <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="dataUsage"
                    value={option.value}
                    checked={dataUsage === option.value}
                    onChange={(e) => setDataUsage(e.target.value)}
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

          {/* Performance Settings */}
          <div className="space-y-3">
            <h4 className="text-text-primary font-body font-body-semibold text-sm">
              Performance
            </h4>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <div>
                  <div className="text-text-secondary font-body text-sm">Enable animations</div>
                  <div className="text-text-secondary font-body text-xs">Smooth transitions and effects</div>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                />
              </label>

              <label className="flex items-center justify-between">
                <div>
                  <div className="text-text-secondary font-body text-sm">Auto-play trailers</div>
                  <div className="text-text-secondary font-body text-xs">Play movie trailers automatically</div>
                </div>
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                />
              </label>

              <label className="flex items-center justify-between">
                <div>
                  <div className="text-text-secondary font-body text-sm">Preload recommendations</div>
                  <div className="text-text-secondary font-body text-xs">Faster loading, uses more data</div>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                />
              </label>
            </div>
          </div>

          {/* Cache Management */}
          <div className="space-y-3">
            <h4 className="text-text-primary font-body font-body-semibold text-sm">
              Storage Management
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                <div>
                  <div className="text-text-primary font-body text-sm">Cache size</div>
                  <div className="text-text-secondary font-body text-xs">Images and data cache</div>
                </div>
                <div className="text-text-secondary font-body text-sm">247 MB</div>
              </div>
              
              <button className="w-full text-left p-3 bg-background hover:bg-surface rounded-lg border border-border transition-colors duration-200 flex items-center justify-between">
                <div>
                  <div className="text-text-primary font-body text-sm">Clear cache</div>
                  <div className="text-text-secondary font-body text-xs">Free up storage space</div>
                </div>
                <Icon name="Trash2" size={16} color="#B3B3B3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppSettings;