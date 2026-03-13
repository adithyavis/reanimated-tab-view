import { useCallback } from 'react';
import { useTabLayoutContext } from '../providers/TabLayout';
import type { RouteIndexToTabContentWidthMap } from '../types/TabBar';
import { runOnJS, runOnUI } from 'react-native-reanimated';
import type { LayoutChangeEvent } from 'react-native';
import { useInternalContext } from '../providers/Internal';

export const useHandleTabLayout = (index: number) => {
  const { noOfRoutes } = useInternalContext();
  const { routeIndexToTabWidthMapSV, routeIndexToTabOffsetMapSV } =
    useTabLayoutContext();

  const handleTabLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const layout = event.nativeEvent.layout;
      function updateTabWidthAndOffset() {
        'worklet';

        const { width } = layout;
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
  return { handleTabLayout };
};

export const useHandleTabContentLayout = (index: number) => {
  const {
    setRouteIndexToTabContentWidthMap,
    routeIndexToTabContentWidthMapSV,
  } = useTabLayoutContext();

  const updateTabContentWidthMap = useCallback(
    (width: number) => {
      setRouteIndexToTabContentWidthMap((prev: RouteIndexToTabContentWidthMap) => ({
        ...prev,
        [index]: width,
      }));
    },
    [index, setRouteIndexToTabContentWidthMap]
  );

  const handleTabContentLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const layout = event.nativeEvent.layout;
      function updateTabContentWidthAndOffset() {
        'worklet';

        const { width } = layout;
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
  return { handleTabContentLayout };
};
