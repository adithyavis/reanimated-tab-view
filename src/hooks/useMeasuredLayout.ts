import { useCallback, useLayoutEffect, useRef } from 'react';
import type {
  LayoutChangeEvent,
  LayoutRectangle,
  NativeMethods,
} from 'react-native';

export type MeasuredLayout = LayoutRectangle;

/**
 * Wires up both ways of learning a view's geometry.
 *
 * Under the new architecture layout is computed during the commit, so
 * `ref.measure` inside `useLayoutEffect` reports the final geometry in the same
 * frame it is calculated. `onLayout` only reaches JS as an event, after the
 * views have already been mounted, so it is kept as the signal for any layout
 * change that happens after mount.
 *
 * @see https://reactnative.dev/docs/the-new-architecture/layout-measurements
 */
export const useMeasuredLayout = <T extends NativeMethods>(
  applyLayout: (layout: MeasuredLayout) => void
) => {
  const ref = useRef<T>(null);

  const onLayout = useCallback(
    ({ nativeEvent }: LayoutChangeEvent) => {
      applyLayout(nativeEvent.layout);
    },
    [applyLayout]
  );

  useLayoutEffect(() => {
    ref.current?.measure((x, y, width, height) => {
      applyLayout({ x, y, width, height });
    });
  }, [applyLayout]);

  return { ref, onLayout };
};
