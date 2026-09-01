import type { SharedValue } from 'react-native-reanimated';

export const noop = () => {};

export const noopSharedValue = <T>(value: T): SharedValue<T> => ({
  get value() {
    return value;
  },
  set value(_next: T) {},
  get: () => value,
  set: noop,
  addListener: noop,
  removeListener: noop,
  modify: noop,
});
