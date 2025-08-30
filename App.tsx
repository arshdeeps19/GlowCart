import React from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { RootStack } from './src/navigation';
import type { RootStackParamList } from './src/navigation/types';

export const rootNavRef = createNavigationContainerRef<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer ref={rootNavRef}>
      <RootStack />
    </NavigationContainer>
  );
}