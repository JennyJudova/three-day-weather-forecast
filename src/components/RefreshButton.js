import React from 'react';

const RefreshButton = () => {
  return (
    <button
      type="button"
      className="refresh"
      onClick={() => window.location.reload(true)}
    >
      Refresh
    </button>
  );
};

export default RefreshButton;
