
import React from 'react';

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => {
  const baseClasses = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-input dark:bg-dark-background dark:ring-offset-dark-background dark:placeholder:text-dark-muted-foreground dark:focus-visible:ring-dark-ring";
  return <input className={`${baseClasses} ${className}`} {...props} />;
};

export default Input;
