import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import { useNavigation } from "@react-navigation/native";
import {
  removeFromBasket,
  selectBaskedTotal,
  selectBasketItems
} from "../features/basketSlice";
import { XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import { formatCurrency } from "react-native-format-currency";

const BasketScreen = () => {
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const [groupedItemsInBascket, setGroupedItemsInBascket] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const basketTotal = useSelector(selectBaskedTotal);
  const formatPrice = (price) => {
    const [valueFormattedWithSymbol] = formatCurrency({
      amount: price,
      code: "USD"
    });
    return valueFormattedWithSymbol;
  };
  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      // Create an empty array for the current id if it doesn't exist in the results object
      // if (!results[item.id]) {
      //   results[item.id] = [];
      // }
      // Push the current item into the array for the current id
      // results[item.id].push(item);
      // The next lane its the same as the comments above
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInBascket(groupedItems);
  }, [items]);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-sm">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">{restaurant.name}</Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon color="#00CCBB" size={50} />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{ uri: "https://links.papareact.com/wru" }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text className=" text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBascket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-[#00CCBB]">{items.length} x</Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className="text-gray-600">
                {formatPrice(items[0]?.price)}
              </Text>
              <TouchableOpacity>
                <Text
                  className="text-[#00CCBB] text-sm"
                  onPress={() => dispatch(removeFromBasket(key))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal:</Text>
            <Text className="text-gray-400">{formatPrice(basketTotal)}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Free:</Text>
            <Text className="text-gray-400">{formatPrice(5.99)}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Order Total:</Text>
            <Text className="font-extrabold">
              {formatPrice(basketTotal + 5.99)}
            </Text>
          </View>
          <TouchableOpacity className="rounded-lg bg-[#00CCBB] p-4">
            <Text className="text-center text-white text-lg font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
