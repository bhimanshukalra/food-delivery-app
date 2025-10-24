import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { images } from "@/constants";
import { useDebouncedCallback } from "use-debounce";

const SearchBar = () => {
  const params = useLocalSearchParams<{ query?: string }>();
  const [query, setQuery] = useState(params.query || "");

  const debouncedSearch = useDebouncedCallback(
    (query: string) => router.push(`/search?query=${query}`),
    300
  );

  const handleSearch = (query: string) => {
    setQuery(query);
    debouncedSearch(query);
  };

  const handleOnPressSearchButton = () => {
    router.setParams({ query });
  };

  return (
    <View className="searchbar">
      <TextInput
        className="flex-1 p-5"
        placeholder="Search for pizzas, burgers"
        value={query}
        onChangeText={handleSearch}
        placeholderTextColor="#A0A0A0"
        onSubmitEditing={handleOnPressSearchButton}
        returnKeyType="search"
      />
      <TouchableOpacity className="pr-5" onPress={handleOnPressSearchButton}>
        <Image
          source={images.search}
          className="size-6"
          resizeMode="contain"
          tintColor="#5D5F6D"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
