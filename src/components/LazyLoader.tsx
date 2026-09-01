import React, { useEffect, useState } from 'react';

type LazyLoaderProps = {
  shouldLazyLoad: boolean;
  onMount: () => void;
  children?: React.ReactNode;
};

const LazyLoader: React.FC<LazyLoaderProps> = React.memo(
  ({ shouldLazyLoad, onMount, children }) => {
    const [shouldRenderChildren, setShouldRenderChildren] = useState(false);

    useEffect(() => {
      onMount();
    }, [onMount]);

    useEffect(() => {
      if (shouldLazyLoad) {
        setTimeout(() => {
          setShouldRenderChildren(true);
        });
      }
    }, [shouldLazyLoad]);

    if (!shouldLazyLoad || (shouldLazyLoad && shouldRenderChildren)) {
      return <>{children}</>;
    }
    return null;
  }
);

export default LazyLoader;
