import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import UserRegistration from "pages/user-registration";
import UserLogin from "pages/user-login";
import MovieDiscoveryDashboard from "pages/movie-discovery-dashboard";
import MovieSearchBrowse from "pages/movie-search-browse";
import PersonalWatchlist from "pages/personal-watchlist";
import UserProfileSettings from "pages/user-profile-settings";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<MovieDiscoveryDashboard />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/movie-discovery-dashboard" element={<MovieDiscoveryDashboard />} />
        <Route path="/movie-search-browse" element={<MovieSearchBrowse />} />
        <Route path="/personal-watchlist" element={<PersonalWatchlist />} />
        <Route path="/user-profile-settings" element={<UserProfileSettings />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;