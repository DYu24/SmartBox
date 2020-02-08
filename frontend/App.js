import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import LoginPage from './pages/LoginPage';

export default function App() {
  return (
      <LoginPage/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
