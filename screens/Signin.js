import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Dimensions,
	ActivityIndicator,
} from "react-native";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LogoHeader from "../components/LogoHeader";
import Password from "../components/Password";
import { useNavigation } from "@react-navigation/native";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Signin = ({ setToken }) => {
	const navigation = useNavigation();
	const [email, setEmail] = useState("nono@airbnb-api.com");
	const [password, setPassword] = useState("pass");
	const [hidePassword, setHidePassword] = useState(true);
	const [fillAll, setFillAll] = useState();
	const [wrong, setWrong] = useState(false);
	const [loading, setLoading] = useState(false);
	const handleSubmit = async () => {
		try {
			if (email === "" || password === "") {
				setFillAll(false);
			} else {
				setLoading(true);
				setFillAll(true);
				const response = await axios.post("https://express-airbnb-api.herokuapp.com/user/log_in", {
					email: email,
					password: password,
				});

				if (response.status === 200) {
					setToken(response.data.token);
					setLoading(false);
					setWrong(false);
				}
			}
		} catch (error) {
			if (error.message.includes(401)) {
				setWrong(true);
				setLoading(false);
			} else {
				alert(error.message);
			}
		}
	};
	return (
		<KeyboardAwareScrollView
			contentContainerStyle={styles.scrollContainer}
			keyboardDismissMode="on-drag"
			keyboardShouldPersistTaps={"always"}
		>
			<LogoHeader title="Sign In" />
			<View style={{ height: 110, justifyContent: "space-between" }}>
				<TextInput
					placeholder="E-mail"
					style={styles.input}
					onChangeText={(text) => {
						setEmail(text);
					}}
					keyboardType="email-address"
					value={email}
				/>
				<Password
					setHidePassword={setHidePassword}
					hidePassword={hidePassword}
					setPassword={setPassword}
					placeholder="Password"
					width={width}
				/>
			</View>

			<View style={{ height: 140, justifyContent: "space-around" }}>
				{loading ? (
					<ActivityIndicator size="large" color="#ff5a5f" />
				) : (
					<>
						<View>
							{fillAll === false && (
								<Text style={{ textAlign: "center", color: "#FF5A5F" }}>
									Please fill all fields
								</Text>
							)}
							{wrong && (
								<Text style={{ textAlign: "center", color: "#FF5A5F" }}>
									Email/Password combination wrong
								</Text>
							)}
						</View>
						<TouchableOpacity
							style={styles.submitBtn}
							onPress={() => {
								handleSubmit();
							}}
						>
							<Text style={styles.btnText}>Sign In</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate("Signup");
							}}
						>
							<Text style={{ color: "#666", textAlign: "center" }}>No account ? Register now</Text>
						</TouchableOpacity>
					</>
				)}
			</View>
		</KeyboardAwareScrollView>
	);
};

export default Signin;

const styles = StyleSheet.create({
	scrollContainer: {
		alignItems: "center",
		justifyContent: "space-around",
		height: height,
	},
	input: {
		width: width * 0.8,
		fontSize: 16,
		borderBottomColor: "#FF5A5F",
		borderBottomWidth: 1,
		padding: 5,
	},
	submitBtn: { borderColor: "#FF5A5F", borderWidth: 2, padding: 10, borderRadius: 30 },
	btnText: { textAlign: "center", fontSize: 18 },
	eyeBtn: {
		width: 25,
		height: 25,
		justifyContent: "center",
		alignItems: "center",
	},
});
