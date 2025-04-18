import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { restoreUser } from "../redux/userReducer";

const useLoadUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          dispatch(restoreUser(JSON.parse(userData)));
        }
      } catch (error) {
        console.error("Помилка завантаження користувача:", error);
      }
    };

    loadUserFromStorage();
  }, []);
};

export default useLoadUser;
