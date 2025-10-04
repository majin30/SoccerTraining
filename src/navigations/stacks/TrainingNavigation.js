import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TrainingDashboardScreen, ExerciseDetailScreen, CustomTrainingScreen } from '../../screens/Training';
import { screens } from '../../utils/screens';

const Stack = createNativeStackNavigator();

export function TrainingNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screens.tab.training.dashboard} component={TrainingDashboardScreen} />
      <Stack.Screen name={screens.tab.training.exercise} component={ExerciseDetailScreen} />
      <Stack.Screen name={screens.tab.training.custom} component={CustomTrainingScreen} />
    </Stack.Navigator>
  );
}
