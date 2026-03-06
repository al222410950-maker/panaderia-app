import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from './CartContext';

const productos = [
  { id: 'p1', nombre: 'Pan Blanco', precio: 3, imagen: require('./assets/pan1.jpg') },
  { id: 'p2', nombre: 'Rol de canela', precio: 12, imagen: require('./assets/pan2.jpg') },
  { id: 'p3', nombre: 'Mantecadita', precio: 9, imagen: require('./assets/pan3.jpg') },
  { id: 'p4', nombre: 'Concha', precio: 9, imagen: require('./assets/pan4.jpg') },
  { id: 'p5', nombre: 'Baguette', precio: 16, imagen: require('./assets/pan5.jpg') },
  { id: 'p6', nombre: 'Cuernitos', precio: 9, imagen: require('./assets/pan6.jpg') },
  { id: 'p7', nombre: 'Taco de piña', precio: 10, imagen: require('./assets/pan7.jpg') },
  { id: 'p8', nombre: 'Orejas', precio: 9, imagen: require('./assets/pan8.jpg') },
  { id: 'p9', nombre: 'Abanicos', precio: 9, imagen: require('./assets/pan9.jpg') },
  { id: 'p10', nombre: 'Bigote de higo', precio: 15, imagen: require('./assets/pan10.jpeg') },
  { id: 'p11', nombre: 'Hilo', precio: 9, imagen: require('./assets/pan11.jpg') },
  { id: 'p12', nombre: 'Bisquet', precio: 9, imagen: require('./assets/pan12.jpg') },
  { id: 'p13', nombre: 'Rebanada de pastel', precio: 35, imagen: require('./assets/pan13.jpg') },
  { id: 'p14', nombre: 'Dona', precio: 10, imagen: require('./assets/pan14.jpg') },
  { id: 'p15', nombre: 'Ppan de muerto', precio: 12, imagen: require('./assets/pan15.jpg') },
];

export default function ProductosScreen({ navigation, route }: any) {
  const usuario = route?.params?.usuario ?? 'Cliente';
  const { carrito, addToCart } = useCart();

  return (
    <View style={styles.screen}>
      <View style={styles.topRow}>
        <Text style={styles.greeting}>
          Hola, <Text style={{ fontWeight: '800' }}>{usuario}</Text>
        </Text>

        <TouchableOpacity style={styles.cartBtn} onPress={() => navigation.navigate('Carrito', { usuario })}>
          <Ionicons name="cart-outline" size={26} color="#6b3e26" />

          {carrito.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {carrito.reduce((s, i) => s + i.qty, 0)}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Nuestros productos</Text>

      <FlatList
        data={productos}
        numColumns={3} 
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.imagen} style={styles.img} />
            <Text style={styles.name}>{item.nombre}</Text>
            <Text style={styles.price}>${item.precio}</Text>

            <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(item)}>
              <Text style={styles.addText}>Añadir</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff7f2', paddingTop: 40 },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18
  },

  greeting: { fontSize: 16, color: '#8a6f5a' },

  cartBtn: { padding: 8, position: 'relative' },

  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#ff8a4b',
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center'
  },

  badgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },

  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#6b3e26',
    marginTop: 12,
    marginBottom: 10,
    textAlign: 'center'
  },

  card: {
    backgroundColor: '#fff',
    width: '30%',        
    margin: '1.66%',       
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3
  },


  img: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 8
  },

  name: { fontWeight: '700', color: '#5a3a27', textAlign: 'center', fontSize: 13 },

  price: { color: '#7b5a46', marginVertical: 4, fontSize: 12 },

  addBtn: {
    backgroundColor: '#e6a96d',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginTop: 4
  },

  addText: { color: '#2e1a10', fontWeight: '800', fontSize: 12 }
});


