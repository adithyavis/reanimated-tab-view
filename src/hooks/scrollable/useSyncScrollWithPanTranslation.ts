import { scrollTo, useAnimatedReaction } from 'react-native-reanimated';
import { useHeaderContext } from '../../providers/Header';
import { useSceneRendererContext } from '../../providers/SceneRenderer';
import { GestureSource } from '../../constants/scrollable';

export const useSyncScrollWithPanTranslation = (
  scrollRef: React.RefObject<
    React.Component<Record<string, any>, Record<string, any>, any>
  >
) => {
  const { animatedTranslateYSV, gestureSourceSV, translateYBounds } =
    useHeaderContext();
  const { isRouteFocusedSV, scrollYSV } = useSceneRendererContext();

  useAnimatedReaction(
    () => animatedTranslateYSV.value,
    (animatedTranslateY) => {
      const scrollToY = animatedTranslateY;
      if (
        !isRouteFocusedSV.value &&
        (scrollToY < translateYBounds.upper ||
          (scrollToY === translateYBounds.upper &&
            scrollYSV.value <= translateYBounds.upper))
      ) {
        scrollTo(scrollRef, 0, scrollToY, false);
      } else {
        if (gestureSourceSV.value === GestureSource.PAN) {
          scrollTo(scrollRef, 0, scrollToY, false);
        }
      }
    },
    [
      animatedTranslateYSV,
      gestureSourceSV,
      isRouteFocusedSV,
      scrollRef,
      scrollYSV,
      translateYBounds,
    ]
  );
};
