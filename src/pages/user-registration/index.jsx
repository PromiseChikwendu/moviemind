import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/ui/Header';
import SocialRegistrationButtons from './components/SocialRegistrationButtons';
import RegistrationForm from './components/RegistrationForm';
import WelcomeModal from './components/WelcomeModal';

const UserRegistration = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');

  const handleSocialRegister = async (provider) => {
    setIsLoading(true);
    
    // For development preview, show social registration is available but not fully configured
    setTimeout(() => {
      console.log(`Social registration with ${provider} requires additional OAuth configuration`);
      setIsLoading(false);
    }, 2000);
  };

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    
    try {
      const result = await signUp(formData.email, formData.password, {
        displayName: formData.displayName,
        preferences: {
          genres: formData.selectedGenres || [],
          languages: ['en'],
          notifications: true
        }
      });

      if (result?.success) {
        setNewUserName(formData.displayName);
        setShowWelcomeModal(true);
      } else {
        console.log('Registration failed:', result?.error);
      }
    } catch (error) {
      console.log('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWelcomeClose = () => {
    setShowWelcomeModal(false);
    navigate('/movie-discovery-dashboard');
  };

  return (
    <>
      <Helmet>
        <title>Create Account - MovieMind</title>
        <meta name="description" content="Join MovieMind to discover personalized movie recommendations tailored to your taste. Create your account and start your cinematic journey today." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Background Image */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
          <div 
            className="w-full h-full opacity-10 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
            }}
          />
        </div>

        {/* Main Content */}
        <main className="relative z-10 pt-20 pb-8 px-4">
          <div className="max-w-md mx-auto">
            {/* Header Section */}
            <div className="text-center mb-8">
              <h1 className="text-2xl lg:text-3xl font-heading font-heading-bold text-text-primary mb-2">
                Join MovieMind
              </h1>
              <p className="text-text-secondary font-body">
                Discover your next favorite movie with personalized recommendations
              </p>
            </div>

            {/* Registration Card */}
            <div className="bg-surface/95 backdrop-blur-sm rounded-2xl p-6 shadow-elevation-lg border border-border">
              {/* Social Registration */}
              <div className="mb-6">
                <SocialRegistrationButtons onSocialRegister={handleSocialRegister} />
              </div>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-surface text-text-secondary font-caption">
                    Or create account with email
                  </span>
                </div>
              </div>

              {/* Registration Form */}
              <RegistrationForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </div>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-text-secondary text-sm font-body">
                Already have an account?{' '}
                <Link 
                  to="/user-login" 
                  className="text-primary hover:text-primary/80 font-body-semibold transition-colors duration-200"
                >
                  Sign In
                </Link>
              </p>
            </div>

            {/* Footer Links */}
            <div className="text-center mt-8 space-y-2">
              <div className="flex items-center justify-center space-x-4 text-xs text-text-secondary">
                <button className="hover:text-text-primary transition-colors duration-200">
                  Privacy Policy
                </button>
                <span>•</span>
                <button className="hover:text-text-primary transition-colors duration-200">
                  Terms of Service
                </button>
              </div>
              <p className="text-xs text-text-secondary">
                By creating an account, you agree to our Terms and Privacy Policy
              </p>
            </div>
          </div>
        </main>

        {/* Welcome Modal */}
        <WelcomeModal
          isOpen={showWelcomeModal}
          onClose={handleWelcomeClose}
          userName={newUserName}
        />
      </div>
    </>
  );
};

export default UserRegistration;