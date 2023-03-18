import { View, Text, ScrollView } from "react-native";
import React from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
const testObj = {
  id: 123,
  imgUrl: "https://links.papareact.com/gn7",
  title: "YO! sushi",
  rating: 2.3,
  genre: "GAy porn",
  address: "Guamo avenue",
  short_description: "Aja",
  dishes: "",
  long: "",
  lat: "",
};
const FeatureRow = ({ id, title, description }) => {
  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>
      <Text className="text-sx text-gray-400 px-4">{description}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* Restaurant Cards */}
        <RestaurantCard {...testObj} />
      </ScrollView>
    </View>
  );
};

export default FeatureRow;
