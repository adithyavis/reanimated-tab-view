import React from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';
import { colors } from '../theme';

type CustomViewProps = ViewProps;

export const CustomView = ({ children, style, ...props }: CustomViewProps) => {
  return (
    <View style={[styles.view, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: colors.background,
  },
});
