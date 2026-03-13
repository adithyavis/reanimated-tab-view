import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  type ForwardedRef,
} from 'react';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
} from 'react-native-reanimated';
import type { FlatListProps } from 'react-native';
import { useScrollHandlers } from '../../hooks/scrollable/useScrollHandlers';
import { useHeaderContext } from '../../providers/Header';
import { useInternalContext } from '../../providers/Internal';
import { useSyncScrollWithPanTranslation } from '../../hooks/scrollable/useSyncScrollWithPanTranslation';
import { SHOULD_RENDER_ABSOLUTE_HEADER } from '../../constants/scrollable';

function _RTVFlatList<T>(
  props: FlatListProps<T>,
  ref: ForwardedRef<Animated.FlatList<T>>
) {
  const {
    onScroll,
    onScrollEndDrag,
    onScrollBeginDrag,
    onMomentumScrollEnd,
    onMomentumScrollBegin,
    contentContainerStyle,
    ...restProps
  } = props;

  const flatListRef = useAnimatedRef<Animated.FlatList<T>>();

  const handleScroll = useScrollHandlers({
    onScroll,
    onScrollEndDrag,
    onScrollBeginDrag,
    onMomentumScrollEnd,
    onMomentumScrollBegin,
  });

  const { animatedTranslateYSV } = useHeaderContext();
  const { tabViewHeaderLayout, tabBarLayout, tabViewCarouselLayout } =
    useInternalContext();

  const scrollGesture = useMemo(
    () =>
      Gesture.Native()
        .shouldCancelWhenOutside(false)
        .disallowInterruption(true),
    []
  );

  const animatedContentContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: animatedTranslateYSV.value }],
    };
  }, [animatedTranslateYSV]);

  const resolvedContentContainerStyle = useMemo(() => {
    if (SHOULD_RENDER_ABSOLUTE_HEADER) {
      return [
        contentContainerStyle,
        {
          paddingTop: tabBarLayout.height + tabViewHeaderLayout.height,
          minHeight: tabViewCarouselLayout.height + tabViewHeaderLayout.height,
        },
      ];
    }
    return [
      contentContainerStyle,
      animatedContentContainerStyle,
      {
        paddingBottom: tabViewHeaderLayout.height,
        minHeight: tabViewCarouselLayout.height + tabViewHeaderLayout.height,
      },
    ];
  }, [
    contentContainerStyle,
    animatedContentContainerStyle,
    tabBarLayout.height,
    tabViewHeaderLayout.height,
    tabViewCarouselLayout.height,
  ]);

  useImperativeHandle(ref, () => flatListRef.current as Animated.FlatList<T>);

  useSyncScrollWithPanTranslation(
    flatListRef as unknown as Parameters<typeof useSyncScrollWithPanTranslation>[0]
  );

  // Cast needed: Reanimated 4's AnimatedFlatList types are stricter than needed
  // for valid prop combinations (animated onScroll + animated ref + animated contentContainerStyle)
  const FlatListComponent = Animated.FlatList as unknown as React.ComponentType<
    FlatListProps<T> & { ref?: React.Ref<Animated.FlatList<T>> }
  >;

  return (
    <GestureDetector gesture={scrollGesture}>
      <FlatListComponent
        ref={flatListRef as unknown as React.Ref<Animated.FlatList<T>>}
        {...restProps}
        contentContainerStyle={resolvedContentContainerStyle}
        onScroll={handleScroll as unknown as NonNullable<FlatListProps<T>['onScroll']>}
        scrollEventThrottle={16}
      />
    </GestureDetector>
  );
}

export const RTVFlatList = React.memo(forwardRef(_RTVFlatList)) as <T>(
  props: FlatListProps<T> & {
    ref?: ForwardedRef<Animated.FlatList<T>>;
  }
) => ReturnType<typeof _RTVFlatList>;
