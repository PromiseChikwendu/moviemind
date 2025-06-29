import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSubmit, isLoading, error }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ ...formData, rememberMe });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4 flex items-center space-x-3">
          <Icon name="AlertCircle" size={20} color="var(--color-error)" />
          <div>
            <p className="text-error text-sm font-body font-body-semibold">Login Failed</p>
            <p className="text-error/80 text-sm font-body mt-1">{error}</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-text-primary font-body font-body-semibold mb-2">
            Email Address
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleInputChange}
            required
            disabled={isLoading}
            className={validationErrors.email ? 'border-error focus:border-error' : ''}
          />
          {validationErrors.email && (
            <p className="text-error text-sm font-body mt-1 flex items-center space-x-1">
              <Icon name="AlertCircle" size={14} color="var(--color-error)" />
              <span>{validationErrors.email}</span>
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-text-primary font-body font-body-semibold mb-2">
            Password
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              className={validationErrors.password ? 'border-error focus:border-error pr-12' : 'pr-12'}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors duration-200"
              disabled={isLoading}
            >
              <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
            </button>
          </div>
          {validationErrors.password && (
            <p className="text-error text-sm font-body mt-1 flex items-center space-x-1">
              <Icon name="AlertCircle" size={14} color="var(--color-error)" />
              <span>{validationErrors.password}</span>
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 cursor-pointer">
          <Input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            disabled={isLoading}
            className="w-4 h-4"
          />
          <span className="text-text-secondary text-sm font-body">Remember me</span>
        </label>

        <button
          type="button"
          className="text-primary hover:text-primary/80 text-sm font-body font-body-semibold transition-colors duration-200"
          disabled={isLoading}
        >
          Forgot password?
        </button>
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        className="h-12"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginForm;