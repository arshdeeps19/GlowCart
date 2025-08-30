import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SocialPill({ label }: { label: string }) {
  return (
    <View style={s.pill}>
      <Text style={{ fontWeight: '700' }}>{label}</Text>
    </View>
  );
}
const s = StyleSheet.create({
  pill: {
    width: 48, height: 48, borderRadius: 10, backgroundColor: '#fff',
    borderWidth: 1, borderColor: '#eee', alignItems: 'center', justifyContent: 'center',
  },
});