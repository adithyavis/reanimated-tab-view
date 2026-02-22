import React from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';

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
    backgroundColor: 'rgb(32, 32, 32)',
  },
});
