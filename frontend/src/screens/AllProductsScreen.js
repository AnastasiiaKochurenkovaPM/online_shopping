import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    Pressable,
    SafeAreaView,
    Button,
    Alert,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import { useNavigation, useIsFocused } from "@react-navigation/native";
  
  const ProductsScreen = () => {
    const [products, setProducts] = useState([]);
    const navigation = useNavigation();
    const isFocused = useIsFocused(); 
  
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://10.0.2.2:5000/api/products/");
        setProducts(response.data);
      } catch (error) {
        console.log("Error fetching products:", error.message);
      }
    };
  
    useEffect(() => {
      fetchProducts();
    }, [isFocused]);
  
    const handleDelete = async (productId) => {
      Alert.alert(
        "Підтвердження",
        "Ви впевнені, що хочете видалити цей товар?",
        [
          { text: "Скасувати", style: "cancel" },
          {
            text: "Видалити",
            style: "destructive",
            onPress: async () => {
              try {
                await axios.delete(`http://10.0.2.2:5000/api/products/${productId}`);
                fetchProducts();
              } catch (error) {
                console.log("Помилка при видаленні:", error.message);
              }
            },
          },
        ]
      );
    };
  
    const handleEdit = (productId) => {
      navigation.navigate("EditProduct", { productId });
    };
  
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <ScrollView contentContainerStyle={styles.container}>
          {products.map((item) => (
            <View key={item._id} style={styles.card}>
              <Image
                source={{ uri: item.image }}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>{item.price} грн</Text>
                <View style={styles.buttonRow}>
                  <Pressable style={styles.editButton} onPress={() => handleEdit(item._id)}>
                    <Text style={styles.buttonText}>Редагувати</Text>
                  </Pressable>
                  <Pressable style={styles.deleteButton} onPress={() => handleDelete(item._id)}>
                    <Text style={styles.buttonText}>Видалити</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default ProductsScreen;
  
  const styles = StyleSheet.create({
    container: {
      padding: 10,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    card: {
      width: "48%",
      backgroundColor: "#f8f8f8",
      borderRadius: 10,
      marginBottom: 15,
      overflow: "hidden",
      elevation: 3,
    },
    image: {
      width: "100%",
      height: 150,
    },
    info: {
      padding: 10,
    },
    title: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 5,
    },
    price: {
      fontSize: 14,
      color: "#0f5813",
      fontWeight: "bold",
      marginBottom: 8,
    },
    editButton: {
      backgroundColor: "#4CAF50",
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 5,
      marginRight: 5,
      color: "#fff",
      fontSize: 1,
      fontWeight: "500",
    },
    
    deleteButton: {
      backgroundColor: "#f44336",
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 5,
    },

    buttonText: {
      color: "#fff",
      fontSize: 12,
      fontWeight: "500",
    },
    
    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 5,
    },
  });
  