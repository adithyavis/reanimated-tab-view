import { useCallback, useState } from 'react';
import type { NativeMethods } from 'react-native';
import { useMeasuredLayout, type MeasuredLayout } from './useMeasuredLayout';

export function useLayout<T extends NativeMethods>() {
  const [layout, setLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const applyLayout = useCallback(({ x, y, width, height }: MeasuredLayout) => {
    setLayout((prevLayout) => ({ ...prevLayout, x, y, width, height }));
  }, []);

  const { ref, onLayout } = useMeasuredLayout<T>(applyLayout);

  return {
    ref,
    onLayout,
    ...layout,
  };
}
