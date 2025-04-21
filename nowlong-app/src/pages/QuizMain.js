import React from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { api } from '../api/api'; 

export default function QuizMain() {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);

  const startQuiz = async () => {
    setLoading(true);
    try {
      const response = await api.get('/quiz/random'); 
      const quizData = response.data;
      navigation.navigate('QuizSolve', { quizData });
    } catch (error) {
        console.error('퀴즈 로딩 실패:', error.response ? error.response.data : error.message);
      alert('Failed to load quiz.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to NowLong</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Start Quiz" onPress={startQuiz} />
      )}
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20
  }
});
