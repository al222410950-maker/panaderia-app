import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Pedido = {
  id: string;
  usuario: string;
  carrito: { nombre: string; precio: number; qty: number }[];
  total: number;
  fecha: string;
};

export default function AdminScreen({ navigation }: any) {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [totalesPorDia, setTotalesPorDia] = useState<{ [key: string]: number }>({});
  const [detallesAbiertos, setDetallesAbiertos] = useState<{ [key: string]: boolean }>({}); // control de expansión

  const loadPedidos = async () => {
    try {
      const raw = await AsyncStorage.getItem('pedidos');
      const data: Pedido[] = raw ? JSON.parse(raw) : [];
      setPedidos(data);

      const totales: { [key: string]: number } = {};
      data.forEach(p => {
        const dia = new Date(p.fecha).toLocaleDateString();
        totales[dia] = (totales[dia] || 0) + p.total;
      });
      setTotalesPorDia(totales);

    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadPedidos();
  }, []);

  const toggleDetalle = (id: string) => {
    setDetallesAbiertos(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Panel de Administración</Text>

      {Object.keys(totalesPorDia).length === 0 ? (
        <Text style={{ marginVertical: 20, color: '#8a6f5a' }}>No hay pedidos aún</Text>
      ) : (
        Object.keys(totalesPorDia).map((dia, i) => (
          <View key={i} style={styles.diaContainer}>
            <Text style={styles.diaText}>{dia}</Text>
            <Text style={styles.totalDia}>Total: ${totalesPorDia[dia].toFixed(2)}</Text>

            {pedidos
              .filter(p => new Date(p.fecha).toLocaleDateString() === dia)
              .map(p => (
                <View key={p.id} style={styles.pedidoCard}>
                  <TouchableOpacity onPress={() => toggleDetalle(p.id)} style={{ flex: 1 }}>
                    <View style={styles.pedidoHeader}>
                      <Text style={styles.usuario}>{p.usuario}</Text>
                      <Text style={styles.totalPedido}>${p.total.toFixed(2)}</Text>
                    </View>

                    {detallesAbiertos[p.id] && (
                      <View style={styles.detalle}>
                        {p.carrito.map((item, idx) => (
                          <View key={idx} style={styles.detalleItem}>
                            <Text style={styles.itemNombre}>{item.nombre} x{item.qty}</Text>
                            <Text style={styles.itemPrecio}>${(item.precio * item.qty).toFixed(2)}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              ))
            }
          </View>
        ))
      )}

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: "#888" }]}
        onPress={() => navigation.navigate('Home')} 
>
  <Text style={styles.btnText}>Salir</Text>
</TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff7f2",
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#6b3e26",
    marginBottom: 20
  },
  diaContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f0d8c0'
  },
  diaText: { fontSize: 18, fontWeight: '700', color: '#5a3a27', marginBottom: 6 },
  totalDia: { fontSize: 16, fontWeight: '600', color: '#6b3e26', marginBottom: 8 },
  pedidoCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 6,
    padding: 8
  },
  pedidoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  usuario: { fontWeight: '600', color: '#5a3a27' },
  totalPedido: { fontWeight: '600', color: '#6b3e26' },
  detalle: {
    marginTop: 6,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: '#e6a96d'
  },
  detalleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2
  },
  itemNombre: { color: '#5a3a27' },
  itemPrecio: { color: '#6b3e26' },
  btn: {
    marginTop: 20,
    backgroundColor: '#e6a96d',
    paddingVertical: 14,
    paddingHorizontal: 24,
    width: '80%',
    borderRadius: 12,
    alignItems: 'center'
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18
  }
});

