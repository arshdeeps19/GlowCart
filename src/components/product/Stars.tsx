import React from 'react';
import { View, Text } from 'react-native';

export default function Stars({ value }: { value: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {[...Array(full)].map((_, i) => <Text key={'f'+i}>★</Text>)}
      {half && <Text>☆</Text>}
      {[...Array(empty)].map((_, i) => <Text key={'e'+i} style={{ color:'#d1d5db' }}>★</Text>)}
    </View>
  );
}