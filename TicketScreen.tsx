import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons'; // ← ICONOS

export default function TicketScreen({ route, navigation }: any) {
  const { carrito = [], usuario = 'Cliente', total = 0, isAdminView = false } = route.params ?? {};

  // Agrupar productos por nombre
  const agrupados: any = {};
  carrito.forEach((it: any) => {
    const cant = it.qty ?? it.cantidad ?? 1;
    if (!agrupados[it.nombre])
      agrupados[it.nombre] = { ...it, cantidad: cant };
    else
      agrupados[it.nombre].cantidad += cant;
  });

  const listaFinal = Object.values(agrupados);

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 40, backgroundColor: '#fff7f2' }}>
      
      {/* 🔙 BOTÓN DE REGRESAR */}
      {!isAdminView && (
        <TouchableOpacity 
          style={styles.backBtn} 
          onPress={() => navigation.navigate('Carrito', { usuario })}
        >
          <Feather name="arrow-left" size={28} color="#333" />
        </TouchableOpacity>
      )}

      <View style={styles.container}>
        
        <Image source={require('./assets/logo.jpg')} style={styles.logo} />
        <Text style={styles.user}>Cliente: {usuario}</Text>
        <Text style={styles.title}>{isAdminView ? 'Ticket Admin' : 'Ticket de compra'}</Text>

        <View style={[styles.box, isAdminView && { backgroundColor: '#f0f0f0' }]}>
          {listaFinal.map((it: any, i: number) => (
            <View style={styles.row} key={i}>
              <Text style={styles.item}>{it.nombre} x{it.cantidad}</Text>
              <Text style={styles.item}>${(it.precio * it.cantidad).toFixed(2)}</Text>
            </View>
          ))}

          <View style={styles.totalRow}>
            <Text style={styles.total}>TOTAL</Text>
            <Text style={styles.total}>${total.toFixed(2)}</Text>
          </View>
        </View>

        {/* 🛠️ BOTÓN PARA CORREGIR PEDIDO */}
        {!isAdminView && (
          <TouchableOpacity
            style={styles.fixBtn}
            onPress={() => navigation.navigate('Carrito', { usuario })}
          >
            <Text style={styles.fixText}>Corregir pedido</Text>
          </TouchableOpacity>
        )}

        {/* 💳 BOTÓN PAGAR */}
        {!isAdminView && (
          <TouchableOpacity
            style={styles.payBtn}
            onPress={() => navigation.navigate('Pagar', { carrito, usuario, total })}
          >
            <Text style={styles.payText}>Pagar</Text>
          </TouchableOpacity>
        )}

        {isAdminView && (
          <Text style={{ marginTop: 12, color: '#8a6f5a' }}>
            Vista administrativa, solo para revisión de pedidos
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    position: 'absolute',
    top: 25,
    left: 15,
    padding: 8,
    zIndex: 10,
  },

  container: { width: '100%', alignItems: 'center', paddingTop: 50 },
  logo: { width: 110, height: 110, borderRadius: 12, marginBottom: 8 },
  user: { color: '#8a6f5a', marginBottom: 6 },
  title: { fontSize: 22, fontWeight: '800', color: '#6b3e26', marginBottom: 12 },

  box: { 
    width: '90%', 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    padding: 14, 
    borderWidth: 1, 
    borderColor: '#f0d8c0' 
  },
  
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingVertical: 8, 
    borderBottomWidth: 1, 
    borderColor: '#faf0e6' 
  },
  
  item: { color: '#5a3a27' },

  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  total: { fontWeight: '800', fontSize: 18, color: '#6b3e26' },

  // 🛠️ BOTÓN CORREGIR
  fixBtn: {
    marginTop: 18,
    backgroundColor: '#d98c3b',
    paddingVertical: 12,
    paddingHorizontal: 36,
    borderRadius: 12,
  },
  fixText: { fontWeight: '800', color: '#fff' },

  // 💳 BOTÓN PAGAR
  payBtn: { 
    marginTop: 12, 
    backgroundColor: '#e6a96d', 
    paddingVertical: 12, 
    paddingHorizontal: 36, 
    borderRadius: 12 
  },
  payText: { fontWeight: '800', color: '#2e1a10' }
});


