import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const LogoHeader = ({ title }) => {
	return (
		<View>
			<Image
				source={require("../assets/logo.png")}
				style={{ width: 200, height: 200 }}
				resizeMode="cover"
			/>
			<Text style={{ fontSize: 30, textAlign: "center", color: "#666" }}>{title}</Text>
		</View>
	);
};

export default LogoHeader;

const styles = StyleSheet.create({});
