import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, FlatList, Alert } from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";

const OrdersScreen = () => {
  const user = useSelector((state) => state.user.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Завантаження замовлень при завантаженні екрану
  useEffect(() => {
    if (!user || !user._id) {
      return;
    }
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:5000/api/orders/`
        );
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        Alert.alert("Помилка", "Не вдалося завантажити замовлення.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const renderOrder = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderText}>Замовлення №{item._id}</Text>
      <Text style={styles.orderText}>Статус: {item.status}</Text>
      <Text style={styles.orderText}>Дата: {new Date(item.createdAt).toLocaleDateString()}</Text>
      <Pressable style={styles.button} onPress={() => { /* тут можна реалізувати додаткові дії з замовленням */ }}>
        {/* <Text style={styles.buttonText}>Деталі</Text> */}
      </Pressable>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Завантаження замовлень...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Мої замовлення</Text>

      {orders.length === 0 ? (
        <Text style={styles.noOrdersText}>У вас немає замовлень.</Text>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrder}
          keyExtractor={(item) => item._id}
        />
      )}
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#0f5813",
  },
  orderItem: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  orderText: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#0f5813",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  noOrdersText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
});
