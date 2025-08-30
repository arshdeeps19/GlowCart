import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import IconInput from '../components/inputs/IconInput';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;
const ROSE = '#b94f58';
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export default function Register({ navigation }: Props) {
  const [name, setName] = useState(''); const [email, setEmail] = useState('');
  const [pw, setPw] = useState(''); const [confirm, setConfirm] = useState('');

  const canSubmit = useMemo(
    () => name.trim().length > 1 && emailRegex.test(email) && pw.length >= 6 && pw === confirm,
    [name, email, pw, confirm]
  );

  const onSubmit = () => { if (!canSubmit) return; navigation.replace('MainTabs'); };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fdeae6' }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={s.hero}><Text style={s.heroTitle}>Join The Glow!</Text></View>
        <View style={{ marginTop: 16 }}>
          <IconInput placeholder="Full Name" value={name} onChangeText={setName} icon="👤" />
          <IconInput placeholder="Email Address" value={email} onChangeText={setEmail} icon="✉️" keyboardType="email-address" />
          <IconInput placeholder="Password" value={pw} onChangeText={setPw} icon="🔒" secureTextEntry />
          <IconInput placeholder="Confirm Password" value={confirm} onChangeText={setConfirm} icon="🔒" secureTextEntry />
          <TouchableOpacity style={[s.cta, !canSubmit && { opacity: 0.5 }]} onPress={onSubmit} activeOpacity={canSubmit ? 0.9 : 1} disabled={!canSubmit}>
            <Text style={s.ctaText}>Create Account</Text>
          </TouchableOpacity>
          <Text style={s.footerText}>
            Already a Member? <Text style={s.link} onPress={() => navigation.navigate('Login')}>Log In</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  hero: { backgroundColor: ROSE, paddingVertical: 26, paddingHorizontal: 20, borderRadius: 24 },
  heroTitle: { color: '#fff', fontSize: 24, fontWeight: '800', textAlign: 'center' },
  cta: { backgroundColor: ROSE, paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 18, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
  ctaText: { color: '#fff', fontWeight: '700' },
  footerText: { marginTop: 16, textAlign: 'center', color: '#6b7280' },
  link: { color: ROSE, fontWeight: '700' },
});