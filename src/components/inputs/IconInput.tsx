import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';

type Props = TextInputProps & { icon?: string };

export default function IconInput({ icon, style, ...rest }: Props) {
  return (
    <View style={s.wrap}>
      <TextInput {...rest} style={[s.input, style]} placeholderTextColor="#9ca3af" />
      {icon ? <Text style={s.icon}>{icon}</Text> : null}
    </View>
  );
}

const s = StyleSheet.create({
  wrap: {
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    paddingRight: 44,
    marginTop: 12,
  },
  input: { paddingVertical: 12, paddingHorizontal: 12, fontSize: 14 },
  icon: { position: 'absolute', right: 12, top: 10, fontSize: 18, color: '#6b7280' },
});