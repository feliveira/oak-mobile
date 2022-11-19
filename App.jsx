import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import Dashboard from "./src/pages/Dashboard";
import Landing from "./src/pages/Landing";
import Login from "./src/pages/Login";
import Signup from "./src/pages/Signup";


const Stack = createNativeStackNavigator( )

export default function App() {
  
  return (
      <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Landing">
            <Stack.Screen name="Landing" component={Landing} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
          </Stack.Navigator>
      </NavigationContainer>
  );
}
