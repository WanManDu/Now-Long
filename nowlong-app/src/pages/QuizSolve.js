import React from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { api } from '../api/api';

export default function QuizSolve() {
  const navigation = useNavigation();
  const route = useRoute();
  const { quizData } = route.params;
  const [submitting, setSubmitting] = React.useState(false);

  const submitAnswer = async (prediction) => {
    setSubmitting(true);
    try {
      await api.post('/quiz/submit', {
        quizMetaId: quizData.quizId,
        prediction,
        reasons: ["MACD 상승 전환", "RSI 반등 확인"] // 임시 하드코딩. 나중에 입력받게 개선
      });
      navigation.navigate('QuizResult', { result: prediction });
    } catch (error) {
      console.error('답안 제출 실패:', error);
      alert('Failed to submit answer.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Predict the Next Move</Text>
      <Text style={styles.subtitle}>{quizData?.chartData?.assetSymbol || 'Chart'}</Text>
      {submitting ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Button title="Go Long 🚀" onPress={() => submitAnswer('long')} />
          <Button title="Go Short 🐻" onPress={() => submitAnswer('short')} />
        </>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30
  }
});
