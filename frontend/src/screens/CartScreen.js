import React from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/cartSlice"; 
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId)); 
  };

  const handleCheckout = () => {
    navigation.navigate('Checkout'); 
  };

  if (cartItems.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyCart}>Ваш кошик порожній</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text>{item.title}</Text>
            <Button
              title="Видалити"
              onPress={() => handleRemoveFromCart(item.id)}
            />
          </View>
        )}
      />
      <Button title="Оформити замовлення" onPress={handleCheckout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  emptyCart: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

export default CartScreen;
