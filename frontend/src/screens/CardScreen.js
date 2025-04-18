import { View, Text, Image, StyleSheet, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const CardScreen = ({ route }) => {
  const { productId } = route.params || {};
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://10.0.2.2:5000/api/products/${productId}`);
          setProduct(response.data);
        } catch (error) {
          console.log("Error fetching product:", error.message);
        }
      };

      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    Alert.alert("Успішно", "Товар додано у кошик");
  };

  if (!product) return <Text style={{ margin: 20 }}>Завантаження...</Text>;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>{product.price} грн</Text>
      <Text style={styles.description}>{product.desc}</Text>

      {product.size && <Text style={styles.info}>Розмір: {product.size}</Text>}
      {product.color && <Text style={styles.info}>Колір: {product.color}</Text>}
      {product.categories?.length > 0 && (
        <Text style={styles.info}>Категорії: {product.categories.join(', ')}</Text>
      )}

      <View style={styles.buttonContainer}>
        <Button title="Додати у кошик" onPress={handleAddToCart} />
      </View>
    </View>
  );
};

export default CardScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: "#0f5813",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#333",
    marginBottom: 12,
  },
  info: {
    fontSize: 16,
    color: "#555",
    marginBottom: 6,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
