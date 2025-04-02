import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';


const StackNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        {/* 
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen name="Cart" component={CartScreen} /> */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{headerShown:false}} 
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
        /> 
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{headerShown:false}}
        />
        {/* <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen name="Cart" component={CartScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
