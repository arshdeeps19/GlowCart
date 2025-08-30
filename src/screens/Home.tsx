import React, { useEffect, useState, useMemo } from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	Image,
	TouchableOpacity,
	ActivityIndicator,
	TextInput,
	SafeAreaView,
} from 'react-native';
import axios from 'axios';

type Product = {
	id: number; title: string; price: number; description: string;
	images?: string[]; thumbnail?: string; category?: string; rating?: number;
};

export default function Home() {
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
		return items.filter(p =>
			p.title.toLowerCase().includes(term) || p.description.toLowerCase().includes(term)
		);
	}, [q, items]);

	const Header = (
		<>
			{/* Top brand row */}
			<View style={s.topBar}>
				<Text style={s.brand}>Viorra</Text>
				<View style={s.topIcons}>
					<TouchableOpacity style={s.iconBtn}><Text>♡</Text></TouchableOpacity>
					<TouchableOpacity style={s.iconBtn}><Text>🛍️</Text></TouchableOpacity>
				</View>
			</View>

			{/* Search + filter */}
			<View style={s.searchRow}>
				<View style={s.searchBox}>
					<Text style={{ marginLeft: 8 }}>🔍</Text>
					<TextInput
						placeholder="Search for all products"
						value={q}
						onChangeText={setQ}
						style={s.searchInput}
						placeholderTextColor="#9ca3af"
					/>
				</View>
				<TouchableOpacity style={s.filterBtn}>
					<Text style={{ fontWeight: '700' }}>☰</Text>
				</TouchableOpacity>
			</View>

			{/* Section header */}
			<View style={s.sectionHead}>
				<View>
					<Text style={s.sectionTitle}>Best Products</Text>
					<Text style={s.sectionSub}>{filtered.length} products</Text>
				</View>
				<TouchableOpacity style={s.applyFilter}>
					<Text style={s.applyFilterText}>Apply Filter</Text>
				</TouchableOpacity>
			</View>
		</>
	);

	if (loading) {
		return (
			<View style={[s.container, { justifyContent: 'center', alignItems: 'center' }]}>
				<ActivityIndicator />
			</View>
		);
	}

	return (
		<SafeAreaView style={s.container}>
			<FlatList
				ListHeaderComponent={Header}
				contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 90 }}
				columnWrapperStyle={{ gap: 12 }}
				numColumns={2}
				data={filtered}
				keyExtractor={(it) => String(it.id)}
				renderItem={({ item }) => <ProductCard item={item} />}
				ListEmptyComponent={
					<View style={{ padding: 24 }}>
						<Text>No cosmetic items found.</Text>
					</View>
				}
				showsVerticalScrollIndicator={false}
			/>

			{/* Faux bottom tabs (if you don’t wire real tabs yet) */}
			<View style={s.tabs}>
				<TabItem label="Home" active />
				<TabItem label="Offers" />
				<TabItem label="Wishlist" />
				<TabItem label="Profile" />
			</View>
		</SafeAreaView>
	);
}

function ProductCard({ item }: { item: Product }) {
	const img = item.images?.[0] || item.thumbnail;
	return (
		<TouchableOpacity style={s.card} activeOpacity={0.9}>
			<View style={s.cardImgWrap}>
				<Image source={{ uri: img }} style={s.img} />
				<TouchableOpacity style={s.heartBtn} onPress={() => {}}>
					<Text style={{ fontSize: 14 }}>♡</Text>
				</TouchableOpacity>
			</View>
			<View style={{ padding: 10 }}>
				<Text numberOfLines={1} style={s.cardTitle}>{item.title}</Text>
				<Text style={s.cardPrice}>${item.price}</Text>
			</View>
		</TouchableOpacity>
	);
}

function TabItem({ label, active = false }: { label: string; active?: boolean }) {
	return (
		<View style={s.tabItem}>
			<Text style={[s.tabText, active && s.tabTextActive]}>{label}</Text>
		</View>
	);
}

const s = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#fdeae6' }, // soft pink page bg
	topBar: {
		paddingHorizontal: 16, paddingTop: 8, paddingBottom: 10,
		flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
	},
	brand: { fontSize: 22, fontWeight: '800', color: '#b94f58' },
	topIcons: { flexDirection: 'row', gap: 12 },
	iconBtn: {
		width: 36, height: 36, borderRadius: 18, borderWidth: 1, borderColor: '#eee',
		alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff'
	},

	searchRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, marginBottom: 12 },
	searchBox: {
		flex: 1, flexDirection: 'row', alignItems: 'center',
		backgroundColor: '#fff', borderRadius: 20, borderWidth: 1, borderColor: '#eee',
		paddingVertical: 10, paddingRight: 12,
	},
	searchInput: { flex: 1, paddingHorizontal: 8, fontSize: 14 },
	filterBtn: {
		width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center',
		backgroundColor: '#fff', borderWidth: 1, borderColor: '#eee'
	},

	sectionHead: {
		paddingHorizontal: 16, paddingBottom: 8, flexDirection: 'row',
		alignItems: 'center', justifyContent: 'space-between'
	},
	sectionTitle: { fontSize: 18, fontWeight: '800', color: '#111827' },
	sectionSub: { color: '#6b7280', marginTop: 2 },
	applyFilter: {
		backgroundColor: '#fff', borderWidth: 1, borderColor: '#eee',
		paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10
	},
	applyFilterText: { fontWeight: '600', color: '#111827' },

	card: {
		flex: 1, backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden',
		borderWidth: 1, borderColor: '#eee',
	},
	cardImgWrap: { position: 'relative' },
	img: { width: '100%', height: 140, resizeMode: 'cover' },
	heartBtn: {
		position: 'absolute', right: 8, top: 8,
		width: 28, height: 28, borderRadius: 14, backgroundColor: '#fff',
		borderWidth: 1, borderColor: '#eee', alignItems: 'center', justifyContent: 'center'
	},
	cardTitle: { fontWeight: '600' },
	cardPrice: { marginTop: 4, fontWeight: '800' },

	tabs: {
		position: 'absolute', left: 0, right: 0, bottom: 0,
		height: 64, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee',
		flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'
	},
	tabItem: { alignItems: 'center', justifyContent: 'center' },
	tabText: { fontSize: 12, color: '#6b7280' },
	tabTextActive: { color: '#b94f58', fontWeight: '700' },
});