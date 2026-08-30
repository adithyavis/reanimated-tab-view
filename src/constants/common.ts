import type { SharedValue } from 'react-native-reanimated';

export const noop = () => {};

export const noopSharedValue = <T>(value: T): SharedValue<T> => ({
  value,
  get: () => value,
  set: noop,
  addListener: noop,
  removeListener: noop,
  modify: noop,
});
