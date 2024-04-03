import 'react-native-gesture-handler';
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from './src/navigator/StackNavigator';
export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <StackNavigator/>
      </PaperProvider>
    </NavigationContainer>
  );
}
