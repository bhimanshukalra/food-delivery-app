import cn from "clsx";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Models } from "react-native-appwrite";

export interface Category extends Models.Document {
  name: string;
  description: string;
}

const Filter = ({ categories }: { categories: Category[] }) => {
  const searchParams = useLocalSearchParams<{category?:string}>();
  const [active, setActive] = useState(searchParams.category || "all");

  const filterData: (Category | { $id: string; name: string })[] = categories
    ? [{ $id: "all", name: "All" }, ...categories]
    : [{ $id: "all", name: "All" }];

  const FilterItem = ({
    item,
  }: {
    item: Category | { $id: string; name: string };
  }) => {
    const handleOnPress = () => {
      setActive(item.$id);
      if(item.$id === 'all'){
        router.setParams({ category: '' });
      }else{
        router.setParams({category: item.$id})
      }
    };
    return (
      <TouchableOpacity
        className={cn(
          "filter",
          active === item.$id ? "bg-amber-500" : "bg-white"
        )}
        style={style.filterItemContainer}
        onPress={handleOnPress}
      >
        <Text
          className={cn(
            "body-medium",
            active === item.$id ? "text-white" : "text-gray-200"
          )}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={filterData}
      keyExtractor={(item) => item.$id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-x-2 pb-3"
      renderItem={({ item }) => <FilterItem item={item} />}
    />
  );
};

export default Filter;

const style = StyleSheet.create({
  filterItemContainer: {
    ...Platform.select({
      android: { elevation: 5, shadowColor: "#878787" },
      ios: {},
    }),
  },
});
