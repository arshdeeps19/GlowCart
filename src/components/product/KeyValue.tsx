import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function KeyValue({ k, v }: { k: string; v: string }) {
  return (
    <View style={s.kv}>
      <Text style={s.k}>{k}</Text>
      <Text style={s.v}>{v}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  kv: { width: '50%', padding: 12, borderRightWidth: 1, borderRightColor: '#eee', borderBottomWidth: 1, borderBottomColor: '#eee', backgroundColor: '#fff' },
  k: { color: '#6b7280' },
  v: { fontWeight: '700', marginTop: 2 },
});