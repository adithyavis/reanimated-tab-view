import React, { useCallback, useMemo } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { RTVFlatList } from 'reanimated-tab-view';
import { CustomText } from './basicComponents/CustomText';
import { CarouselIcon, PlayIcon } from './assets/ChromeIcons';
import type { MediaItem } from './profile';
import { colors, metrics } from './theme';

const { width: screenWidth } = Dimensions.get('window');

const GAP = metrics.gridGap;
const TILE_WIDTH = (screenWidth - GAP * 2) / 3;

export const PHOTO_ASPECT_RATIO = 4 / 3;
export const REEL_ASPECT_RATIO = 16 / 9;

type InstagramMediaGridProps = {
  data: MediaItem[];

  aspectRatio: number;
};

export const InstagramMediaGrid = React.memo<InstagramMediaGridProps>(
  ({ data, aspectRatio }) => {
    const tileStyle = useMemo(
      () => [styles.tile, { height: TILE_WIDTH * aspectRatio }],
      [aspectRatio]
    );

    const renderItem = useCallback(
      ({ item }: { item: MediaItem }) => (
        <MediaTile item={item} style={tileStyle} />
      ),
      [tileStyle]
    );

    const keyExtractor = useCallback((item: MediaItem) => item.key, []);

    return (
      <RTVFlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={3}
        columnWrapperStyle={styles.row}
        initialNumToRender={12}
        showsVerticalScrollIndicator={false}
      />
    );
  }
);

type MediaTileProps = {
  item: MediaItem;
  style: StyleProp<ViewStyle>;
};

const MediaTile = React.memo(({ item, style }: MediaTileProps) => {
  const source = useMemo(() => ({ uri: item.uri }), [item.uri]);

  return (
    <View style={style}>
      <Image source={source} style={styles.image} resizeMode="cover" />
      {item.badge === 'carousel' && (
        <CarouselIcon
          size={18}
          color={colors.textPrimary}
          style={styles.badge}
        />
      )}
      {item.badge === 'video' && (
        <PlayIcon size={18} color={colors.textPrimary} style={styles.badge} />
      )}
      {item.views != null && (
        <View style={styles.views}>
          <PlayIcon size={13} color={colors.textPrimary} />
          <CustomText style={styles.viewsLabel}>{item.views}</CustomText>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    gap: GAP,
  },
  tile: {
    width: TILE_WIDTH,
    marginBottom: GAP,
    backgroundColor: colors.placeholder,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 7,
    right: 7,
  },
  views: {
    position: 'absolute',
    left: 7,
    bottom: 7,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  viewsLabel: {
    fontSize: 12,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowRadius: 3,
  },
});
