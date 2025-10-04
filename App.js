import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { HandlerNavigation } from './src/navigations/HandlerNavigation';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <HandlerNavigation />
        <StatusBar style="light" />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
