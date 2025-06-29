import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActionsBar = ({ 
  selectedCount, 
  onSelectAll, 
  onDeselectAll, 
  onBulkMarkWatched, 
  onBulkRemove, 
  onBulkMoveToFavorites,
  totalCount,
  isAllSelected 
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-20 lg:bottom-4 left-4 right-4 z-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-surface border border-border rounded-lg shadow-elevation-lg p-4">
          <div className="flex items-center justify-between">
            {/* Selection Info */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                  <Icon name="Check" size={14} color="#FFFFFF" strokeWidth={2.5} />
                </div>
                <span className="font-body font-body-semibold text-text-primary">
                  {selectedCount} selected
                </span>
              </div>

              <div className="hidden sm:flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={isAllSelected ? onDeselectAll : onSelectAll}
                  className="text-primary"
                >
                  {isAllSelected ? 'Deselect All' : `Select All (${totalCount})`}
                </Button>
              </div>
            </div>

            {/* Bulk Actions */}
            <div className="flex items-center space-x-2">
              {/* Mark as Watched */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onBulkMarkWatched}
                iconName="Check"
                className="text-success hover:bg-success/10 hidden sm:flex"
              >
                Mark Watched
              </Button>

              {/* Move to Favorites */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onBulkMoveToFavorites}
                iconName="Heart"
                className="text-primary hover:bg-primary/10 hidden sm:flex"
              >
                Add to Favorites
              </Button>

              {/* Remove */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onBulkRemove}
                iconName="Trash2"
                className="text-error hover:bg-error/10"
              >
                <span className="hidden sm:inline">Remove</span>
              </Button>

              {/* Mobile Actions Menu */}
              <div className="sm:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="MoreHorizontal"
                  className="text-text-secondary"
                />
              </div>

              {/* Close Selection */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onDeselectAll}
                iconName="X"
                className="text-text-secondary hover:text-text-primary"
              />
            </div>
          </div>

          {/* Mobile Actions Row */}
          <div className="sm:hidden mt-3 pt-3 border-t border-border">
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBulkMarkWatched}
                iconName="Check"
                iconPosition="left"
                className="text-success hover:bg-success/10 flex-1"
              >
                Mark Watched
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onBulkMoveToFavorites}
                iconName="Heart"
                iconPosition="left"
                className="text-primary hover:bg-primary/10 flex-1"
              >
                Favorites
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;