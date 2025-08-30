import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import Stars from '../components/product/Stars';
import KeyValue from '../components/product/KeyValue';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'ProductDetails'>;

type Product = {
  id: number; title: string; description: string; price: number; rating?: number; brand?: string;
  images?: string[]; thumbnail?: string; dimensions?: { width?: number; height?: number; depth?: number };
  warrantyInformation?: string; shippingInformation?: string;
  reviews?: { reviewerName: string; rating: number; comment: string }[];
};

const ROSE = '#b94f58';

export default function ProductDetails({ route, navigation }: Props) {
  const { id } = route.params;
  const [data, setData] = useState<Product | null>(null);

  useEffect(() => { (async () => { const { data } = await axios.get(`https://dummyjson.com/products/${id}`); setData(data); })(); }, [id]);

  if (!data) return <ActivityIndicator style={{ marginTop: 40 }} />;

  const img = data.images?.[0] || data.thumbnail;
  const rating = data.rating ?? 0;
  const width  = data.dimensions?.width ?? 15.14;
  const height = data.dimensions?.height ?? 13.08;
  const warranty = data.warrantyInformation ?? '1 week';
  const shipping = data.shippingInformation ?? 'In 3–5 business days';

  return (
    <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }} style={{ backgroundColor: '#fdeae6' }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={s.back}><Text style={{ fontSize: 18 }}>‹</Text></TouchableOpacity>

      <View style={s.hero}>
        {!!img && <Image source={{ uri: img }} style={s.heroImg} />}
        <TouchableOpacity style={s.heart}><Text>♡</Text></TouchableOpacity>
      </View>

      <View style={{ marginTop: 10, gap: 8 }}>
        <View style={s.badge}><Text style={s.badgeText}>View Similar</Text></View>
        <Text style={s.title}>{data.title}</Text>
        <Text style={s.desc} numberOfLines={3}>{data.description}</Text>
      </View>

      <View style={s.ratingRow}>
        <Stars value={rating} />
        <Text style={s.ratingText}>{rating.toFixed(2)}/5</Text>
      </View>

      <Text style={s.soldBy}>Sold by : <Text style={{ fontWeight: '700' }}>{data.brand ?? 'Essence'}</Text></Text>

      <View style={s.priceRow}>
        <View>
          <Text style={s.price}>${data.price.toFixed(2)}</Text>
          <Text style={s.strike}>$10.48</Text>
        </View>
        <TouchableOpacity style={s.cta}><Text style={s.ctaText}>Add to Bag</Text></TouchableOpacity>
      </View>

      <Text style={s.sectionH}>Highlights</Text>
      <View style={s.grid}>
        <KeyValue k="Width" v={String(width)} />
        <KeyValue k="Height" v={String(height)} />
        <KeyValue k="Warranty" v={warranty} />
        <KeyValue k="Shipping" v={shipping} />
      </View>

      <Text style={s.sectionH}>Ratings & Reviews</Text>
      <View style={s.card}>
        {(data.reviews ?? []).slice(0, 3).map((r, i) => (
          <View key={i} style={s.reviewRow}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '700' }}>{r.reviewerName}</Text>
              <Text style={{ color: '#6b7280' }}>{r.comment}</Text>
            </View>
            <Stars value={r.rating} />
          </View>
        ))}
        {(!data.reviews || data.reviews.length === 0) && <Text style={{ color: '#6b7280' }}>No reviews yet.</Text>}
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  back: { alignSelf: 'flex-start', paddingVertical: 4, paddingHorizontal: 6, marginBottom: 6 },
  hero: { backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', position: 'relative' },
  heroImg: { width: '100%', height: 240, resizeMode: 'cover' },
  heart: { position: 'absolute', right: 10, top: 10, width: 34, height: 34, borderRadius: 17, backgroundColor: '#fff', alignItems:'center', justifyContent:'center', borderWidth:1, borderColor:'#eee' },
  badge: { alignSelf: 'flex-start', backgroundColor: '#fff', borderWidth: 1, borderColor: '#eee', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 },
  badgeText: { fontSize: 12, color: '#111827' },
  title: { fontSize: 18, fontWeight: '800', color: '#111827' },
  desc: { color: '#6b7280' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  ratingText: { fontWeight: '700' },
  soldBy: { marginTop: 6, color: '#6b7280' },
  priceRow: { marginTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  price: { fontSize: 24, fontWeight: '800' },
  strike: { textDecorationLine: 'line-through', color: '#9ca3af' },
  cta: { backgroundColor: ROSE, paddingVertical: 12, paddingHorizontal: 18, borderRadius: 12 },
  ctaText: { color: '#fff', fontWeight: '700' },
  sectionH: { marginTop: 16, marginBottom: 8, fontWeight: '800', fontSize: 16, color: '#111827' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', borderTopWidth: 1, borderTopColor: '#eee', borderLeftWidth: 1, borderLeftColor: '#eee', borderRadius: 12, overflow: 'hidden' },
  card: { backgroundColor:'#fff', borderRadius:12, borderWidth:1, borderColor:'#eee', padding:12 },
  reviewRow: { flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingVertical:8, borderBottomWidth:1, borderBottomColor:'#f2f2f2' },
});