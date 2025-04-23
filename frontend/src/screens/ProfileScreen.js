import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, TextInput, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { clearUser, updateUser } from "../redux/userReducer";
import axios from "axios";

const ProfileScreen = () => {
  const user = useSelector((state) => state.user.user);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [localUsername, setLocalUsername] = useState("");
  const [localEmail, setLocalEmail] = useState("");

  // Якщо не залогінений — перенаправити
  useEffect(() => {
    if (!user || !user._id) {
      navigation.navigate("Login");
    }
  }, [user]);

  // Синхронізація локального стану з user
  useEffect(() => {
    if (user && user._id) {
      setLocalUsername(user.username || "");
      setLocalEmail(user.email || "");
    }
  }, [user]);

  const handleSave = async () => {
    try {
      const updatedUser = { username: localUsername, email: localEmail };
      const response = await axios.put(
        `http://10.0.2.2:5000/api/users/update/${user._id}`,
        updatedUser
      );

      dispatch(updateUser(response.data));

      Alert.alert("Успішно", "Ваш профіль оновлено.");
      navigation.navigate("Profile")
      setIsEditing(false);
    } catch (err) {
      console.log(err);
      Alert.alert("Помилка", "Не вдалося оновити профіль. Спробуйте ще раз.");
    }
  };

  const handleLogout = () => {
    dispatch(clearUser());
    navigation.navigate("Login");
  };

  const handleViewOrders = () => {
    navigation.navigate("Orders"); 
  };


  if (!user || !user._id) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Профіль користувача</Text>
      <Text style={styles.text}>ID: {user._id}</Text>
      

      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            value={localUsername}
            onChangeText={setLocalUsername}
            placeholder="Ім'я"
          />
          <TextInput
            style={styles.input}
            value={localEmail}
            onChangeText={setLocalEmail}
            placeholder="Електронна пошта"
          />
        </>
      ) : (
        <>
          <Text style={styles.text}>Ім’я: {user.username}</Text>
          <Text style={styles.text}>Email: {user.email}</Text>
        </>
      )}

      {isEditing ? (
        <Pressable style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Зберегти зміни</Text>
        </Pressable>
      ) : (
        <Pressable style={styles.button} onPress={() => setIsEditing(true)}>
          <Text style={styles.buttonText}>Редагувати профіль</Text>
        </Pressable>
      )}

      <Pressable
          style={[styles.button, { backgroundColor: "#1565c0" }]}
          onPress={handleViewOrders}
        >
          <Text style={styles.buttonText}>Мої замовлення</Text>
      </Pressable>

      <Pressable
        style={[styles.button, { backgroundColor: "#c62828" }]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Вийти</Text>
      </Pressable>
    

      {user.isAdmin && (
        <>
          <Pressable
            style={[styles.button, { backgroundColor: "#1565c0" }]}
            onPress={() => navigation.navigate("CreateProduct")}
          >
            <Text style={styles.buttonText}>➕ Додати товар</Text>
          </Pressable>

          <Pressable
            style={[styles.button, { backgroundColor: "#2e7d32" }]}
            onPress={() => navigation.navigate("AllProducts")}
          >
            <Text style={styles.buttonText}>📋 Переглянути всі товари</Text>
          </Pressable>

        </>
      )}
    </View>
  );
};

export default ProfileScreen;


const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#0f5813",
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    width: "100%",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#0f5813",
    padding: 15,
    borderRadius: 8,
    marginTop: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});