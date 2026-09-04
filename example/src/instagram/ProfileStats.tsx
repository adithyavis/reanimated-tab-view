import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CustomText } from './basicComponents/CustomText';
import { profile } from './profile';

export const ProfileStats = () => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.name}>{profile.displayName}</CustomText>
      <View style={styles.stats}>
        {profile.stats.map((stat) => (
          <View key={stat.label} style={styles.stat}>
            <CustomText style={styles.value}>{stat.value}</CustomText>
            <CustomText style={styles.label}>{stat.label}</CustomText>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 30,
  },
  stat: {
    alignItems: 'center',
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
  },
  label: {
    fontSize: 14,
    marginTop: 2,
  },
});
