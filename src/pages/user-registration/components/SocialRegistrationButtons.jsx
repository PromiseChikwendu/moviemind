import React from 'react';

import Icon from '../../../components/AppIcon';

const SocialRegistrationButtons = ({ onSocialRegister }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Mail',
      bgColor: 'bg-white hover:bg-gray-50',
      textColor: 'text-gray-900',
      borderColor: 'border-gray-300'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      bgColor: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white',
      borderColor: 'border-blue-600'
    }
  ];

  return (
    <div className="space-y-3">
      {socialProviders.map((provider) => (
        <button
          key={provider.id}
          onClick={() => onSocialRegister(provider.id)}
          className={`w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-lg border transition-all duration-200 hover:shadow-elevation-sm ${provider.bgColor} ${provider.textColor} ${provider.borderColor}`}
        >
          <Icon name={provider.icon} size={20} color="currentColor" />
          <span className="font-body font-body-semibold">
            Continue with {provider.name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default SocialRegistrationButtons;