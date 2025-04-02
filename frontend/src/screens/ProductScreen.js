import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Головна сторінка</Text>
      <Button title="Перейти до товару" onPress={() => navigation.navigate('Product')} />
    </View>
  );
}
