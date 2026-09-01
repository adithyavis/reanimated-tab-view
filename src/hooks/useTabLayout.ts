import { useCallback } from 'react';
import { useTabLayoutContext } from '../providers/TabLayout';
import { runOnJS, runOnUI } from 'react-native-reanimated';
import type { View } from 'react-native';
import { useInternalContext } from '../providers/Internal';
import { useMeasuredLayout, type MeasuredLayout } from './useMeasuredLayout';

export const useHandleTabLayout = (index: number) => {
  const { noOfRoutes } = useInternalContext();
  const { routeIndexToTabWidthMapSV, routeIndexToTabOffsetMapSV } =
    useTabLayoutContext();

  const applyTabLayout = useCallback(
    ({ width }: MeasuredLayout) => {
      function updateTabWidthAndOffset() {
        'worklet';

        const prevWidth = routeIndexToTabWidthMapSV.value[index] ?? 0;
        if (width !== prevWidth) {
          routeIndexToTabWidthMapSV.value = {
            ...routeIndexToTabWidthMapSV.value,
            [index]: width,
          };
          let prevRouteIndexOffset = 0;
          for (let i = 0; i <= noOfRoutes; i += 1) {
            const prevRouteIndexWidth =
              routeIndexToTabWidthMapSV.value[i - 1] ?? 0;
            const currentRouteIndexOffset =
              prevRouteIndexOffset + prevRouteIndexWidth;
            routeIndexToTabOffsetMapSV.value = {
              ...routeIndexToTabOffsetMapSV.value,
              [i]: currentRouteIndexOffset,
            };
            prevRouteIndexOffset = currentRouteIndexOffset;
          }
        }
      }
      runOnUI(updateTabWidthAndOffset)();
    },
    [routeIndexToTabWidthMapSV, index, noOfRoutes, routeIndexToTabOffsetMapSV]
  );

  const { ref: tabRef, onLayout: handleTabLayout } =
    useMeasuredLayout<View>(applyTabLayout);

  return { tabRef, handleTabLayout };
};

export const useHandleTabContentLayout = (index: number) => {
  const {
    setRouteIndexToTabContentWidthMap,
    routeIndexToTabContentWidthMapSV,
  } = useTabLayoutContext();

  const updateTabContentWidthMap = useCallback(
    (width: number) => {
      setRouteIndexToTabContentWidthMap((prev) => ({
        ...prev,
        [index]: width,
      }));
    },
    [index, setRouteIndexToTabContentWidthMap]
  );

  const applyTabContentLayout = useCallback(
    ({ width }: MeasuredLayout) => {
      function updateTabContentWidthAndOffset() {
        'worklet';

        const prevWidth = routeIndexToTabContentWidthMapSV.value[index] ?? 0;
        if (width !== prevWidth) {
          routeIndexToTabContentWidthMapSV.value = {
            ...routeIndexToTabContentWidthMapSV.value,
            [index]: width,
          };
          runOnJS(updateTabContentWidthMap)(width);
        }
      }
      runOnUI(updateTabContentWidthAndOffset)();
    },
    [index, routeIndexToTabContentWidthMapSV, updateTabContentWidthMap]
  );

  const { ref: tabContentRef, onLayout: handleTabContentLayout } =
    useMeasuredLayout<View>(applyTabContentLayout);

  return { tabContentRef, handleTabContentLayout };
};
