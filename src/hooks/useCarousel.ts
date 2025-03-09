import { useMemo } from 'react';
import { NUM_NEARBY_ROUTES_TO_RENDER } from '../constants/carousel';
import { useInternalContext } from '../providers/Internal';

export const useWindowedCarouselRouteIndices = () => {
  const { noOfRoutes, currentRouteIndex } = useInternalContext();
  const minRouteIndex = 0;
  const maxRouteIndex = noOfRoutes - 1;

  const routeIndicesRangeToRenderForWindowed = useMemo(() => {
    return {
      minRouteIndex: Math.max(
        minRouteIndex,
        currentRouteIndex - NUM_NEARBY_ROUTES_TO_RENDER
      ),
      maxRouteIndex: Math.min(
        maxRouteIndex,
        currentRouteIndex + NUM_NEARBY_ROUTES_TO_RENDER
      ),
    };
  }, [currentRouteIndex, minRouteIndex, maxRouteIndex]);

  return routeIndicesRangeToRenderForWindowed;
};
