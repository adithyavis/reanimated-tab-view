import { Platform } from 'react-native';

export const DECELERATION_RATE_FOR_SCROLLVIEW = Platform.select({
  ios: 0.9998,
  android: 0.985,
  default: 1,
});

export enum GestureSource {
  PAN = 'PAN',
  SCROLL = 'SCROLL',
}
