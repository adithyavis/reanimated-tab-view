import {
  useCallback,
  useMemo,
  useRef,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { Gesture } from 'react-native-gesture-handler';
import {
  useSharedValue,
  type SharedValue,
  runOnJS,
  withTiming,
  Easing,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { AUTO_SWIPE_COMPLETION_DURATION } from '../constants/carousel';
import { useCarouselRouteIndices } from './useCarousel';
import type { Route } from '../types/common';

const ACTIVE_OFFSET_X = [-10, 10];

export const useCarouselSwipePanGesture = (
  currentRouteIndex: number,
  swipeTranslationX: SharedValue<number>,
  updateCurrentRouteIndex: (value: number) => void,
  sceneContainerWidth: number,
  noOfRoutes: number,
  handleSwipeStart: () => void,
  handleSwipeEnd: () => void,
  _swipeEnabled = true,
  setPrevRouteIndex: (index: number) => void,
  isJumping: boolean
) => {
  const preSwipeStartSwipeTranslationX = useSharedValue(0);

  const { minRouteIndex, maxRouteIndex } = useCarouselRouteIndices(
    currentRouteIndex,
    noOfRoutes
  );
  const minSwipeTranslationX = minRouteIndex * sceneContainerWidth;
  const maxSwipeTranslationX = maxRouteIndex * sceneContainerWidth;

  const approximatedRouteIndexOnSwipeStartRef = useRef(0);

  const swipeEnabled = useMemo(
    () => !isJumping && _swipeEnabled,
    [_swipeEnabled, isJumping]
  );

  const handleSwipeAnimationEnd = useCallback(
    (prevRouteIndex: number) => {
      setTimeout(() => {
        setPrevRouteIndex(prevRouteIndex);
      }, AUTO_SWIPE_COMPLETION_DURATION);
    },
    [setPrevRouteIndex]
  );

  const swipePanGesture = useMemo(
    () =>
      Gesture.Pan()
        .enabled(swipeEnabled)
        .activeOffsetX(ACTIVE_OFFSET_X)
        .onStart(() => {
          preSwipeStartSwipeTranslationX.value = swipeTranslationX.value;
          runOnJS(handleSwipeStart)();
          approximatedRouteIndexOnSwipeStartRef.current = Math.round(
            -swipeTranslationX.value / sceneContainerWidth
          );
        })
        .onUpdate(({ translationX }) => {
          const boundedTranslationX = Math.min(
            Math.max(translationX, -sceneContainerWidth),
            sceneContainerWidth
          );
          swipeTranslationX.value = Math.min(
            Math.max(
              preSwipeStartSwipeTranslationX.value + boundedTranslationX,
              -1 * maxSwipeTranslationX
            ),
            -1 * minSwipeTranslationX
          );
        })
        .onEnd(({ translationX, velocityX }) => {
          const approximatedRouteIndexOnSwipeStart =
            approximatedRouteIndexOnSwipeStartRef.current;
          const shouldInertiallySnapBackToCurrentRouteIndex =
            Math.round(
              -(swipeTranslationX.value + velocityX) / sceneContainerWidth
            ) === approximatedRouteIndexOnSwipeStart;

          if (shouldInertiallySnapBackToCurrentRouteIndex) {
            swipeTranslationX.value = withTiming(
              -approximatedRouteIndexOnSwipeStart * sceneContainerWidth,
              {
                duration: AUTO_SWIPE_COMPLETION_DURATION,
                easing: Easing.out(Easing.ease),
              }
            );
            runOnJS(handleSwipeEnd)();
            return;
          }

          let routeIndexToInertiallySnap: number;
          const leftSwipe = translationX > 0;
          if (leftSwipe) {
            routeIndexToInertiallySnap = Math.max(
              minRouteIndex,
              approximatedRouteIndexOnSwipeStart - 1
            );
          } else {
            routeIndexToInertiallySnap = Math.min(
              maxRouteIndex,
              approximatedRouteIndexOnSwipeStart + 1
            );
          }
          swipeTranslationX.value = withTiming(
            -routeIndexToInertiallySnap * sceneContainerWidth,
            {
              duration: AUTO_SWIPE_COMPLETION_DURATION,
              easing: Easing.out(Easing.ease),
            }
          );
          runOnJS(updateCurrentRouteIndex)(routeIndexToInertiallySnap);
          runOnJS(handleSwipeEnd)();
          runOnJS(handleSwipeAnimationEnd)(routeIndexToInertiallySnap);
        }),
    [
      swipeEnabled,
      preSwipeStartSwipeTranslationX,
      swipeTranslationX,
      handleSwipeStart,
      sceneContainerWidth,
      maxSwipeTranslationX,
      minSwipeTranslationX,
      updateCurrentRouteIndex,
      handleSwipeEnd,
      handleSwipeAnimationEnd,
      minRouteIndex,
      maxRouteIndex,
    ]
  );

  return swipePanGesture;
};

export const useCarouselJumpToIndex = (
  routes: Route[],
  currentRouteIndex: number,
  swipeTranslationX: SharedValue<number>,
  sceneContainerWidth: number,
  noOfRoutes: number,
  updateCurrentRouteIndex: (value: number) => void,
  prevRouteTranslationX: SharedValue<number>,
  setPrevRouteIndex: (value: number) => void,
  smoothJump: boolean,
  setIsJumping: Dispatch<SetStateAction<boolean>>
) => {
  const { minRouteIndex, maxRouteIndex } = useCarouselRouteIndices(
    currentRouteIndex,
    noOfRoutes
  );

  const handleJumpAnimationEnd = useCallback(
    (prevRouteIndex: number) => {
      setTimeout(() => {
        setPrevRouteIndex(prevRouteIndex);
        prevRouteTranslationX.value = 0;

        setIsJumping(false);
      }, AUTO_SWIPE_COMPLETION_DURATION);
    },
    [prevRouteTranslationX, setIsJumping, setPrevRouteIndex]
  );

  const jumpToRoute = useCallback(
    (key: string) => {
      const routeIndexToJumpTo = routes.findIndex((route) => route.key === key);
      /** Only jump if route is in between the min and max ranges,
       * and not equal to current route index
       */
      if (
        routeIndexToJumpTo === -1 ||
        routeIndexToJumpTo < minRouteIndex ||
        routeIndexToJumpTo > maxRouteIndex ||
        routeIndexToJumpTo === currentRouteIndex
      ) {
        return;
      }

      setIsJumping(true);

      if (smoothJump) {
        const shouldJumpLeft = routeIndexToJumpTo > currentRouteIndex;
        let tempRouteIndexToJumpTo: number;
        if (shouldJumpLeft) {
          tempRouteIndexToJumpTo = routeIndexToJumpTo - 1;
        } else {
          tempRouteIndexToJumpTo = routeIndexToJumpTo + 1;
        }
        swipeTranslationX.value = -tempRouteIndexToJumpTo * sceneContainerWidth;
        prevRouteTranslationX.value =
          (tempRouteIndexToJumpTo - currentRouteIndex) * sceneContainerWidth;
      }

      updateCurrentRouteIndex(routeIndexToJumpTo);

      swipeTranslationX.value = withTiming(
        -routeIndexToJumpTo * sceneContainerWidth,
        {
          duration: AUTO_SWIPE_COMPLETION_DURATION,
          easing: Easing.ease,
        }
      );

      handleJumpAnimationEnd(routeIndexToJumpTo);
    },
    [
      currentRouteIndex,
      handleJumpAnimationEnd,
      maxRouteIndex,
      minRouteIndex,
      prevRouteTranslationX,
      routes,
      sceneContainerWidth,
      setIsJumping,
      smoothJump,
      swipeTranslationX,
      updateCurrentRouteIndex,
    ]
  );

  return jumpToRoute;
};

export const useCarouselSwipeTranslationAnimatedStyle = (
  swipeTranslationX: SharedValue<number>
) => {
  const swipeTranslationAnimatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateX: swipeTranslationX.value }],
    }),
    [swipeTranslationX]
  );
  return swipeTranslationAnimatedStyle;
};
