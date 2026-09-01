import React, { forwardRef, useCallback, type ForwardedRef } from 'react';
import { type ScrollViewProps } from 'react-native';
import type {
  LegendListProps,
  LegendListRef,
} from '@legendapp/list/react-native';
import { RTVScrollView } from './RTVScrollView';

declare const require: (moduleName: string) => any;

const MISSING_LEGEND_LIST_ERROR =
  'RTVLegendList requires "@legendapp/list" (v3 or newer) to be installed. ' +
  'Install it as a dependency of your app and rebuild.';

let LegendList: React.ComponentType<any> | undefined;
try {
  LegendList = require('@legendapp/list/react-native').LegendList;
} catch {
    throw new Error(MISSING_LEGEND_LIST_ERROR);
}

export type RTVLegendListProps<T> = LegendListProps<T> & {
  ref?: ForwardedRef<LegendListRef>;
};

function _RTVLegendList<T>(
  props: LegendListProps<T>,
  ref: React.ForwardedRef<LegendListRef>
) {
  const renderScrollComponent = useCallback(
    (scrollViewProps: ScrollViewProps) => {
      return <RTVScrollView {...scrollViewProps} />;
    },
    []
  );

  if (!LegendList) {
    throw new Error(MISSING_LEGEND_LIST_ERROR);
  }

  return (
    <LegendList
      ref={ref}
      {...props}
      renderScrollComponent={renderScrollComponent}
      maintainVisibleContentPosition={false}
    />
  );
}

export const RTVLegendList = React.memo(forwardRef(_RTVLegendList)) as <T>(
  props: RTVLegendListProps<T>
) => ReturnType<typeof _RTVLegendList>;
