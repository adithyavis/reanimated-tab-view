import { useCallback, type Dispatch, type SetStateAction } from 'react';
import type { NativeMethods } from 'react-native';
import type { Layout } from '../types/common';
import { useMeasuredLayout, type MeasuredLayout } from './useMeasuredLayout';

export function useLayout<T extends NativeMethods>(
  setLayout: Dispatch<SetStateAction<Layout>>
) {
  const applyLayout = useCallback(
    ({ width, height }: MeasuredLayout) => {
      setLayout((prevLayout) =>
        prevLayout.width === width && prevLayout.height === height
          ? prevLayout
          : { ...prevLayout, width, height }
      );
    },
    [setLayout]
  );

  return useMeasuredLayout<T>(applyLayout);
}
