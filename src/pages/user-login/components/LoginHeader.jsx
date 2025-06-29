import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-elevation-lg">
          <Icon name="Film" size={32} color="#FFFFFF" strokeWidth={2.5} />
        </div>
      </div>
      
      <h1 className="text-3xl font-heading font-heading-bold text-text-primary mb-2">
        Welcome Back
      </h1>
      
      <p className="text-text-secondary font-body text-lg mb-6">
        Sign in to continue your movie journey
      </p>
      
      <div className="flex items-center justify-center space-x-2 text-sm font-body">
        <span className="text-text-secondary">New to MovieMind?</span>
        <Link 
          to="/user-registration" 
          className="text-primary hover:text-primary/80 font-body-semibold transition-colors duration-200"
        >
          Create an account
        </Link>
      </div>
    </div>
  );
};

export default LoginHeader;