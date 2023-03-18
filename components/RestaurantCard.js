import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanity";
const RestaurantCard = ({
  id,
  image,
  name,
  rating,
  type,
  address,
  short_description,
  dishes,
  long,
  lat,
}) => {
  return (
    <TouchableOpacity className="bg-white mr-3 shadow ">
      <Image source={{ uri: urlFor(image).url() }} className="w-64 h-36 rounded-sm" />
      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{name}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon color="green" opacity={0.5} size={22} />
          <Text className="text-xs text-gray-500">
            <Text className="text-green-500">{rating} </Text>. {type?.name}
          </Text>
        </View>

        <View className="flex-row items-center space-x-1">
          <MapPinIcon color="green" opacity={0.3} size={22} />
          <Text className="text-xs text-gray-500">Near by . {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
