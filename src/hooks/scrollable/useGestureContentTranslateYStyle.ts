import { useAnimatedStyle } from 'react-native-reanimated';
import { useScrollableContext } from '../../providers/Scrollable';

export const useGestureContentTranslateYStyle = () => {
  const { animatedTranslateYSV } = useScrollableContext();

  return useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -animatedTranslateYSV.value }],
    };
  });
};
