import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const ViewingStatistics = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('genres');

  const genreData = [
    { name: 'Action', count: 45, color: '#E50914' },
    { name: 'Drama', count: 38, color: '#FFD700' },
    { name: 'Comedy', count: 32, color: '#46D369' },
    { name: 'Sci-Fi', count: 28, color: '#FF9500' },
    { name: 'Thriller', count: 24, color: '#FF453A' },
    { name: 'Romance', count: 18, color: '#564D4A' }
  ];

  const ratingData = [
    { rating: '5★', count: 25 },
    { rating: '4★', count: 42 },
    { rating: '3★', count: 38 },
    { rating: '2★', count: 15 },
    { rating: '1★', count: 8 }
  ];

  const monthlyData = [
    { month: 'Jan', movies: 12 },
    { month: 'Feb', movies: 15 },
    { month: 'Mar', movies: 18 },
    { month: 'Apr', movies: 22 },
    { month: 'May', movies: 19 },
    { month: 'Jun', movies: 25 }
  ];

  const tabs = [
    { id: 'genres', label: 'Genres', icon: 'BarChart3' },
    { id: 'ratings', label: 'Ratings', icon: 'Star' },
    { id: 'activity', label: 'Activity', icon: 'TrendingUp' }
  ];

  return (
    <div className="bg-surface rounded-xl shadow-elevation-md overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 flex items-center justify-between hover:bg-surface/80 transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="BarChart3" size={20} color="#FFD700" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-heading font-heading-semibold text-text-primary">
              Viewing Statistics
            </h3>
            <p className="text-text-secondary font-body text-sm">
              Your movie watching patterns and preferences
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
        <div className="border-t border-border">
          {/* Tab Navigation */}
          <div className="flex border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary/10 text-primary border-b-2 border-primary' :'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                }`}
              >
                <Icon 
                  name={tab.icon} 
                  size={16} 
                  color={activeTab === tab.id ? '#E50914' : '#B3B3B3'} 
                />
                <span className="text-sm font-body">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Genre Statistics */}
            {activeTab === 'genres' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {genreData.map((genre) => (
                    <div key={genre.name} className="bg-background rounded-lg p-4 border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-text-primary font-body text-sm">{genre.name}</span>
                        <span className="text-text-secondary font-body text-xs">{genre.count} movies</span>
                      </div>
                      <div className="w-full bg-border rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${(genre.count / 45) * 100}%`,
                            backgroundColor: genre.color
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="w-full h-64" aria-label="Genre Distribution Pie Chart">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={genreData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="count"
                      >
                        {genreData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Rating Statistics */}
            {activeTab === 'ratings' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-3">
                  {ratingData.map((rating) => (
                    <div key={rating.rating} className="flex items-center space-x-4">
                      <div className="w-12 text-text-primary font-body text-sm">{rating.rating}</div>
                      <div className="flex-1 bg-border rounded-full h-3">
                        <div 
                          className="bg-accent h-3 rounded-full transition-all duration-300"
                          style={{ width: `${(rating.count / 42) * 100}%` }}
                        />
                      </div>
                      <div className="w-12 text-text-secondary font-body text-sm text-right">
                        {rating.count}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="w-full h-64" aria-label="Rating Distribution Bar Chart">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ratingData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis 
                        dataKey="rating" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#B3B3B3', fontSize: 12 }}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#B3B3B3', fontSize: 12 }}
                      />
                      <Bar dataKey="count" fill="#FFD700" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Activity Statistics */}
            {activeTab === 'activity' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-background rounded-lg p-4 border border-border text-center">
                    <div className="text-2xl font-heading font-heading-bold text-primary mb-1">128</div>
                    <div className="text-text-secondary font-body text-xs">Total Movies</div>
                  </div>
                  <div className="bg-background rounded-lg p-4 border border-border text-center">
                    <div className="text-2xl font-heading font-heading-bold text-accent mb-1">4.2</div>
                    <div className="text-text-secondary font-body text-xs">Avg Rating</div>
                  </div>
                  <div className="bg-background rounded-lg p-4 border border-border text-center">
                    <div className="text-2xl font-heading font-heading-bold text-success mb-1">21</div>
                    <div className="text-text-secondary font-body text-xs">This Month</div>
                  </div>
                  <div className="bg-background rounded-lg p-4 border border-border text-center">
                    <div className="text-2xl font-heading font-heading-bold text-warning mb-1">156</div>
                    <div className="text-text-secondary font-body text-xs">Hours Watched</div>
                  </div>
                </div>

                <div className="w-full h-64" aria-label="Monthly Activity Bar Chart">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#B3B3B3', fontSize: 12 }}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#B3B3B3', fontSize: 12 }}
                      />
                      <Bar dataKey="movies" fill="#E50914" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewingStatistics;