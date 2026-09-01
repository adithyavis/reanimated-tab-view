import React, { useCallback, useMemo } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { RTVFlatList } from 'reanimated-tab-view';

type Photo = {
  url: string;
};

const { width: screenWidth } = Dimensions.get('window');
const photoWidth = (screenWidth - 4) / 3; // 3 photos per row with 2px gaps
const photoHeight = photoWidth * 1.6;

export const InstagramPhotoGrid: React.FC = React.memo(() => {
  const data = useMemo(() => photos, []);
  const renderItem = useCallback(
    ({ item }: { item: Photo }) => <InstagramPhoto item={item} />,
    []
  );
  const keyExtractor = useCallback(
    (_: Photo, index: number) => `photo-${index}`,
    []
  );

  return (
    <RTVFlatList
      data={data}
      renderItem={renderItem}
      numColumns={3}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
    />
  );
});

const InstagramPhoto = React.memo(({ item }: { item: Photo }) => {
  const source = useMemo(() => ({ uri: item.url }), [item.url]);
  return (
    <View style={styles.photoContainer}>
      <Image source={source} style={styles.photo} resizeMode="cover" />
    </View>
  );
});

const photos: Photo[] = Array.from({ length: 500 }, (_, index) => {
  const randomIndex = index % 50;
  return {
    url: `https://picsum.photos/100/180?random=${randomIndex}`,
  };
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photoContainer: {
    width: photoWidth,
    height: photoHeight,
    marginRight: 2,
    marginBottom: 2,
    backgroundColor: 'rgb(128,128,128)',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
});
