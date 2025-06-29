import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SocialFeatures = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('followers');

  const followers = [
    {
      id: 1,
      name: "Sarah Johnson",
      username: "sarahj_movies",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      mutualFriends: 12,
      isFollowing: true
    },
    {
      id: 2,
      name: "Mike Chen",
      username: "mikecinema",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      mutualFriends: 8,
      isFollowing: true
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      username: "emmafilms",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      mutualFriends: 15,
      isFollowing: false
    }
  ];

  const following = [
    {
      id: 4,
      name: "David Park",
      username: "davidmovies",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      lastActive: "2 hours ago",
      isFollowing: true
    },
    {
      id: 5,
      name: "Lisa Thompson",
      username: "lisacinephile",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      lastActive: "1 day ago",
      isFollowing: true
    }
  ];

  const friendRequests = [
    {
      id: 6,
      name: "Alex Kumar",
      username: "alexfilmfan",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      mutualFriends: 5,
      requestDate: "2 days ago"
    },
    {
      id: 7,
      name: "Maria Garcia",
      username: "mariamoviebuff",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      mutualFriends: 3,
      requestDate: "1 week ago"
    }
  ];

  const tabs = [
    { id: 'followers', label: 'Followers', count: followers.length },
    { id: 'following', label: 'Following', count: following.length },
    { id: 'requests', label: 'Requests', count: friendRequests.length }
  ];

  const handleFollowToggle = (userId, currentStatus) => {
    console.log(`${currentStatus ? 'Unfollowing' : 'Following'} user ${userId}`);
  };

  const handleRequestAction = (userId, action) => {
    console.log(`${action} friend request from user ${userId}`);
  };

  return (
    <div className="bg-surface rounded-xl shadow-elevation-md overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 flex items-center justify-between hover:bg-surface/80 transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Users" size={20} color="#E50914" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-heading font-heading-semibold text-text-primary">
              Social Features
            </h3>
            <p className="text-text-secondary font-body text-sm">
              Manage your connections and social interactions
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
                <span className="text-sm font-body">{tab.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-border text-text-secondary'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Followers Tab */}
            {activeTab === 'followers' && (
              <div className="space-y-4">
                {followers.map((follower) => (
                  <div key={follower.id} className="flex items-center space-x-4 p-4 bg-background rounded-lg border border-border">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={follower.avatar}
                        alt={`${follower.name}'s avatar`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-text-primary font-body font-body-semibold text-sm">
                        {follower.name}
                      </h4>
                      <p className="text-text-secondary font-body text-xs">@{follower.username}</p>
                      <p className="text-text-secondary font-body text-xs">
                        {follower.mutualFriends} mutual friends
                      </p>
                    </div>
                    <button
                      onClick={() => handleFollowToggle(follower.id, follower.isFollowing)}
                      className={`px-4 py-2 rounded-lg text-sm font-body transition-all duration-200 ${
                        follower.isFollowing
                          ? 'bg-surface text-text-secondary hover:bg-background border border-border' :'bg-primary text-primary-foreground hover:bg-primary/90'
                      }`}
                    >
                      {follower.isFollowing ? 'Following' : 'Follow Back'}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Following Tab */}
            {activeTab === 'following' && (
              <div className="space-y-4">
                {following.map((user) => (
                  <div key={user.id} className="flex items-center space-x-4 p-4 bg-background rounded-lg border border-border">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={user.avatar}
                        alt={`${user.name}'s avatar`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-text-primary font-body font-body-semibold text-sm">
                        {user.name}
                      </h4>
                      <p className="text-text-secondary font-body text-xs">@{user.username}</p>
                      <p className="text-text-secondary font-body text-xs">
                        Active {user.lastActive}
                      </p>
                    </div>
                    <button
                      onClick={() => handleFollowToggle(user.id, user.isFollowing)}
                      className="px-4 py-2 rounded-lg text-sm font-body bg-surface text-text-secondary hover:bg-background border border-border transition-all duration-200"
                    >
                      Unfollow
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Friend Requests Tab */}
            {activeTab === 'requests' && (
              <div className="space-y-4">
                {friendRequests.map((request) => (
                  <div key={request.id} className="flex items-center space-x-4 p-4 bg-background rounded-lg border border-border">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={request.avatar}
                        alt={`${request.name}'s avatar`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-text-primary font-body font-body-semibold text-sm">
                        {request.name}
                      </h4>
                      <p className="text-text-secondary font-body text-xs">@{request.username}</p>
                      <p className="text-text-secondary font-body text-xs">
                        {request.mutualFriends} mutual friends • {request.requestDate}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleRequestAction(request.id, 'accept')}
                        className="px-3 py-1.5 rounded-lg text-xs font-body bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleRequestAction(request.id, 'decline')}
                        className="px-3 py-1.5 rounded-lg text-xs font-body bg-surface text-text-secondary hover:bg-background border border-border transition-all duration-200"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialFeatures;