import { useMemo } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import {
  cancelAnimation,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';
import {
  DECELERATION_RATE_FOR_SCROLLVIEW,
  GestureSource,
} from '../../constants/scrollable';
import { useScrollableContext } from '../../providers/Scrollable';

const ACTIVE_OFFSET_Y = [-10, 10];

export const useScrollLikePanGesture = () => {
  const { animatedTranslateYSV, gestureSourceSV, translateYBounds } =
    useScrollableContext();

  const initialTranslateYSV = useSharedValue(0);

  const scrollLikePanGesture = useMemo(() => {
    const gesture = Gesture.Pan()
      .activeOffsetY(ACTIVE_OFFSET_Y)
      .onTouchesDown(() => {
        cancelAnimation(animatedTranslateYSV);
      })
      .onStart(() => {
        initialTranslateYSV.value = animatedTranslateYSV.value;
        gestureSourceSV.value = GestureSource.PAN;
      })
      .onChange((event) => {
        animatedTranslateYSV.value = Math.min(
          Math.max(
            initialTranslateYSV.value - event.translationY,
            translateYBounds.lower
          ),
          translateYBounds.upper
        );
      })
      .onEnd((event) => {
        animatedTranslateYSV.value = withDecay({
          velocity: -event.velocityY,
          deceleration: DECELERATION_RATE_FOR_SCROLLVIEW,
          clamp: [translateYBounds.lower, translateYBounds.upper],
        });
      });

    return gesture;
  }, [
    animatedTranslateYSV,
    gestureSourceSV,
    initialTranslateYSV,
    translateYBounds,
  ]);

  return scrollLikePanGesture;
};
