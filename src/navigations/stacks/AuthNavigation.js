import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStartScreen, LoginScreen, RegisterScreen } from '../../screens/Auth';
import { screens } from '../../utils/screens';

const Stack = createNativeStackNavigator();

export function AuthNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screens.auth.authStartScreen} component={AuthStartScreen} />
      <Stack.Screen name={screens.auth.loginScreen} component={LoginScreen} />
      <Stack.Screen name={screens.auth.registerScreen} component={RegisterScreen} />
    </Stack.Navigator>
  );
}
