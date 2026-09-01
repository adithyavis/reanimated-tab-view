import { useCallback, useLayoutEffect, useRef } from 'react';
import type {
  LayoutChangeEvent,
  LayoutRectangle,
  NativeMethods,
} from 'react-native';

export type MeasuredLayout = LayoutRectangle;

const isSameLayout = (a: MeasuredLayout | null, b: MeasuredLayout) =>
  a !== null &&
  a.x === b.x &&
  a.y === b.y &&
  a.width === b.width &&
  a.height === b.height;

export const useMeasuredLayout = <T extends NativeMethods>(
  applyLayout: (layout: MeasuredLayout) => void
) => {
  const ref = useRef<T>(null);
  const lastLayoutRef = useRef<MeasuredLayout | null>(null);

  const apply = useCallback(
    (layout: MeasuredLayout) => {
      if (isSameLayout(lastLayoutRef.current, layout)) {
        return;
      }
      lastLayoutRef.current = layout;
      applyLayout(layout);
    },
    [applyLayout]
  );

  const onLayout = useCallback(
    ({ nativeEvent }: LayoutChangeEvent) => {
      apply(nativeEvent.layout);
    },
    [apply]
  );

  useLayoutEffect(() => {
    let isCancelled = false;
    ref.current?.measure((x, y, width, height) => {
      if (isCancelled) {
        return;
      }
      if (![x, y, width, height].every(Number.isFinite)) {
        return;
      }
      if (width === 0 && height === 0 && lastLayoutRef.current !== null) {
        return;
      }
      apply({ x, y, width, height });
    });
    return () => {
      isCancelled = true;
    };
  });

  return { ref, onLayout };
};
