import React, { forwardRef, useImperativeHandle, useMemo } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
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
import type { ScrollView } from 'react-native';
import type { NativeSyntheticEvent } from 'react-native';
import type { NativeScrollEvent } from 'react-native';

export const RTVScrollView = React.memo(
  forwardRef<
    React.ForwardedRef<Animated.ScrollView>,
    React.ComponentProps<typeof ScrollView>
  >((props, ref) => {
    //#region props
    const {
      children,
      onScroll: _onScroll,
      onScrollEndDrag: _onScrollEndDrag,
      onScrollBeginDrag: _onScrollBeginDrag,
      onMomentumScrollEnd: _onMomentumScrollEnd,
      onMomentumScrollBegin: _onMomentumScrollBegin,
      ...rest
    } = props;
    //#endregion

    //#region context
    const { animatedTranslateYSV } = useScrollableContext();

    const { tabViewHeaderLayout, tabViewCarouselLayout } = useInternalContext();

    //#endregion

    //#region variables
    const scrollRef = useAnimatedRef<Animated.ScrollView>();

    const scrollGesture = useMemo(
      () => Gesture.Native().shouldCancelWhenOutside(false),
      []
    );

    const scrollYSV = useSharedValue(0);

    const { onBeginDrag, onScroll } = useScrollHandlers(scrollYSV);
    //#endregion

    //#region styles
    const animatedContentContainerStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateY: animatedTranslateYSV.value }],
        paddingBottom: tabViewHeaderLayout.height,
        minHeight: tabViewCarouselLayout.height + tabViewHeaderLayout.height,
      };
    }, [
      animatedTranslateYSV,
      tabViewCarouselLayout.height,
      tabViewHeaderLayout.height,
    ]);
    //#endregion

    //#region callbacks
    const handleScroll = useAnimatedScrollHandler({
      onScroll: (event) => {
        onScroll(event);
        if (_onScroll) {
          runOnJS(_onScroll)({
            nativeEvent: event,
          } as NativeSyntheticEvent<NativeScrollEvent>);
        }
      },
      onBeginDrag: (event) => {
        onBeginDrag();
        if (_onScrollBeginDrag) {
          runOnJS(_onScrollBeginDrag)({
            nativeEvent: event,
          } as NativeSyntheticEvent<NativeScrollEvent>);
        }
      },
      onEndDrag: (event) => {
        if (_onScrollEndDrag) {
          runOnJS(_onScrollEndDrag)({
            nativeEvent: event,
          } as NativeSyntheticEvent<NativeScrollEvent>);
        }
      },
      onMomentumEnd: (event) => {
        if (_onMomentumScrollEnd) {
          runOnJS(_onMomentumScrollEnd)({
            nativeEvent: event,
          } as NativeSyntheticEvent<NativeScrollEvent>);
        }
      },
      onMomentumBegin: (event) => {
        if (_onMomentumScrollBegin) {
          runOnJS(_onMomentumScrollBegin)({
            nativeEvent: event,
          } as NativeSyntheticEvent<NativeScrollEvent>);
        }
      },
    });
    //#endregion

    //#region hooks
    useImperativeHandle(ref, () => scrollRef.current as any);

    useSyncScrollWithPanTranslation(scrollRef, scrollYSV);
    //#endregion

    //#region render
    return (
      <GestureDetector gesture={scrollGesture}>
        <Animated.ScrollView
          ref={scrollRef}
          {...rest}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <Animated.View
            style={[styles.contentContainer, animatedContentContainerStyle]}
          >
            {children}
          </Animated.View>
        </Animated.ScrollView>
      </GestureDetector>
    );
    //#endregion
  })
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});
