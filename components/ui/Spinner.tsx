
import React from 'react';

const Spinner: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin ${className}`}></div>
  );
};

export default Spinner;
