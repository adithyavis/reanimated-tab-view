import { useCallback, useMemo, useState } from 'react';
import { useAnimatedReaction, runOnJS } from 'react-native-reanimated';
import { useInternalContext } from '../providers/Internal';
import { usePropsContext } from '../providers/Props';
import { useWindowedCarouselRouteIndices } from './useCarousel';
import { useJumpContext } from '../providers/Jump';
import { useCarouselContext } from '../providers/Carousel';

export const useCarouselLazyLoading = () => {
  const { renderMode } = usePropsContext();
  const { initialRouteIndex } = useInternalContext();
  const { smoothJumpStartRouteIndex } = useJumpContext();
  const { currentRouteIndexSV } = useCarouselContext();

  const routeIndicesRangeToRenderForWindowed =
    useWindowedCarouselRouteIndices();

  const [lazyLoadedRouteIndices, setLazyLoadedRouteIndices] = useState<
    number[]
  >([initialRouteIndex]);

  const appendTolazyLoadedRouteIndices = useCallback((index: number) => {
    setLazyLoadedRouteIndices((prev) => {
      if (!prev.includes(index)) {
        return [...prev, index];
      }
      return prev;
    });
  }, []);

  useAnimatedReaction(
    () => currentRouteIndexSV.value,
    (index: number) => {
      runOnJS(appendTolazyLoadedRouteIndices)(index);
    },
    []
  );

  const handleSceneMount = useCallback((index: number) => {
    setLazyLoadedRouteIndices((prev) => {
      if (!prev.includes(index)) {
        return [...prev, index];
      }
      return prev;
    });
  }, []);

  const isLazyLoadingEnabled = useMemo(
    () => renderMode === 'lazy',
    [renderMode]
  );

  const computeShouldRenderRoute = useCallback(
    (index: number) => {
      if (renderMode === 'windowed') {
        return (
          (index >= routeIndicesRangeToRenderForWindowed.minRouteIndex &&
            index <= routeIndicesRangeToRenderForWindowed.maxRouteIndex) ||
          index === smoothJumpStartRouteIndex
        );
      }
      if (renderMode === 'lazy') {
        return lazyLoadedRouteIndices.includes(index);
      }
      return true;
    },
    [
      routeIndicesRangeToRenderForWindowed,
      lazyLoadedRouteIndices,
      renderMode,
      smoothJumpStartRouteIndex,
    ]
  );

  return {
    isLazyLoadingEnabled,
    handleSceneMount,
    computeShouldRenderRoute,
  };
};
