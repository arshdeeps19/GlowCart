import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

import HeaderBar from '../layout/Headerbar.tsx';
import SearchBar from '../layout/Searchbar.tsx';
import SectionHeader from '../layout/SectionHeader.tsx';
import { ProductCard } from '../components/product/ProductCard.tsx';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'Products'>;

type Product = {
  id: number; title: string; price: number; description: string;
  images?: string[]; thumbnail?: string; category?: string;
};

export default function ProductsList({ navigation }: Props) {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Product[]>([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://dummyjson.com/products?limit=100');
        const products: Product[] = data.products ?? [];
        const cosmetics = products.filter(p => {
          const hay = `${p.title} ${p.description} ${p.category}`.toLowerCase();
          return /mascara|lip|gloss|blush|eyeliner|concealer|foundation|palette|fragrance|perfume|skin|cream|serum|beauty|cosmetic|skincare/.test(hay);
        });
        setItems(cosmetics);
      } finally {
        setLoading(false);
      }
    })();
  }, []);


  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return items;
    return items.filter(p => p.title.toLowerCase().includes(term) || p.description.toLowerCase().includes(term));
  }, [q, items]);

  if (loading) { return <SafeAreaView style={{ flex:1, backgroundColor:'#fdeae6' }}><ActivityIndicator style={{ marginTop: 40 }} /></SafeAreaView>; }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fdeae6' }}>
      <FlatList
        ListHeaderComponent={
          <>
            <HeaderBar />
            <SearchBar value={q} onChangeText={setQ} />
            <SectionHeader title="Best Products" countText={`${filtered.length} products`} />
          </>
        }
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        columnWrapperStyle={{ gap: 12 }}
        numColumns={2}
        data={filtered}
        keyExtractor={(it) => String(it.id)}
        renderItem={({ item }) => (
          <ProductCard
            item={{ id: item.id, title: item.title, price: item.price, images: item.images, thumbnail: item.thumbnail }}
            onPress={() => navigation.navigate('ProductDetails', { id: item.id })}
          />
        )}
      />
    </SafeAreaView>
  );
}