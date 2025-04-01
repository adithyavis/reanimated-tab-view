import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  type ForwardedRef,
} from 'react';
import { type ScrollViewProps } from 'react-native';
import Animated from 'react-native-reanimated';
import { RTVScrollView } from './RTVScrollView';
import type { FlatListProps } from 'react-native';

function _RTVFlatList<T>(
  props: FlatListProps<T>,
  ref: React.ForwardedRef<Animated.FlatList<T>>
) {
  const flatListRef = useRef<Animated.FlatList<T>>(null);
  const renderScrollComponent = useCallback(
    (scrollViewProps: ScrollViewProps) => {
      return <RTVScrollView {...scrollViewProps} />;
    },
    []
  );
  useImperativeHandle(ref, () => flatListRef.current as any);
  return (
    <Animated.FlatList
      ref={flatListRef}
      {...props}
      renderScrollComponent={renderScrollComponent}
    />
  );
}

export const RTVFlatList = React.memo(forwardRef(_RTVFlatList)) as <T>(
  props: FlatListProps<T> & {
    ref?: ForwardedRef<Animated.FlatList<T>>;
  }
) => ReturnType<typeof _RTVFlatList>;
