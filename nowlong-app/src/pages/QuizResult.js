import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function QuizResult() {
  const navigation = useNavigation();
  const route = useRoute();
  const { result } = route.params;

  const goHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'QuizMain' }]
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Prediction</Text>
      <Text style={styles.result}>{result === 'long' ? '📈 LONG' : '📉 SHORT'}</Text>
      <Button title="Go to Home" onPress={goHome} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  result: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40
  }
});
