import React from "react";
import { StyleSheet, TextInput, View, Dimensions, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const width = Dimensions.get("window").width;

const Password = ({ setPassword, hidePassword, setHidePassword, placeholder }) => {
	return (
		<View
			style={[
				styles.input,
				{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
				},
			]}
		>
			<TextInput
				placeholder={placeholder}
				style={{ fontSize: 16, width: width * 0.8 * 0.8 }}
				onChangeText={(text) => {
					setPassword(text);
				}}
				secureTextEntry={hidePassword}
				autoCorrect={false}
				selectionColor="#ff5a5f"
			/>
			<TouchableOpacity
				onPress={() => {
					setHidePassword(!hidePassword);
				}}
				style={styles.eyeBtn}
			>
				{hidePassword ? (
					<FontAwesome name="eye-slash" size={20} color="#666" />
				) : (
					<FontAwesome name="eye" size={20} color="#666" />
				)}
			</TouchableOpacity>
		</View>
	);
};

export default Password;

const styles = StyleSheet.create({
	input: {
		width: width * 0.8,
		fontSize: 16,
		borderBottomColor: "#FF5A5F",
		borderBottomWidth: 1,
		padding: 5,
	},
});
