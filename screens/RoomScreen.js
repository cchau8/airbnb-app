import axios from "axios";
import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
import ShowMore from "../components/ShowMore";
import StarRating from "../components/StarRating";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import Loading from "../components/Loading";
import ItemInfo from "../components/ItemInfo";
const width = Dimensions.get("window").width;

const RoomScreen = ({ route }) => {
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [showMore, setShowMore] = useState(false);

	useEffect(async () => {
		try {
			const response = await axios.get(
				`https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`
			);
			setData(response.data);
			setIsLoading(false);
		} catch (error) {
			console.log(error.message);
		}
	}, []);
	return isLoading ? (
		<View>
			<Loading />
		</View>
	) : (
		<View style={{ width: width, alignItems: "center" }}>
			<View style={{ width: width, height: 250 }}>
				<SwiperFlatList
					autoplay
					autoplayDelay={5}
					autoplayLoop
					index={0}
					showPagination
					data={data.photos}
					renderItem={({ item }) => (
						<View style={[styles.child]}>
							<Image
								source={{ uri: item.url }}
								style={{ width: width, height: 250 }}
								resizeMode="cover"
							/>
						</View>
					)}
				/>
			</View>
			<View style={{ width: width * 0.9 }}>
				<ItemInfo item={data} />
				<View>
					<Text numberOfLines={showMore ? 999 : 3} style={styles.description}>
						{data.description}
					</Text>
					<TouchableOpacity
						onPress={() => {
							setShowMore(!showMore);
						}}
						style={{ alignSelf: "flex-end" }}
					>
						{showMore ? <ShowMore moreOrLess="less" /> : <ShowMore moreOrLess="more" />}
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default RoomScreen;

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "white" },
	child: { width, justifyContent: "center" },
	description: { fontSize: 14, textAlign: "justify" },
});
