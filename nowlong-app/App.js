import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';  // 여기 수정

import QuizMain from './src/pages/QuizMain';
import QuizSolve from './src/pages/QuizSolve';
import QuizResult from './src/pages/QuizResult';

const Stack = createNativeStackNavigator();  // 여기 수정

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="QuizMain">
        <Stack.Screen name="QuizMain" component={QuizMain} options={{ title: 'NowLong' }} />
        <Stack.Screen name="QuizSolve" component={QuizSolve} options={{ title: 'Solve Quiz' }} />
        <Stack.Screen name="QuizResult" component={QuizResult} options={{ title: 'Result' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
