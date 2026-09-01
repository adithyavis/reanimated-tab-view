import React from 'react';
import { RTVLegendList, RTVRefreshControl } from 'reanimated-tab-view';
import type { LegendListRenderItemProps } from '@legendapp/list/react-native';
import { ListDemoTabView } from '../lists/ListDemoTabView';
import { ListItemRow } from '../lists/ListItemRow';
import type { ListItemData } from '../lists/data';

const renderItem = ({ item }: LegendListRenderItemProps<ListItemData>) => (
  <ListItemRow item={item} />
);

const keyExtractor = (item: ListItemData) => item.id;

const LegendListScene = ({ data }: { data: ListItemData[] }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const handleRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  }, []);

  return (
    <RTVLegendList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      recycleItems
      refreshControl={
        <RTVRefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    />
  );
};

const renderList = (data: ListItemData[]) => <LegendListScene data={data} />;

export const LegendListScreen = () => (
  <ListDemoTabView title="RTVLegendList" renderList={renderList} />
);
