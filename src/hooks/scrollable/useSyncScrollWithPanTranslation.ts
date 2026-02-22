import { scrollTo, useAnimatedReaction } from 'react-native-reanimated';
import { useHeaderContext } from '../../providers/Header';
import { useSceneRendererContext } from '../../providers/SceneRenderer';
import { GestureSource } from '../../constants/scrollable';

export const useSyncScrollWithPanTranslation = (
  scrollRef: React.RefObject<
    React.Component<Record<string, any>, Record<string, any>, any>
  >
) => {
  const { animatedTranslateYSV, gestureSourceSV, translateYBoundsUpperSV } =
    useHeaderContext();
  const { isRouteFocusedSV, scrollYSV } = useSceneRendererContext();

  useAnimatedReaction(
    () => animatedTranslateYSV.value,
    (animatedTranslateY) => {
      const scrollToY = animatedTranslateY;
      const translateYBoundsUpper = translateYBoundsUpperSV.value;
      if (
        !isRouteFocusedSV.value &&
        (scrollToY < translateYBoundsUpper ||
          (scrollToY === translateYBoundsUpper &&
            scrollYSV.value <= translateYBoundsUpper))
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
      translateYBoundsUpperSV,
    ]
  );
};
