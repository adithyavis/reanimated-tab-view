import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { ListItemData } from './data';

export const ListItemRow = React.memo(function ListItemRow({
  item,
}: {
  item: ListItemData;
}) {
  return (
    <View
      style={[styles.row, { backgroundColor: item.color, height: item.height }]}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.12)',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
    color: 'rgba(0,0,0,0.55)',
  },
});
