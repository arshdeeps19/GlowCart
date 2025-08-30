import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Props = { title: string; countText?: string; actionLabel?: string; onActionPress?: () => void };

export default function SectionHeader({ title, countText, actionLabel = 'Apply Filter', onActionPress }: Props) {
  return (
    <View style={s.wrap}>
      <View>
        <Text style={s.title}>{title}</Text>
        {!!countText && <Text style={s.sub}>{countText}</Text>}
      </View>
      <TouchableOpacity style={s.btn} onPress={onActionPress}>
        <Text style={s.btnText}>{actionLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { paddingHorizontal: 16, paddingBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 18, fontWeight: '800', color: '#111827' },
  sub: { color: '#6b7280', marginTop: 2 },
  btn: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#eee', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },
  btnText: { fontWeight: '600', color: '#111827' },
});