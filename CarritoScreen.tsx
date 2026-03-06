import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons"; // ← ICONO
import { useCart } from "./CartContext";

const CarritoScreen = ({ navigation, route }: any) => {
  const { carrito, increaseQty, decreaseQty, removeFromCart } = useCart();
  const usuario = route?.params?.usuario ?? 'Cliente';

  const total = carrito.reduce((sum, item) => sum + item.precio * item.qty, 0);

  return (
    <View style={styles.container}>

      {/* 🔙 BOTÓN DE REGRESAR */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate("Productos", { usuario })}>
        <Feather name="arrow-left" size={28} color="#333" />
      </TouchableOpacity>

      <Text style={styles.titulo}>Carrito</Text>

      <ScrollView>
        {carrito.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={item.imagen} style={styles.img} />

            <View style={styles.info}>
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text style={styles.precio}>${item.precio}</Text>

              <View style={styles.row}>
                <TouchableOpacity onPress={() => decreaseQty(item.id)} style={styles.cantBtn}>
                  <Text style={styles.cantTxt}>-</Text>
                </TouchableOpacity>

                <Text style={styles.qty}>{item.qty}</Text>

                <TouchableOpacity onPress={() => increaseQty(item.id)} style={styles.cantBtn}>
                  <Text style={styles.cantTxt}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity onPress={() => removeFromCart(item.id)}>
              <Text style={styles.x}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.total}>Total: ${total}</Text>

      <TouchableOpacity
        style={styles.pagarBtn}
        onPress={() => {
          if (carrito.length === 0) return alert("El carrito está vacío");
          navigation.navigate("Ticket", { carrito, usuario, total });
        }}
      >
        <Text style={styles.pagarTxt}>Generar pedido</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CarritoScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },

  backBtn: {
    position: "absolute",
    top: 20,
    left: 10,
    padding: 10,
    zIndex: 10,
  },

  titulo: { 
    fontSize: 30, 
    fontWeight: "bold", 
    marginBottom: 15, 
    marginTop: 40, 
    textAlign: "center" 
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  img: { width: 70, height: 70, borderRadius: 10 },
  info: { flex: 1, marginLeft: 10 },
  nombre: { fontSize: 18, fontWeight: "bold" },
  precio: { fontSize: 16, marginBottom: 5 },
  row: { flexDirection: "row", alignItems: "center" },
  cantBtn: {
    backgroundColor: "#ddd",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  cantTxt: { fontSize: 18, fontWeight: "bold" },
  qty: { marginHorizontal: 10, fontSize: 18, fontWeight: "bold" },
  x: { fontSize: 25, color: "red", marginLeft: 10 },
  total: { fontSize: 26, fontWeight: "bold", marginVertical: 10, textAlign: "right" },
  pagarBtn: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  pagarTxt: { color: "#fff", fontSize: 20, fontWeight: "bold" },
});


