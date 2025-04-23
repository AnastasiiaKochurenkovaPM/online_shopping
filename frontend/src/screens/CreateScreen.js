import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";


const CreateScreen = () => {
  const navigation = useNavigation();  
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleCreate = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("price", price);
      formData.append(
        "categories",
        JSON.stringify(categories.split(",").map((cat) => cat.trim()))
      );

      if (image) {
        const filename = image.split("/").pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;

        formData.append("image", {
          uri: image,
          name: filename,
          type,
        });
      }

      const res = await axios.post("http://10.0.2.2:5000/api/products/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Alert.alert("Успіх", "Товар створено!");

      navigation.navigate("AllProducts")

    } catch (error) {
      console.error(error.response?.data || error.message);
      Alert.alert("Помилка", "Не вдалося створити товар.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Створити товар</Text>

      <TextInput
        placeholder="Назва товару"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Опис"
        style={styles.input}
        value={desc}
        onChangeText={setDesc}
      />
      <TextInput
        placeholder="Ціна"
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

        <TextInput
            style={styles.input}
            placeholder="Категорії (через кому)"
            value={categories}
            onChangeText={setCategories}
        />

      <Pressable style={styles.imagePicker} onPress={pickImage}>
        <Text style={styles.imagePickerText}>Вибрати зображення</Text>
      </Pressable>

      {image && (
        <Image source={{ uri: image }} style={styles.previewImage} />
      )}

      <Pressable style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Створити товар</Text>
      </Pressable>
    </View>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#0f5813",
    padding: 15,
    borderRadius: 6,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  imagePicker: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
    alignItems: "center",
  },
  imagePickerText: {
    color: "#333",
  },
  previewImage: {
    width: "100%",
    height: 150,
    marginTop: 10,
    borderRadius: 6,
  },
});
