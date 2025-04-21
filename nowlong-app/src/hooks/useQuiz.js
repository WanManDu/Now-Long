import { useState } from 'react';
import api from '../api/api';

export default function useQuiz() {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuiz = async (token) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get('/quiz/random', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setQuiz(response.data);
    } catch (err) {
      console.error('❌ Failed to fetch quiz:', err);
      setError('Failed to load quiz');
    } finally {
      setLoading(false);
    }
  };

  return {
    quiz,
    loading,
    error,
    fetchQuiz,
  };
}
