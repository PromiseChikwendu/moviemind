import React from 'react';
import Image from '../../../components/AppImage';

const LoginBackground = () => {
  return (
    <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-20"></div>
      
      <Image
        src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        alt="Movie theater with red seats"
        className="w-full h-full object-cover"
      />
      
      <div className="absolute bottom-0 left-0 right-0 z-30 p-12">
        <div className="max-w-md">
          <h2 className="text-4xl font-heading font-heading-bold text-white mb-4">
            Discover Your Next Favorite Movie
          </h2>
          <p className="text-white/90 font-body text-lg leading-relaxed">
            Join millions of movie lovers who trust MovieMind for personalized recommendations and endless entertainment.
          </p>
          
          <div className="flex items-center space-x-6 mt-8">
            <div className="text-center">
              <div className="text-2xl font-heading font-heading-bold text-accent">10M+</div>
              <div className="text-white/80 text-sm font-body">Movies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-heading font-heading-bold text-accent">5M+</div>
              <div className="text-white/80 text-sm font-body">Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-heading font-heading-bold text-accent">99%</div>
              <div className="text-white/80 text-sm font-body">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginBackground;