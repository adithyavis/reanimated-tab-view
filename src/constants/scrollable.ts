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

export enum ScrollableType {
  SCROLL_VIEW = 'SCROLL_VIEW',
  FLAT_LIST = 'FLAT_LIST',
  VIRTUALIZED_LIST = 'VIRTUALIZED_LIST',
  SECTION_LIST = 'SECTION_LIST',
  FLASH_LIST = 'FLASH_LIST',
}
