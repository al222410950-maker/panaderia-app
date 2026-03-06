import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona tu modo</Text>

      <TouchableOpacity 
        style={styles.btn} 
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.btnText}>Cliente</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.btn, { backgroundColor: '#6b3e26' }]} 
        onPress={() => navigation.navigate('Admin')}
      >
        <Text style={[styles.btnText, { color: '#fff' }]}>Administrador</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff7f2'
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 40,
    color: '#6b3e26'
  },
  btn: {
    backgroundColor: '#e6a96d',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 20,
    width: '70%',
    alignItems: 'center'
  },
  btnText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2e1a10'
  }
});
