import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Екрани
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import CardScreen from '../screens/CardScreen';
import CartScreen from '../screens/CartScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CreateScreen from '../screens/CreateScreen';
import AllProductsScreen from '../screens/AllProductsScreen';
import EditProductScreen from '../screens/EditProductScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrdersScreen from '../screens/OrdersScreen';

// Компоненти для вкладок
function TabHomeScreen() {
  return <HomeScreen />;
}

function TabCatalogScreen() {
  return <ProductsScreen />;
}

function TabAllProductsScreen() {
  return <AllProductsScreen />;
}

function TabCartScreen() {
  return <CartScreen />;
}

function TabProfileScreen() {
  return <ProfileScreen />;
}

function TabCreateScreen() {
  return <CreateScreen />;
}

function TabCardScreen({ route }) {
  return <CardScreen route={route} />;
}

function TabEditProductScreen({ route }) {
  return <EditProductScreen route={route} />;
}

function TabCheckoutScreen({ route }) {
  return <CheckoutScreen route={route} />;
}

function TabOrdersScreen({ route }) {
  return <OrdersScreen route={route} />;
}


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Функція для вкладок
function TabNavigator({ route }) {
  const initialRoute = route?.params?.screen || 'Головна';

  return (
    <Tab.Navigator
      initialRouteName={initialRoute}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Головна') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Каталог') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Кошик') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Профіль') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Головна" component={TabHomeScreen} />
      <Tab.Screen name="Каталог" component={TabCatalogScreen} />
      <Tab.Screen name="Кошик" component={TabCartScreen} />
      <Tab.Screen name="Профіль" component={TabProfileScreen} />
    </Tab.Navigator>
  );
}

// Основний стековий навігатор
const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={TabNavigator} 
        /> 
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen name="Cart" component={TabCartScreen} />
        <Stack.Screen name="Card" component={TabCardScreen} />
        <Stack.Screen name="Products" component={TabCatalogScreen} /> 
        <Stack.Screen name="CreateProduct" component={TabCreateScreen} />
        <Stack.Screen name="AllProducts" component={TabAllProductsScreen} />
        <Stack.Screen name="EditProduct" component={TabEditProductScreen} />
        <Stack.Screen name="Checkout" component={TabCheckoutScreen} />
        <Stack.Screen name="Orders" component={TabOrdersScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
