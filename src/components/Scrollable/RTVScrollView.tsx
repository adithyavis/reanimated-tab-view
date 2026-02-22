import React, { forwardRef, useImperativeHandle, useMemo } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import type { ScrollView } from 'react-native';

import { useHeaderContext } from '../../providers/Header';
import { useInternalContext } from '../../providers/Internal';
import { useScrollHandlers } from '../../hooks/scrollable/useScrollHandlers';
import { useSyncScrollWithPanTranslation } from '../../hooks/scrollable/useSyncScrollWithPanTranslation';
import { SHOULD_RENDER_ABSOLUTE_HEADER } from '../../constants/scrollable';

export const RTVScrollViewWithoutScrollHandler = React.memo(
  forwardRef<Animated.ScrollView, React.ComponentProps<typeof ScrollView>>(
    (props, ref) => {
      //#region props
      const { children, ...rest } = props;
      //#endregion

      //#region context
      const { animatedTranslateYSV } = useHeaderContext();

      const { tabViewHeaderLayout, tabBarLayout, tabViewCarouselLayout } =
        useInternalContext();

      //#endregion

      //#region variables
      const scrollRef = useAnimatedRef<Animated.ScrollView>();

      const scrollGesture = useMemo(
        () =>
          Gesture.Native()
            .shouldCancelWhenOutside(false)
            .disallowInterruption(true),
        []
      );
      //#endregion

      //#region styles
      const animatedContentContainerStyle = useAnimatedStyle(() => {
        return {
          transform: [{ translateY: animatedTranslateYSV.value }],
        };
      }, [animatedTranslateYSV]);

      const translatingContentContainerStyle = useMemo(() => {
        return [
          animatedContentContainerStyle,
          {
            paddingBottom: tabViewHeaderLayout.height,
            minHeight:
              tabViewCarouselLayout.height + tabViewHeaderLayout.height,
          },
        ];
      }, [
        animatedContentContainerStyle,
        tabViewCarouselLayout.height,
        tabViewHeaderLayout.height,
      ]);

      const nonTranslatingContentContainerStyle = useMemo(() => {
        return {
          paddingTop: tabBarLayout.height + tabViewHeaderLayout.height,
          minHeight: tabViewCarouselLayout.height + tabViewHeaderLayout.height,
        };
      }, [
        tabBarLayout.height,
        tabViewCarouselLayout.height,
        tabViewHeaderLayout.height,
      ]);
      //#endregion

      //#region hooks
      useImperativeHandle(ref, () => scrollRef.current as any);

      useSyncScrollWithPanTranslation(scrollRef);
      //#endregion

      //#region render
      return (
        <GestureDetector gesture={scrollGesture}>
          <Animated.ScrollView
            ref={scrollRef}
            {...rest}
            scrollEventThrottle={16}
          >
            {SHOULD_RENDER_ABSOLUTE_HEADER ? (
              <Animated.View
                style={[
                  styles.contentContainer,
                  nonTranslatingContentContainerStyle,
                ]}
              >
                {children}
              </Animated.View>
            ) : (
              <Animated.View
                style={[
                  styles.contentContainer,
                  translatingContentContainerStyle,
                ]}
              >
                {children}
              </Animated.View>
            )}
          </Animated.ScrollView>
        </GestureDetector>
      );
      //#endregion
    }
  )
);

export const RTVScrollView = React.memo(
  forwardRef<Animated.ScrollView, React.ComponentProps<typeof ScrollView>>(
    (props, ref) => {
      //#region props
      const {
        onScroll,
        onScrollEndDrag,
        onScrollBeginDrag,
        onMomentumScrollEnd,
        onMomentumScrollBegin,
        ...rest
      } = props;
      //#endregion

      //#region variables
      const scrollRef = useAnimatedRef<Animated.ScrollView>();

      const handleScroll = useScrollHandlers({
        onScroll,
        onScrollEndDrag,
        onScrollBeginDrag,
        onMomentumScrollEnd,
        onMomentumScrollBegin,
      });
      //#endregion

      //#region hooks
      useImperativeHandle(ref, () => scrollRef.current as any);
      //#endregion

      //#region render
      return (
        <RTVScrollViewWithoutScrollHandler
          {...rest}
          onScroll={handleScroll}
          ref={scrollRef}
        />
      );
      //#endregion
    }
  )
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});
