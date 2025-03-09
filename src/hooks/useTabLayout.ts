import { useCallback } from 'react';
import { useTabLayoutContext } from '../providers/TabLayout';
import { runOnJS, runOnUI } from 'react-native-reanimated';
import type { LayoutChangeEvent } from 'react-native';
import { useInternalContext } from '../providers/Internal';

export const useHandleTabLayout = (index: number) => {
  const { noOfRoutes } = useInternalContext();
  const { routeIndexToTabWidthMapSV, routeIndexToTabOffsetMapSV } =
    useTabLayoutContext();

  const handleTabLayout = useCallback(
    ({ nativeEvent }: LayoutChangeEvent) => {
      function updateTabWidthAndOffset() {
        'worklet';

        const { width } = nativeEvent.layout;
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
      setRouteIndexToTabContentWidthMap((prev) => ({
        ...prev,
        [index]: width,
      }));
    },
    [index, setRouteIndexToTabContentWidthMap]
  );

  const handleTabContentLayout = useCallback(
    ({ nativeEvent }: LayoutChangeEvent) => {
      function updateTabContentWidthAndOffset() {
        'worklet';

        const { width } = nativeEvent.layout;
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
