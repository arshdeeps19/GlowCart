// src/components/layout/SearchBar.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet, ViewStyle } from 'react-native';

type Props = {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  style?: ViewStyle;              // <— let parent control horizontal padding
};

export default function SearchBar({ value, onChangeText, placeholder = 'Search for all products', style }: Props) {
  return (
    <View style={[s.wrap, style]}>
      <Text style={s.glyph}>🔍</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        style={s.input}
      />
    </View>
  );
}

const s = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,          // single underline
    borderBottomColor: '#e5e7eb',
    paddingBottom: 8,
  },
  glyph: { marginRight: 8 },
  input: { flex: 1, fontSize: 14, padding: 0 },
});