import React, { forwardRef, useCallback, type ForwardedRef } from 'react';
import { type ScrollViewProps } from 'react-native';
import type { FlashListProps, FlashListRef } from '@shopify/flash-list';
import { RTVScrollView } from './RTVScrollView';

declare const require: (moduleName: string) => any;

const MISSING_FLASH_LIST_ERROR =
  'RTVFlashList requires "@shopify/flash-list" (v2 or newer) to be installed. ' +
  'Install it as a dependency of your app and rebuild.';

const DISABLED_MAINTAIN_VISIBLE_CONTENT_POSITION = { disabled: true };

let FlashList: React.ComponentType<any> | undefined;
try {
  FlashList = require('@shopify/flash-list').FlashList;
} catch {
  throw new Error(MISSING_FLASH_LIST_ERROR);
}

export type RTVFlashListProps<T> = FlashListProps<T> & {
  ref?: ForwardedRef<FlashListRef<T>>;
};

function _RTVFlashList<T>(
  props: FlashListProps<T>,
  ref: React.ForwardedRef<FlashListRef<T>>
) {
  const renderScrollComponent = useCallback(
    (scrollViewProps: ScrollViewProps) => {
      return <RTVScrollView {...scrollViewProps} />;
    },
    []
  );

  if (!FlashList) {
    throw new Error(MISSING_FLASH_LIST_ERROR);
  }

  return (
    <FlashList
      ref={ref}
      {...props}
      renderScrollComponent={renderScrollComponent}
      maintainVisibleContentPosition={
        DISABLED_MAINTAIN_VISIBLE_CONTENT_POSITION
      }
    />
  );
}

export const RTVFlashList = React.memo(forwardRef(_RTVFlashList)) as <T>(
  props: RTVFlashListProps<T>
) => ReturnType<typeof _RTVFlashList>;
