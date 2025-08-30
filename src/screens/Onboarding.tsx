import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

/** ------- Figma specs (base width 430) ------- */
const FIGMA_W = 430;
const FIGMA_HERO_H = 695;   // image + panel block with rounded bottom
const FIGMA_PANEL_H = 329;  // the brown panel height
const FIGMA_RADIUS  = 42;   // bottom radius on the hero block

/** Colors */
const PANEL = '#C9A7A2';
const ROSE  = '#B84953';

/**
 * How much lower to move the whole hero (in *device* dp, not Figma px).
 * Increase this if you still want it lower.
 */
const EXTRA_PUSH_DP = 56;

export default function Onboarding({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { width } = Dimensions.get('window');
  const scale = width / FIGMA_W;

  // scaled dimensions from Figma
  const HERO_H  = Math.round(FIGMA_HERO_H * scale);
  const PANEL_H = Math.round(FIGMA_PANEL_H * scale);
  const RADIUS  = Math.round(FIGMA_RADIUS  * scale);

  // push the hero below the notch + a manual extra push
  const marginTop = insets.top + EXTRA_PUSH_DP;

  // Title typography from the spec (Italiana 60)
  const titleSize   = 60 * scale;
  const titleLetter = -0.32 * scale;

  return (
    <View style={[styles.screen, { backgroundColor: PANEL }]}>
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />

      {/* HERO (top image + bottom panel) */}
      <View
        style={[
          styles.hero,
          {
            height: HERO_H,
            borderBottomLeftRadius: RADIUS,
            borderBottomRightRadius: RADIUS,
            marginTop,
          },
        ]}
      >
        {/* Top image: exact height = hero - panel */}
        <ImageBackground
          source={require('../assets/onboarding.png')}
          style={{ width: '100%', height: HERO_H - PANEL_H }}
          resizeMode="cover"
        />

        {/* Bottom panel */}
        <View style={[styles.panel, { height: PANEL_H }]}>
          <Text
            style={[
              styles.title,
              {
                fontSize: titleSize,
                letterSpacing: titleLetter,
              },
            ]}
          >
            Viorra
          </Text>

          <Text
            style={[
              styles.sub,
              {
                fontSize: 24 * scale,            // Inter 24 in mock
                letterSpacing: -0.32 * scale,
                marginTop: 6 * scale,
                marginBottom: 18 * scale,
              },
            ]}
          >
            Your Beauty, Delivered.
          </Text>

          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              styles.cta,
              {
                paddingVertical: 16 * scale,
                paddingHorizontal: 32 * scale,
                borderRadius: 16 * scale,
                shadowRadius: 10 * scale,
                shadowOffset: { width: 0, height: 6 * scale },
              },
            ]}
            onPress={() => navigation.replace('Login')}
          >
            <Text style={[styles.ctaText, { fontSize: 16 * scale }]}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* progress pill anchored above the home indicator */}
      <View
        style={[
          styles.pill,
          {
            width: 172 * scale,
            height: 11 * scale,
            borderRadius: 24 * scale,
            bottom: Math.max(insets.bottom, 20 * scale),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },

  hero: {
    width: '100%',
    backgroundColor: PANEL,
    overflow: 'hidden', // needed for bottom radii
  },

  panel: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: PANEL,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  // Italiana Regular — add the font to match exactly
  title: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: Platform.select({
      ios: 'Italiana-Regular',
      android: 'Italiana-Regular',
      default: 'Italiana-Regular',
    }),
    fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
  },

  sub: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: Platform.select({
      ios: 'Inter-Light',
      android: 'Inter-Light',
      default: undefined,
    }),
    fontWeight: '300',
    opacity: 0.95,
  },

  cta: {
    backgroundColor: ROSE,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    elevation: 4,
  },
  ctaText: {
    color: '#fff',
    fontWeight: '700',
  },

  pill: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    opacity: 0.95,
  },
});