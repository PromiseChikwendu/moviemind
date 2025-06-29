import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';
import GenrePreferenceSelector from './GenrePreferenceSelector';

const RegistrationForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    selectedGenres: []
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        return '';
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        return '';
      case 'displayName':
        if (!value) return 'Display name is required';
        if (value.length < 2) return 'Display name must be at least 2 characters';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleGenreChange = (genres) => {
    setFormData(prev => ({ ...prev, selectedGenres: genres }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'selectedGenres') {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });
    
    if (formData.selectedGenres.length < 3) {
      newErrors.genres = 'Please select at least 3 genres';
    }
    
    setErrors(newErrors);
    setTouched({
      email: true,
      password: true,
      confirmPassword: true,
      displayName: true
    });
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Display Name */}
      <div>
        <Input
          type="text"
          name="displayName"
          placeholder="Display Name"
          value={formData.displayName}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className={errors.displayName ? 'border-error' : ''}
        />
        {errors.displayName && (
          <p className="mt-1 text-xs text-error">{errors.displayName}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <Input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className={errors.email ? 'border-error' : ''}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-error">{errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className={errors.password ? 'border-error' : ''}
        />
        {errors.password && (
          <p className="mt-1 text-xs text-error">{errors.password}</p>
        )}
        <PasswordStrengthIndicator password={formData.password} />
      </div>

      {/* Confirm Password */}
      <div>
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className={errors.confirmPassword ? 'border-error' : ''}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-xs text-error">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Genre Preferences */}
      <div>
        <GenrePreferenceSelector
          selectedGenres={formData.selectedGenres}
          onGenreChange={handleGenreChange}
        />
        {errors.genres && (
          <p className="mt-1 text-xs text-error">{errors.genres}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        className="mt-8"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default RegistrationForm;