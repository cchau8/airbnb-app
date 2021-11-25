import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const ShowMore = ({ moreOrLess }) => {
	return (
		<View
			style={{
				flexDirection: "row",
				width: 100,
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			<Text style={{ color: "#989898" }}>{moreOrLess === "more" ? "Show more" : "Show less"}</Text>
			<FontAwesome
				name={moreOrLess === "more" ? "caret-down" : "caret-up"}
				size={20}
				color="#989898"
			/>
		</View>
	);
};

export default ShowMore;

const styles = StyleSheet.create({});
