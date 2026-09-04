import React from 'react';
import { StyleSheet, View } from 'react-native';

import { NoteBubble } from './NoteBubble';
import { ProfileAvatar } from './ProfileAvatar';
import { ProfileStats } from './ProfileStats';
import { ProfileBio } from './ProfileBio';
import { ProfileActionButtons } from './ProfileActionButtons';
import { profile } from './profile';
import { colors, metrics } from './theme';

export const HEADER_HEIGHT = 222;

const AVATAR_URI = `https://picsum.photos/id/${profile.avatarId}/200/200`;

const NOTE_OVERHANG = 22;

export const InstagramHeader = () => {
  return (
    <View style={styles.header}>
      <View style={styles.identityRow}>
        <View style={styles.avatarColumn}>
          <NoteBubble text={profile.notePrompt} style={styles.note} />
          <ProfileAvatar uri={AVATAR_URI} showAddBadge />
        </View>
        <ProfileStats />
      </View>
      <ProfileBio />
      <ProfileActionButtons />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.background,
    paddingHorizontal: metrics.screenPadding,
    paddingTop: 8,
    paddingBottom: 14,
  },
  identityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarColumn: {
    paddingTop: NOTE_OVERHANG,
    marginRight: 20,
  },
  note: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    zIndex: 1,
  },
});
