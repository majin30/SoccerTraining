import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsScreen, EditProfileScreen, NotificationsScreen } from '../../screens/Settings';
import { screens } from '../../utils/screens';

const Stack = createNativeStackNavigator();

export function SettingsNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screens.tab.settings.main} component={SettingsScreen} />
      <Stack.Screen name={screens.tab.settings.editProfile} component={EditProfileScreen} />
      <Stack.Screen name={screens.tab.settings.notifications} component={NotificationsScreen} />
    </Stack.Navigator>
  );
}
