import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signin from "./screens/Signin";
import Singup from "./screens/Singup";

export default function App() {
	const Stack = createNativeStackNavigator();
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
				<Stack.Screen name="Signup" component={Singup} options={{ headerShown: false }} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
