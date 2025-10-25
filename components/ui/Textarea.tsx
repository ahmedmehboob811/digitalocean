
import React from 'react';

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ className, ...props }) => {
  const baseClasses = "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-input dark:bg-dark-background dark:ring-offset-dark-background dark:placeholder:text-dark-muted-foreground dark:focus-visible:ring-dark-ring";
  return <textarea className={`${baseClasses} ${className}`} {...props} />;
};

export default Textarea;
