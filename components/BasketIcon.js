import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectBaskedTotal, selectBasketItems } from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";
import { formatCurrency } from "react-native-format-currency";

const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBaskedTotal);
  const navigation = useNavigation();
  const [valueFormattedWithSymbol] = formatCurrency({
    amount: basketTotal,
    code: "USD"
  });
  if (items.length === 0) return null;
  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        onPress={() => navigation.navigate("Basket")}
        className="bg-[#00CCBB] mx-5 p-4 rounded-lg flex-row items-center space-x-1"
      >
        <Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-2">
          {items.length}
        </Text>
        <Text className="text-white font-extrabold text-lg text-center flex-1">
          View Basket
        </Text>
        <Text className="text-lg text-white font-extrabold">
          {valueFormattedWithSymbol}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
