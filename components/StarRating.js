import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const StarRating = ({ item }) => {
	return (
		<View style={{ flexDirection: "row" }}>
			<FlatList
				style={{ flexDirection: "row" }}
				numColumns={item.ratingValue}
				data={[...Array(item.ratingValue).keys()]}
				listKey={(item) => item}
				keyExtractor={(item) => item}
				renderItem={() => <FontAwesome name="star" size={20} color="#ffaa5a" />}
			/>
			<FlatList
				style={{ flexDirection: "row" }}
				numColumns={5 - item.ratingValue}
				data={[...Array(5 - item.ratingValue).keys()]}
				listKey={(item) => item}
				keyExtractor={(item) => item}
				renderItem={() => <FontAwesome name="star-o" size={20} color="grey" />}
			/>
		</View>
	);
};

export default StarRating;

const styles = StyleSheet.create({});
