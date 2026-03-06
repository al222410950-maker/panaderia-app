import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCart } from './CartContext';

let MapView: any = null;
let Marker: any = null;

if (Platform.OS !== 'web') {
  const Maps = require('react-native-maps');
  MapView = Maps.default;
  Marker = Maps.Marker;
}

export default function Pagar({ route, navigation }: any) {
  const { carrito = [], usuario = 'Cliente', total = 0 } = route.params ?? {};
  const { clearCart } = useCart();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const guardarPedido = async () => {
    setLoading(true);
    try {
      const nuevo = {
        id: Date.now().toString() + Math.random().toString(36).slice(2),
        usuario,
        carrito,
        total,
        fecha: new Date().toISOString(),
      };

      const raw = await AsyncStorage.getItem('pedidos');
      const prev = raw ? JSON.parse(raw) : [];
      prev.push(nuevo);
      await AsyncStorage.setItem('pedidos', JSON.stringify(prev));

      clearCart();
      setSaved(true);
    } catch {
      alert('Error al guardar el pedido');
    }
    setLoading(false);
  };

  const sucursales = [
    { id: 1, nombre: "Sucursal Centro", lat: 19.2895, lon: -99.6532 },
    { id: 2, nombre: "Sucursal Norte", lat: 19.3003, lon: -99.6601 },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {saved ? 'Pago guardado' : loading ? 'Procesando pago...' : 'Confirmar tu pedido'}
      </Text>

      {!saved && !loading && (
        <>
          <Text style={styles.total}>Total a pagar: ${total.toFixed(2)}</Text>

          <TouchableOpacity style={styles.btn} onPress={guardarPedido}>
            <Text style={styles.btnText}>Confirmar pago</Text>
          </TouchableOpacity>
        </>
      )}

      {saved && (
        <>
          <Text style={styles.subtitle}>Sucursales cercanas:</Text>

          {Platform.OS !== 'web' ? (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: sucursales[0].lat,
                longitude: sucursales[0].lon,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              }}
            >
              {sucursales.map(s => (
                <Marker
                  key={s.id}
                  coordinate={{ latitude: s.lat, longitude: s.lon }}
                  title={s.nombre}
                />
              ))}
            </MapView>
          ) : (
            <View style={styles.webBox}>
              <Text style={{ color: '#6b3e26' }}>El mapa no está disponible en Web</Text>
            </View>
          )}

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: '#6b3e26' }]}
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
    })
  }
>
  <Text style={[styles.btnText, { color: '#fff' }]}>Salir</Text>
</TouchableOpacity>


        </>
      )}

      {!saved && loading && <Text style={styles.loading}>No cierres la app...</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 20, backgroundColor: '#fff7f2' },
  title: { fontSize: 22, fontWeight: '800', color: '#6b3e26', marginVertical: 12 },
  subtitle: { marginVertical: 10, color: '#8a6f5a', fontSize: 16, fontWeight: '600' },
  total: { marginVertical: 10, color: '#8a6f5a' },
  map: { width: 330, height: 300, borderRadius: 14, marginVertical: 10 },
  webBox: {
    width: 330,
    height: 300,
    borderRadius: 14,
    marginVertical: 10,
    backgroundColor: '#f0e4d8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d8c1a9'
  },
  btn: {
    marginTop: 16,
    backgroundColor: '#e6a96d',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12
  },
  btnText: { fontWeight: '800', color: '#2e1a10' },
  loading: { color: '#8a6f5a' }
});

