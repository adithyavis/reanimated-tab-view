import React, { forwardRef, useImperativeHandle, useMemo } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { useScrollableContext } from '../../providers/Scrollable';
import { useInternalContext } from '../../providers/Internal';
import { StyleSheet } from 'react-native';
import { useScrollHandlers } from '../../hooks/scrollable/useScrollHandlers';
import { useSyncScrollWithPanTranslation } from '../../hooks/scrollable/useSyncScrollWithPanTranslation';

export function createTabViewScrollableComponent<P>(
  ScrollableComponent: React.ComponentType<P>
) {
  const _ScrollableComponent = ScrollableComponent as any;
  return React.memo(
    forwardRef<React.ComponentType<P>, P>((props, ref) => {
      //#region props
      const { children, ...rest } = props;
      //#endregion

      //#region context
      const { animatedTranslateYSV } = useScrollableContext();

      const { tabViewHeaderLayout } = useInternalContext();

      //#endregion

      //#region variables
      const scrollRef = useAnimatedRef();

      const scrollGesture = useMemo(
        () => Gesture.Native().shouldCancelWhenOutside(false),
        []
      );

      const scrollYSV = useSharedValue(0);

      const { onBeginDrag, onScroll } = useScrollHandlers(scrollYSV);
      //#endregion

      //#region styles
      const animatedStyle = useAnimatedStyle(() => {
        return {
          transform: [{ translateY: animatedTranslateYSV.value }],
        };
      }, [animatedTranslateYSV]);
      //#endregion

      //#region callbacks
      const handleScroll = useAnimatedScrollHandler({
        onBeginDrag: () => {
          onBeginDrag();
        },
        onScroll: (event) => {
          onScroll(event);
        },
      });
      //#endregion

      //#region hooks
      useImperativeHandle(ref, () => scrollRef.current as any);

      useSyncScrollWithPanTranslation(scrollRef, scrollYSV);
      //#endregion

      //#region render hooks
      const contentContainer = useMemo(() => {
        return (
          <Animated.View
            style={[
              styles.contentContainer,
              { paddingBottom: tabViewHeaderLayout.height },
              animatedStyle,
            ]}
          >
            {children}
          </Animated.View>
        );
      }, [children, animatedStyle, tabViewHeaderLayout.height]);
      //#endregion

      //#region render
      return (
        <GestureDetector gesture={scrollGesture}>
          <_ScrollableComponent
            ref={scrollRef}
            {...rest}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {contentContainer}
          </_ScrollableComponent>
        </GestureDetector>
      );
      //#endregion
    })
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});
