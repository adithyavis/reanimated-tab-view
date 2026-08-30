import * as React from 'react';

import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

type SegmentedControlProps = {
  values: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
  style?: StyleProp<ViewStyle>;
};

export const SegmentedControl = React.memo<SegmentedControlProps>(
  ({ values, selectedIndex, onChange, style }) => {
    return (
      <View style={[styles.container, style]}>
        {values.map((value, index) => {
          const isSelected = index === selectedIndex;
          return (
            <Pressable
              key={value}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              onPress={() => onChange(index)}
              style={[styles.segment, isSelected && styles.selectedSegment]}
            >
              <Text
                numberOfLines={1}
                style={[styles.label, isSelected && styles.selectedLabel]}
              >
                {value}
              </Text>
            </Pressable>
          );
        })}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(118, 118, 128, 0.12)',
    borderRadius: 9,
    padding: 2,
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 7,
  },
  selectedSegment: {
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 1,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#000000',
  },
  selectedLabel: {
    fontWeight: '600',
  },
});
