import { ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://cgqwdj0z.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%20%3D%3D%20%22category%22%5D"
        );
        const data = await res.json();
        setCategories(data.result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {/* Category Card */}
      {Array.isArray(categories) &&
        categories.length > 0 &&
        categories.map((cat) => (
          <CategoryCard imgUrl={cat.image} key={cat._id} title={cat.name} />
        ))}
    </ScrollView>
  );
};

export default Categories;
