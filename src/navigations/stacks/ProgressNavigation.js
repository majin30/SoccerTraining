import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProgressOverviewScreen, HistoryScreen, AchievementsScreen } from '../../screens/Progress';
import { screens } from '../../utils/screens';

const Stack = createNativeStackNavigator();

export function ProgressNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screens.tab.progress.overview} component={ProgressOverviewScreen} />
      <Stack.Screen name={screens.tab.progress.history} component={HistoryScreen} />
      <Stack.Screen name={screens.tab.progress.achievements} component={AchievementsScreen} />
    </Stack.Navigator>
  );
}
