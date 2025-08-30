import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView } from 'react-native';
import IconInput from '../components/inputs/IconInput';
import SocialPill from '../layout/SocialPill.tsx';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;
const ROSE = '#b94f58';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export default function Login({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [touched, setTouched] = useState<{ email?: boolean; pw?: boolean }>({});

  const emailError = touched.email && !emailRegex.test(email) ? 'Enter a valid email' : '';
  const pwError = touched.pw && pw.length < 6 ? 'Min 6 characters' : '';
  const canSubmit = useMemo(() => emailRegex.test(email) && pw.length >= 6, [email, pw]);

  const onSubmit = () => {
    if (!canSubmit) {
      setTouched({ email: true, pw: true });
      return;
    }
    navigation.replace('MainTabs');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fdeae6' }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.select({ ios: 'padding', android: undefined })}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={s.hero}>
            <Text style={s.heroTitle}>Hello Again!</Text>
            <Text style={s.heroSub}>Welcome back you’ve been missed.</Text>
          </View>

          <View style={s.card}>
            <IconInput
              placeholder="Enter your email id"
              icon="✉️"
              value={email}
              onChangeText={setEmail}
              onBlur={() => setTouched(t => ({ ...t, email: true }))}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {!!emailError && <Text style={s.error}>{emailError}</Text>}

            <IconInput
              placeholder="Password"
              icon={showPw ? '' : '👁️'}
              secureTextEntry={!showPw}
              value={pw}
              onChangeText={setPw}
              onBlur={() => setTouched(t => ({ ...t, pw: true }))}
              onTouchEnd={() => setShowPw(p => !p)} 
            />
            {!!pwError && <Text style={s.error}>{pwError}</Text>}

            <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: 6 }}>
              <Text style={s.linkMuted}>Forgot password</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[s.cta, !canSubmit && s.ctaDisabled]}
              activeOpacity={canSubmit ? 0.9 : 1}
              onPress={onSubmit}
              disabled={!canSubmit}
            >
              <Text style={s.ctaText}>Log In</Text>
            </TouchableOpacity>

            <View style={s.dividerRow}>
              <View style={s.rule} />
              <Text style={s.dividerText}>Or Continue With</Text>
              <View style={s.rule} />
            </View>

            <View style={s.socialRow}>
              <SocialPill label="G" />
              <SocialPill label="" />
              <SocialPill label="f" />
            </View>

            <Text style={s.footerText}>
              Not a Member?{' '}
              <Text style={s.link} onPress={() => navigation.navigate('Register')}>
                Register Now
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  hero: { backgroundColor: ROSE, paddingTop: 28, paddingBottom: 40, paddingHorizontal: 20, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  heroTitle: { color: '#fff', fontSize: 28, fontWeight: '800', textAlign: 'center', marginBottom: 6 },
  heroSub: { color: '#fdeae6', textAlign: 'center' },
  card: { marginTop: 14, marginHorizontal: 16, padding: 16, backgroundColor: '#fdeae6' },
  error: { color: '#ef4444', fontSize: 12, marginTop: 4, marginLeft: 4 },
  linkMuted: { color: '#6b7280', textDecorationLine: 'underline' },
  cta: { backgroundColor: ROSE, paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 18, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
  ctaDisabled: { opacity: 0.5 },
  ctaText: { color: '#fff', fontWeight: '700' },
  dividerRow: { marginTop: 18, flexDirection: 'row', alignItems: 'center', gap: 8 },
  rule: { flex: 1, height: 1, backgroundColor: '#d1d5db' },
  dividerText: { color: '#6b7280', fontSize: 12 },
  socialRow: { flexDirection: 'row', gap: 12, justifyContent: 'center', marginTop: 12 },
  footerText: { marginTop: 16, textAlign: 'center', color: '#6b7280' },
  link: { color: ROSE, fontWeight: '700' },
});
