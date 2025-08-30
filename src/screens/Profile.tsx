import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	ScrollView,
	SafeAreaView,
} from 'react-native';
import { StackActions } from '@react-navigation/native';
import { rootNavRef } from '../../App'; // ← adjust path if needed

const ROSE = '#b94f58';
const BG = '#fdeae6';
const CARD = '#fff';

export default function Profile() {
	const onLogout = () => {
		// TODO: clear any auth/AsyncStorage here if you use it
		if (rootNavRef.isReady()) {
			// Replace current route at the ROOT stack with Login (no back into tabs)
			rootNavRef.dispatch(StackActions.replace('Login'));
		} else {
			console.warn('Navigation not ready');
		}
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
			<ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
				<Text style={s.header}>Profile</Text>

				{/* User card */}
				<View style={s.userCard}>
					<Image
						source={{
							uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=256',
						}}
						style={s.avatar}
					/>
					<View style={{ flex: 1 }}>
						<Text style={s.name}>Olivia</Text>
						<Text style={s.email}>olivia@gmail.com</Text>
					</View>
					<TouchableOpacity style={s.editBtn}>
						<Text style={s.editIcon}>✎</Text>
					</TouchableOpacity>
				</View>

				{/* Preferences / Addresses */}
				<Card>
					<Row label="Address" sub="Manage your saved address" />
					<Row label="Order History" sub="View your past orders" />
					<Row label="Language" />
					<Row label="Notifications" />
				</Card>

				{/* Help / Policies */}
				<Card>
					<Row label="Contact Us" />
					<Row label="Get Help" />
					<Row label="Privacy Policy" />
					<Row label="Terms and Conditions" />
				</Card>

				{/* Logout */}
				<View style={[s.card, { paddingVertical: 12 }]}>
					<TouchableOpacity onPress={onLogout}>
						<Text style={s.logout}>↪  Log Out</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

/* ---------- Reusable bits ---------- */
function Card({ children }: { children: React.ReactNode }) {
	return <View style={s.card}>{children}</View>;
}

function Row({ label, sub }: { label: string; sub?: string }) {
	return (
		<TouchableOpacity activeOpacity={0.8} style={s.row}>
			<View style={{ flex: 1 }}>
				<Text style={s.rowLabel}>{label}</Text>
				{sub ? <Text style={s.rowSub}>{sub}</Text> : null}
			</View>
			<Text style={s.chevron}>›</Text>
		</TouchableOpacity>
	);
}

/* ---------- Styles ---------- */
const s = StyleSheet.create({
	header: { fontSize: 22, fontWeight: '800', marginBottom: 12, color: '#111827' },

	userCard: {
		backgroundColor: CARD,
		borderRadius: 16,
		padding: 12,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
		borderWidth: 1,
		borderColor: '#f0f0f0',
		marginBottom: 12,
	},
	avatar: { width: 56, height: 56, borderRadius: 28 },
	name: { fontSize: 16, fontWeight: '800', color: '#111827' },
	email: { color: '#6b7280', marginTop: 2 },
	editBtn: {
		width: 36,
		height: 36,
		borderRadius: 10,
		backgroundColor: BG,
		alignItems: 'center',
		justifyContent: 'center',
	},
	editIcon: { color: ROSE, fontWeight: '700' },

	card: {
		backgroundColor: CARD,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: '#f0f0f0',
		overflow: 'hidden',
		marginTop: 12,
	},
	row: {
		paddingHorizontal: 16,
		paddingVertical: 14,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#f2f2f2',
	},
	rowLabel: { fontWeight: '700', color: '#111827' },
	rowSub: { color: '#6b7280', marginTop: 2, fontSize: 12 },
	chevron: { fontSize: 22, color: '#9ca3af', marginLeft: 10 },

	logout: { color: '#ef4444', fontWeight: '700', textAlign: 'left', paddingHorizontal: 4 },
});