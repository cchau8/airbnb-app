import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Signin from "./screens/Signin";
import Signup from "./screens/Signup";
import HomeScreen from "./screens/HomeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AroundScreen from "./screens/AroundScreen";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import ProfileScreen from "./screens/ProfileScreen";
import RoomScreen from "./screens/RoomScreen";
import { Image } from "react-native";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
	const [userToken, setUserToken] = useState(24524572);

	const setToken = async (token) => {
		if (token) {
			await AsyncStorage.setItem("token", token);
		} else {
			await AsyncStorage.removeItem("token");
		}
		setUserToken(token);
	};

	return (
		<NavigationContainer>
			<Stack.Navigator>
				{userToken === null ? (
					<>
						<Stack.Screen name="Signin" options={{ headerShown: false }}>
							{() => <Signin setToken={setToken} />}
						</Stack.Screen>
						<Stack.Screen name="Signup" options={{ headerShown: false }}>
							{() => <Signup setToken={setToken} />}
						</Stack.Screen>
					</>
				) : (
					<Stack.Screen name="Tab" options={{ headerShown: false }}>
						{() => (
							<Tab.Navigator
								screenOptions={{
									headerShown: false,
									tabBarActiveTintColor: "tomato",
									tabBarInactiveTintColor: "gray",
									tabBarStyle: { height: 60, paddingBottom: 8 },
								}}
							>
								<Tab.Screen
									name="TabHome"
									options={{
										tabBarLabel: "Home",
										tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
									}}
								>
									{() => (
										<Stack.Navigator
											screenOptions={{
												headerTitle: () => (
													<Image
														source={require("./assets/logo.png")}
														style={{ width: 50, height: 50 }}
													/>
												),
												headerTitleAlign: "center",
											}}
										>
											<Stack.Screen name="Home">{() => <HomeScreen />}</Stack.Screen>
											<Stack.Screen name="Room">
												{(props) => <RoomScreen {...props} />}
											</Stack.Screen>
										</Stack.Navigator>
									)}
								</Tab.Screen>
								<Tab.Screen
									name="TabAround"
									options={{
										tabBarLabel: "Around me",
										tabBarIcon: ({ color }) => (
											<Ionicons name="md-location-outline" size={24} color={color} />
										),
									}}
								>
									{() => (
										<Stack.Navigator>
											<Stack.Screen name="Around">{() => <AroundScreen />}</Stack.Screen>
										</Stack.Navigator>
									)}
								</Tab.Screen>
								<Tab.Screen
									name="TabProfile"
									options={{
										tabBarLabel: "Profile",
										tabBarIcon: ({ color }) => (
											<FontAwesome name="user-o" size={24} color={color} />
										),
									}}
								>
									{() => (
										<Stack.Navigator>
											<Stack.Screen name="Profile">{() => <ProfileScreen />}</Stack.Screen>
										</Stack.Navigator>
									)}
								</Tab.Screen>
							</Tab.Navigator>
						)}
					</Stack.Screen>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
