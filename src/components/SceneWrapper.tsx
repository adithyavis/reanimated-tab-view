import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { usePropsContext } from '../providers/Props';
import { useJumpContext } from '../providers/Jump';

type SceneWrapperProps = {
  routeIndex: number;
  children?: React.ReactNode;
};

const SceneWrapper: React.FC<SceneWrapperProps> = React.memo(
  ({ routeIndex, children }) => {
    const { jumpMode } = usePropsContext();
    const {
      smoothJumpStartRouteIndexSV,
      jumpEndRouteIndexSV,
      smoothJumpStartRouteTranslationXSV,
    } = useJumpContext();

    const sceneWrapperAnimatedStyle = useAnimatedStyle(() => {
      if (jumpMode !== 'smooth') {
        return { transform: [{ translateX: 0 }], opacity: 1 };
      }
      const isPrevRoute = routeIndex === smoothJumpStartRouteIndexSV.value;
      const isInBetweenPrevAndJumpRoute =
        jumpEndRouteIndexSV.value == null
          ? false
          : routeIndex >
              Math.min(
                smoothJumpStartRouteIndexSV.value,
                jumpEndRouteIndexSV.value
              ) &&
            routeIndex <
              Math.max(
                smoothJumpStartRouteIndexSV.value,
                jumpEndRouteIndexSV.value
              );
      return {
        transform: [
          {
            translateX: isPrevRoute
              ? smoothJumpStartRouteTranslationXSV.value
              : 0,
          },
        ],
        opacity: !isInBetweenPrevAndJumpRoute ? 1 : 0,
      };
    }, [routeIndex, jumpMode, smoothJumpStartRouteTranslationXSV]);
    return (
      <Animated.View
        style={[styles.prevRouteSceneWrapper, sceneWrapperAnimatedStyle]}
      >
        {children}
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  prevRouteSceneWrapper: {
    width: '100%',
    height: '100%',
  },
});

export default SceneWrapper;
