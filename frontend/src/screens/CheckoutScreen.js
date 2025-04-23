import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Button, Alert, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const CheckoutScreen = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userId = useSelector((state) => state.user?.user?._id);
  const totalPrice = cartItems.reduce((sum, item) => sum + Number(item.price), 0);

  // Стан для адреси
  const [address, setAddress] = useState({
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleConfirmOrder = async () => {
    if (!userId) {
      Alert.alert("Помилка", "Користувача не знайдено");
      return;
    }

    if (!address.street || !address.city || !address.postalCode || !address.country) {
      Alert.alert("Помилка", "Будь ласка, заповніть адресу");
      return;
    }

    try {
      const orderData = {
        userId: userId,
        products: cartItems.map((item) => ({
          productId: item.id, // Використовуємо item.id, як у вашій моделі
          quantity: item.quantity || 1, // Використовуємо значення кількості або 1 за замовчуванням
        })),
        amount: totalPrice,
        address: address, // Включаємо адресу в дані замовлення
      };

      const res = await axios.post("http://10.0.2.2:5000/api/orders/create", orderData);

      Alert.alert("Замовлення підтверджено", "Дякуємо за покупку!");

      cartItems.forEach((item) => {
        dispatch(removeFromCart(item.id));
      });

      navigation.navigate("Home");

    } catch (error) {
      console.error("Помилка при створенні замовлення:", error.message);
      Alert.alert("Помилка", "Не вдалося створити замовлення");
    }
  };

  if (cartItems.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.empty}>Ваш кошик порожній</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.title}</Text>
            <Text>{item.price} грн</Text>
          </View>
        )}
      />
      
      {/* Поля для введення адреси */}
      <View style={styles.addressContainer}>
        <TextInput
          style={styles.input}
          placeholder="Вулиця"
          value={address.street}
          onChangeText={(text) => setAddress({ ...address, street: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Місто"
          value={address.city}
          onChangeText={(text) => setAddress({ ...address, city: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Поштовий індекс"
          value={address.postalCode}
          onChangeText={(text) => setAddress({ ...address, postalCode: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Країна"
          value={address.country}
          onChangeText={(text) => setAddress({ ...address, country: text })}
        />
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Загальна сума: {totalPrice} грн</Text>
        <Button title="Підтвердити замовлення" onPress={handleConfirmOrder} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 5,
  },
  totalContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  empty: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 30,
  },
  addressContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default CheckoutScreen;
