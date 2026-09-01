import React from 'react';
import { RTVFlashList, RTVRefreshControl } from 'reanimated-tab-view';
import type { ListRenderItemInfo } from '@shopify/flash-list';
import { ListDemoTabView } from '../lists/ListDemoTabView';
import { ListItemRow } from '../lists/ListItemRow';
import type { ListItemData } from '../lists/data';

const renderItem = ({ item }: ListRenderItemInfo<ListItemData>) => (
  <ListItemRow item={item} />
);

const keyExtractor = (item: ListItemData) => item.id;

const FlashListScene = ({ data }: { data: ListItemData[] }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const handleRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  }, []);

  return (
    <RTVFlashList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      refreshControl={
        <RTVRefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    />
  );
};

const renderList = (data: ListItemData[]) => <FlashListScene data={data} />;

export const FlashListScreen = () => (
  <ListDemoTabView title="RTVFlashList" renderList={renderList} />
);
