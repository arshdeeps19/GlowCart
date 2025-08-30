import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HeaderBar() {
  return (
    <View style={s.wrap}>
      <Text style={s.brand}>Viorra</Text>

      <View style={s.right}>
        {/* Notification bell */}
        <TouchableOpacity style={s.iconBtn} onPress={() => {}}>
          <Text style={s.iconTxt}>🔔</Text>
        </TouchableOpacity>
        {/* Bag */}
        <TouchableOpacity style={s.iconBtn} onPress={() => {}}>
          <Text style={s.iconTxt}>🛍️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  brand: { fontSize: 22, fontWeight: '600', color: '#b94f58' },
  right: { flexDirection: 'row', gap: 10 },
  iconBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#fff', borderWidth: 1, borderColor: '#eee',
    alignItems: 'center', justifyContent: 'center'
  },
  iconTxt: { fontSize: 16 },
});
