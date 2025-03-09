import type { SharedValue } from 'react-native-reanimated';
import type { ViewProps } from 'react-native';

export type TabViewCarouselProps = Omit<ViewProps, 'children'>;

export interface CarouselRenderItemInfo<Item> {
  item: Item;
  index: number;
  animationValue: SharedValue<number>;
}

export type CarouselRenderItem<Item> = (
  info: CarouselRenderItemInfo<Item>
) => React.ReactElement;
