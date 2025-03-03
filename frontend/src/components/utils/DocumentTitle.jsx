import { useEffect } from 'react';

/**
 * A utility component to dynamically update the document title
 * @param {Object} props
 * @param {string} props.title - The title to set
 * @param {string} [props.suffix='NexShop'] - Optional suffix to append after the title
 * @param {React.ReactNode} props.children - Child components
 */
const DocumentTitle = ({ title, suffix = 'NexShop', children }) => {
  useEffect(() => {
    // Set the document title when the component mounts
    const formattedTitle = suffix ? `${title} | ${suffix}` : title;
    document.title = formattedTitle;
    
    // Reset to default when component unmounts
    return () => {
      document.title = 'NexShop - Modern E-Commerce';
    };
  }, [title, suffix]);

  // This component doesn't render anything, it just returns its children
  return children;
};

export default DocumentTitle;
