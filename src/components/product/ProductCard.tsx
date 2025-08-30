import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export type BasicProduct = {
  id: number;
  title: string;
  price: number;
  images?: string[];
  thumbnail?: string;
};

type Props = { item: BasicProduct; onPress?: () => void; onToggleWish?: () => void };

export function ProductCard({ item, onPress, onToggleWish }: Props) {
  const img = item.images?.[0] || item.thumbnail;

  return (
    <TouchableOpacity style={s.card} activeOpacity={0.9} onPress={onPress}>
      <Image source={{ uri: img }} style={s.img} />

      <View style={{ padding: 10 }}>
        <Text numberOfLines={1} style={s.title}>{item.title}</Text>

        <View style={s.priceRow}>
          <Text style={s.price}>${item.price}</Text>
          <TouchableOpacity onPress={onToggleWish} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={s.heart}>♡</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  card: {
    flex: 1, backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden',
    borderWidth: 1, borderColor: '#eee',
  },
  img: { width: '100%', height: 140, resizeMode: 'cover' },
  title: { fontWeight: '600' },
  priceRow: { marginTop: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  price: { fontWeight: '800' },
  heart: { fontSize: 16, color: '#b94f58' },
});
