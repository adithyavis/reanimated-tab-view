import {
  cancelAnimation,
  runOnJS,
  useAnimatedScrollHandler,
  useWorkletCallback,
} from 'react-native-reanimated';
import type {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollViewProps,
} from 'react-native';
import { GestureSource } from '../../constants/scrollable';
import { useHeaderContext } from '../../providers/Header';
import { useSceneRendererContext } from '../../providers/SceneRenderer';

export const useScrollHandlers = ({
  onScroll: _onScroll,
  onScrollEndDrag: _onScrollEndDrag,
  onScrollBeginDrag: _onScrollBeginDrag,
  onMomentumScrollEnd: _onMomentumScrollEnd,
  onMomentumScrollBegin: _onMomentumScrollBegin,
}: Pick<
  ScrollViewProps,
  | 'onScroll'
  | 'onScrollEndDrag'
  | 'onScrollBeginDrag'
  | 'onMomentumScrollEnd'
  | 'onMomentumScrollBegin'
>) => {
  const { animatedTranslateYSV, translateYBounds, gestureSourceSV } =
    useHeaderContext();

  const { isRouteFocusedSV, scrollYSV } = useSceneRendererContext();

  const onBeginDrag = useWorkletCallback(() => {
    if (!isRouteFocusedSV.value) {
      return;
    }
    cancelAnimation(animatedTranslateYSV);
    gestureSourceSV.value = GestureSource.SCROLL;
  }, [animatedTranslateYSV, gestureSourceSV, isRouteFocusedSV]);

  const onScroll = useWorkletCallback(
    (event: NativeScrollEvent) => {
      scrollYSV.value = event.contentOffset.y;
      if (!isRouteFocusedSV.value) {
        return;
      }
      if (gestureSourceSV.value === GestureSource.SCROLL) {
        animatedTranslateYSV.value = Math.min(
          Math.max(event.contentOffset.y, translateYBounds.lower),
          translateYBounds.upper
        );
      }
    },
    [animatedTranslateYSV, gestureSourceSV, translateYBounds, isRouteFocusedSV]
  );

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

  return handleScroll;
};
