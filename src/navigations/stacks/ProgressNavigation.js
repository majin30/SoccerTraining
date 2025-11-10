import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProgressOverviewScreen, HistoryScreen, AchievementsScreen } from '../../screens/Progress';
import { screens } from '../../utils/screens';

const Stack = createNativeStackNavigator();

export function ProgressNavigation({ route }) {
  const token = route?.params?.token || null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name={screens.tab.progress.overview} 
        component={ProgressOverviewScreen}
        initialParams={{ token }}
      />
      <Stack.Screen 
        name={screens.tab.progress.history} 
        component={HistoryScreen}
        initialParams={{ token }}
      />
      <Stack.Screen 
        name={screens.tab.progress.achievements} 
        component={AchievementsScreen}
        initialParams={{ token }}
      />
    </Stack.Navigator>
  );
}
