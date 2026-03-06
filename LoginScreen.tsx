import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

export default function LoginScreen({ navigation }: any) {
  const [usuario, setUsuario] = useState('');

  const handleLogin = () => {
    if (usuario.trim() === '') return alert('Escribe tu nombre');
    navigation.replace('Productos', { usuario });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.wrap}>
      <View style={styles.container}>
        <Image source={require('./assets/logo.jpg')} style={styles.logo} />
        <Text style={styles.title}>Pan Panadero</Text>

        <Text style={styles.label}>Nombre del cliente</Text>
        <TextInput
          style={styles.input}
          value={usuario}
          onChangeText={setUsuario}
          
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar pedido</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#fff5ee' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  logo: { width: 140, height: 140, borderRadius: 16, marginBottom: 16 },
  title: { fontSize: 28, fontWeight: '800', color: '#6b3e26', marginBottom: 8 },
  label: { alignSelf: 'flex-start', marginLeft: 10, marginTop: 10, color: '#8a6f5a' },
  input: {
    width: '100%', maxWidth: 360, backgroundColor: '#fff', padding: 12, borderRadius: 12, marginTop: 6, borderWidth: 1, borderColor: '#f0d8c0'
  },
  button: {
    marginTop: 18, backgroundColor: '#e6a96d', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 12, elevation: 2
  },
  buttonText: { color: '#2e1a10', fontWeight: '800' }
});
