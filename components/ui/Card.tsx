
import React from 'react';

const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  const baseClasses = "rounded-lg border bg-card text-card-foreground shadow-sm dark:border-dark-border dark:bg-dark-card dark:text-dark-card-foreground";
  return <div className={`${baseClasses} p-6 ${className}`} {...props} />;
};

export default Card;
