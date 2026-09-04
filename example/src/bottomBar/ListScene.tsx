import React from 'react';
import { SceneScrollView } from './SceneScrollView';
import { StoreSection } from './StoreRow';
import type { StorySection } from './storeData';

type ListSceneProps = {
  title: string;
  eyebrow?: string;
  sections: StorySection[];
  children?: React.ReactNode;
};

export const ListScene = React.memo<ListSceneProps>(
  ({ title, eyebrow, sections, children }) => (
    <SceneScrollView title={title} eyebrow={eyebrow}>
      {children}
      {sections.map((section) => (
        <StoreSection key={section.id} section={section} />
      ))}
    </SceneScrollView>
  )
);
