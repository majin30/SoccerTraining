import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NutritionDashboardScreen, HydrationScreen, SupplementsScreen } from '../../screens/Nutrition';
import { screens } from '../../utils/screens';

const Stack = createNativeStackNavigator();

export function NutritionNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screens.tab.nutrition.dashboard} component={NutritionDashboardScreen} />
      <Stack.Screen name={screens.tab.nutrition.hydration} component={HydrationScreen} />
      <Stack.Screen name={screens.tab.nutrition.supplements} component={SupplementsScreen} />
    </Stack.Navigator>
  );
}
