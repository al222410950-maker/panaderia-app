import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import ProductosScreen from './ProductosScreen';
import CarritoScreen from './CarritoScreen';
import TicketScreen from './TicketScreen';
import Pagar from './Pagar';
import AdminScreen from './AdminScreen';

import { CartProvider } from './CartContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>

          <Stack.Screen name="Home" component={HomeScreen} />

          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Productos" component={ProductosScreen} />
          <Stack.Screen name="Carrito" component={CarritoScreen} />
          <Stack.Screen name="Ticket" component={TicketScreen} />
          <Stack.Screen name="Pagar" component={Pagar} />

          <Stack.Screen name="Admin" component={AdminScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}


