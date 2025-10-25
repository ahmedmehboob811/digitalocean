
import React from 'react';

const Skeleton: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  return (
    <div
      className={`animate-pulse rounded-md bg-muted dark:bg-dark-muted ${className}`}
      {...props}
    />
  );
};

export default Skeleton;
