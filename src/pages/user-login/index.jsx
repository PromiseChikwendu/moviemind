import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoginHeader from './components/LoginHeader';
import SocialLoginButtons from './components/SocialLoginButtons';
import LoginForm from './components/LoginForm';
import LoginBackground from './components/LoginBackground';

const UserLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, loading: authLoading, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Clear any previous errors when component mounts
    setError('');
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (user && !authLoading) {
      const from = location.state?.from?.pathname || '/movie-discovery-dashboard';
      navigate(from, { replace: true });
    }
  }, [user, authLoading, navigate, location]);

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn(formData.email, formData.password);

      if (result?.success) {
        // Store remember me preference
        if (formData.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }

        // Redirect to intended page or dashboard
        const from = location.state?.from?.pathname || '/movie-discovery-dashboard';
        navigate(from, { replace: true });
      } else {
        setError(result?.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    setError('');

    try {
      // For development preview, show social login is available but not fully configured
      setError(`${provider} login requires additional OAuth configuration in your Supabase project. Please use email login for now.`);
    } catch (err) {
      setError(`${provider} login failed. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => handleSocialLogin('Google');
  const handleFacebookLogin = () => handleSocialLogin('Facebook');

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <LoginHeader />
          
          <div className="space-y-6">
            <SocialLoginButtons
              onGoogleLogin={handleGoogleLogin}
              onFacebookLogin={handleFacebookLogin}
              isLoading={isLoading}
            />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-background text-text-secondary font-body">
                  Or continue with email
                </span>
              </div>
            </div>

            <LoginForm
              onSubmit={handleLogin}
              isLoading={isLoading}
              error={error}
            />
          </div>

          <div className="mt-8 text-center">
            <p className="text-text-secondary text-sm font-body">
              By signing in, you agree to our{' '}
              <button className="text-primary hover:text-primary/80 font-body-semibold transition-colors duration-200">
                Terms of Service
              </button>{' '}
              and{' '}
              <button className="text-primary hover:text-primary/80 font-body-semibold transition-colors duration-200">
                Privacy Policy
              </button>
            </p>
          </div>

          {/* Development Mode Banner */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm text-center">
              <strong>Demo Mode:</strong> Use email: demo@moviemind.com, password: demo123
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Background Image */}
      <LoginBackground />
    </div>
  );
};

export default UserLogin;