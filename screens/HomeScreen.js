import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import "react-native-url-polyfill";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronDownIcon,
  UserIcon,
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeatureRow from "../components/FeatureRow";
const HomeScreen = () => {
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  useEffect(() => {
    const fetchFeaturedCategories = async () => {
      try {
        const res = await fetch(
          "https://cgqwdj0z.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%20%3D%3D%20%22featured%22%5D%20%7B%0A%20%20%20%20%20%20...%2C%0A%20%20%20%20%20%20restaurants%5B%5D-%3E%7B%0A%20%20%20%20%20%20%20%20...%2C%0A%20%20%20%20%20%20%20%20dishes%5B%5D-%3E%2C%0A%20%20%20%20%20%20%20%20type-%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D"
        );
        const data = await res.json();
        setFeaturedCategories(data.result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFeaturedCategories();
  }, []);

  return (
    <SafeAreaView className="bg-white pt-5">
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-300">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>
        <UserIcon size={35} color="#00CCBB" />
      </View>
      {/* Search Bar */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3">
          <MagnifyingGlassIcon color="gray" size={20} />
          <TextInput
            placeholder="Restaurants and cuisines"
            keyboardType="default"
          />
        </View>
        <AdjustmentsVerticalIcon color="#00CCBB" />
      </View>
      {/* Body */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/* Categories */}
        <Categories />

        {/* Feature Row */}
        {featuredCategories?.map((category) => (
          <FeatureRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
            restaurants={category.restaurants}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
