import { Image, ScrollView } from "react-native";
import React from "react";
import CategoryCard from "./CategoryCard";

const Categories = ({ categories }) => {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {/* Category Card */}
      {Array.isArray(categories) &&
        categories.length > 0 &&
        categories.map((cat) => (
          <CategoryCard
            imgUrl="https://links.papareact.com/gn7"
            key={cat.id}
            title={cat.name}
          />
        ))}
    </ScrollView>
  );
};

export default Categories;
