import React, { useState, useEffect } from "react";
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
import { useNavigation } from "@react-navigation/native";
import Password from "../components/Password";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Signup = () => {
	const navigation = useNavigation();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [description, setDescription] = useState("");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	const [hidePassword, setHidePassword] = useState(true);
	const [fillAll, setFillAll] = useState();
	const [notSame, setNotSame] = useState();
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		if (password === confirm) {
			setNotSame(false);
		} else {
			setNotSame(true);
		}
	}, [password, confirm]);
	const handleSubmit = async () => {
		try {
			if (email === "" || password === "") {
				setFillAll(false);
			} else if (notSame === true) {
				return;
			} else {
				setLoading(true);
				setFillAll(true);
				const response = await axios.post(
					"https://express-airbnb-api.herokuapp.com/user/sign_up",
					{
						email: email,
						username: username,
						description: description,
						password: password,
					}
				);

				if (response.status === 200) {
					alert("Connected");
					setLoading(false);
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
			<LogoHeader title="Sign Up" />
			<View style={{ height: 400, justifyContent: "space-between" }}>
				<TextInput
					placeholder="E-mail"
					style={styles.input}
					onChangeText={(text) => {
						setEmail(text);
					}}
					keyboardType="email-address"
					selectionColor="#ff5a5f"
				/>
				<TextInput
					placeholder="Username"
					style={styles.input}
					onChangeText={(text) => {
						setUsername(text);
					}}
					selectionColor="#ff5a5f"
				/>
				<TextInput
					placeholder="Describe yourself in a few words..."
					style={{
						height: 100,
						width: width * 0.8,
						borderColor: "#ff5a5f",
						borderWidth: 1,
						fontSize: 16,
						padding: 10,
						justifyContent: "flex-start",
					}}
					onChangeText={(text) => {
						setDescription(text);
					}}
					multiline={true}
					numberOfLines={3}
					selectionColor="#ff5a5f"
				/>
				<Password
					setHidePassword={setHidePassword}
					hidePassword={hidePassword}
					setPassword={setPassword}
					placeholder="Password"
					width={width}
				/>
				<Password
					setHidePassword={setHidePassword}
					hidePassword={hidePassword}
					setPassword={setConfirm}
					placeholder="Confirm password"
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
							{notSame && (
								<Text style={{ textAlign: "center", color: "#FF5A5F" }}>
									Passwords must be the same
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
								navigation.navigate("Signin");
							}}
						>
							<Text style={{ color: "#666", textAlign: "center" }}>
								Already registered, sign in now
							</Text>
						</TouchableOpacity>
					</>
				)}
			</View>
		</KeyboardAwareScrollView>
	);
};

export default Signup;

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
