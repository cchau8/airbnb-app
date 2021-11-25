import React from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	Dimensions,
	ImageBackground,
	Image,
	TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import StarRating from "../components/StarRating";
import Loading from "../components/Loading";
import ItemInfo from "../components/ItemInfo";

const width = Dimensions.get("window").width;

const HomeScreen = () => {
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const navigation = useNavigation();
	useEffect(async () => {
		try {
			const response = await axios.get("https://express-airbnb-api.herokuapp.com/rooms");
			setData(response.data);
			setIsLoading(false);
		} catch (error) {
			console.log(error.message);
		}
	}, []);
	return isLoading ? (
		<Loading />
	) : (
		<FlatList
			data={data}
			contentContainerStyle={{ alignItems: "center", paddingVertical: 15 }}
			keyExtractor={(item) => item._id}
			renderItem={({ item }) => (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate("Room", { id: item._id });
					}}
					style={styles.itemBtn}
				>
					<ImageBackground
						source={{
							uri: item.photos[0].url,
						}}
						style={styles.imgBackground}
						resizeMode="cover"
					>
						<Text style={styles.price}>{item.price} €</Text>
					</ImageBackground>
					<ItemInfo item={item} />
				</TouchableOpacity>
			)}
		/>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	itemBtn: {
		borderBottomColor: "#cecece",
		borderBottomWidth: 1,
		paddingTop: 20,
	},
	imgBackground: { width: width * 0.9, height: 200 },
	price: {
		backgroundColor: "#000",
		color: "#fff",
		padding: 8,
		width: 70,
		fontSize: 18,
		textAlign: "center",
		position: "absolute",
		bottom: 20,
	},
});
