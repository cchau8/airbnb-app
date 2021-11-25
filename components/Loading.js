import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";

const Loading = () => {
	return (
		<View style={{ justifyContent: "center", alignItems: "center" }}>
			<LottieView
				style={{
					width: 300,
					height: 300,
					backgroundColor: "#eee",
				}}
				source={require("../assets/loading-lottie.json")}
				autoPlay
				loop
			/>
		</View>
	);
};

export default Loading;
