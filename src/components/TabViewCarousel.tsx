import React, { forwardRef, useCallback, useImperativeHandle } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import type { TabViewCarouselProps } from '../types/TabViewCarousel';
import {
  useCarouselJumpToIndex,
  useCarouselSwipePanGesture,
  useCarouselSwipeTranslationAnimatedStyle,
} from '../hooks/useCarouselSwipe';
import { useCarouselLazyLoading } from '../hooks/useCarouselLazyLoading';
import LazyLoader from './LazyLoader';
import SceneWrapper from './SceneWrapper';
import { usePropsContext } from '../providers/Props';
import { useInternalContext } from '../providers/Internal';
import { JumpContextProvider } from '../providers/Jump';
import {
  CarouselContextProvider,
  useCarouselContext,
} from '../providers/Carousel';
import { Scene } from './Scene';
import { SceneRendererContextProvider } from '../providers/SceneRenderer';
import type { LayoutChangeEvent } from 'react-native';

export type CarouselImperativeHandle = {
  jumpToRoute: (route: string) => void;
};

const TabViewCarouselWithoutProviders = React.memo(
  forwardRef<CarouselImperativeHandle, TabViewCarouselProps>((_, ref) => {
    //#region context
    const {
      keyboardDismissMode,
      navigationState,
      sceneContainerStyle,
      renderScene,
      onSwipeStart,
      onSwipeEnd,
    } = usePropsContext();

    const {
      initialRouteIndex,
      currentRouteIndex,
      setCurrentRouteIndex,
      setTabViewCarouselLayout,
    } = useInternalContext();

    const { translationPerSceneContainer } = useCarouselContext();
    //#endregion

    //#region callbacks
    const dismissKeyboard = Keyboard.dismiss;

    const handleSwipeStart = useCallback(() => {
      onSwipeStart?.();
      if (keyboardDismissMode === 'on-drag') {
        dismissKeyboard();
      }
    }, [dismissKeyboard, keyboardDismissMode, onSwipeStart]);

    const handleSwipeEnd = useCallback(() => {
      onSwipeEnd?.();
    }, [onSwipeEnd]);

    const updateCurrentRouteIndex = useCallback(
      (updatedIndex: number) => {
        const prevCurrentRouteIndex = currentRouteIndex;
        setCurrentRouteIndex(updatedIndex);
        if (updatedIndex !== prevCurrentRouteIndex) {
          if (keyboardDismissMode === 'auto') {
            Keyboard.dismiss();
          }
        }
      },
      [currentRouteIndex, setCurrentRouteIndex, keyboardDismissMode]
    );

    const onTabViewCarouselLayout = useCallback(
      ({ nativeEvent }: LayoutChangeEvent) => {
        const { width, height } = nativeEvent.layout;
        setTabViewCarouselLayout((prevLayout) => ({
          ...prevLayout,
          width,
          height,
        }));
      },
      [setTabViewCarouselLayout]
    );
    //#endregion

    //#region hooks
    const { isLazyLoadingEnabled, handleSceneMount, computeShouldRenderRoute } =
      useCarouselLazyLoading();

    const jumpToRoute = useCarouselJumpToIndex(updateCurrentRouteIndex);

    const swipePanGesture = useCarouselSwipePanGesture(
      updateCurrentRouteIndex,
      handleSwipeStart,
      handleSwipeEnd
    );

    const swipeTranslationAnimatedStyle =
      useCarouselSwipeTranslationAnimatedStyle();

    useImperativeHandle(
      ref,
      () => ({
        jumpToRoute,
      }),
      [jumpToRoute]
    );
    //#endregion

    //#region render
    return (
      <GestureDetector gesture={swipePanGesture}>
        <View style={[styles.container]} onLayout={onTabViewCarouselLayout}>
          {navigationState.routes.map((route, index) => {
            const shouldRender = computeShouldRenderRoute(index);
            const renderOffset = index * translationPerSceneContainer;
            return (
              <Animated.View
                key={route.key}
                style={[
                  styles.sceneContainer,
                  {
                    left: renderOffset,
                  },
                  sceneContainerStyle,
                  swipeTranslationAnimatedStyle,
                ]}
              >
                <SceneWrapper routeIndex={index}>
                  {shouldRender && (
                    <LazyLoader
                      shouldLazyLoad={
                        index !== initialRouteIndex && isLazyLoadingEnabled
                      }
                      onMount={() => handleSceneMount(index)}
                    >
                      <SceneRendererContextProvider route={route} index={index}>
                        <Scene renderScene={renderScene} route={route} />
                      </SceneRendererContextProvider>
                    </LazyLoader>
                  )}
                </SceneWrapper>
              </Animated.View>
            );
          })}
        </View>
      </GestureDetector>
    );
  })
  //#endregion
);

const TabViewCarousel = React.memo(
  forwardRef<CarouselImperativeHandle, TabViewCarouselProps>((props, ref) => {
    return (
      <CarouselContextProvider>
        <JumpContextProvider>
          <TabViewCarouselWithoutProviders {...props} ref={ref} />
        </JumpContextProvider>
      </CarouselContextProvider>
    );
  })
);

export default TabViewCarousel;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    overflow: 'hidden',
  },
  sceneContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  prevRouteSceneWrapper: {
    width: '100%',
    height: '100%',
  },
});
