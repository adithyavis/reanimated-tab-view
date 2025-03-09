import { useStateUpdatesListener } from './useStateUpdatesListener';
import { usePropsContext } from '../providers/Props';
import { useInternalContext } from '../providers/Internal';
import { useAnimatedReaction } from 'react-native-reanimated';

const useHandleIndexChange = () => {
  const { providedAnimatedRouteIndexSV, onIndexChange } = usePropsContext();

  const { animatedRouteIndex, currentRouteIndex } = useInternalContext();

  useStateUpdatesListener(currentRouteIndex, () => {
    onIndexChange?.(currentRouteIndex);
  });

  useAnimatedReaction(
    () => animatedRouteIndex.value,
    (value) => {
      if (providedAnimatedRouteIndexSV) {
        providedAnimatedRouteIndexSV.value = value;
      }
    },
    [providedAnimatedRouteIndexSV, animatedRouteIndex]
  );
};

export default useHandleIndexChange;
