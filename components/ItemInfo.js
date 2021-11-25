import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import StarRating from "./StarRating";

const ItemInfo = ({ item }) => {
	return (
		<View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 20 }}>
			<View style={{ justifyContent: "space-around", overflow: "hidden", width: 280 }}>
				<Text style={{ fontSize: 16 }} numberOfLines={1}>
					{item.title}
				</Text>
				<View style={{ flexDirection: "row" }}>
					<StarRating item={item} />
					<Text style={styles.review}>{item.reviews} reviews</Text>
				</View>
			</View>
			<View>
				<Image
					source={{ uri: item.user.account.photo.url }}
					style={styles.avatar}
					resizeMode="cover"
				/>
			</View>
		</View>
	);
};

export default ItemInfo;

const styles = StyleSheet.create({
	review: { marginLeft: 10, color: "#989898" },
	avatar: { width: 70, height: 70, borderRadius: 35 },
});
