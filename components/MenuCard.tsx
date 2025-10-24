import { MenuItem } from "@/app/(tabs)/search";
import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

interface MenuCardProps {
  item: MenuItem;
}

const MenuCard = ({ item }: MenuCardProps) => {
  const { name, price, image_url } = item;
  const imageSource = { uri: image_url };

  return (
    <TouchableOpacity className="menu-card" style={styles.card}>
      <Image
        source={imageSource}
        className="size-32 absolute -top-10"
        resizeMode="contain"
      />
      <Text
        className="text-center base-bold text-dark-100 mb-2"
        numberOfLines={1}
      >
        {name}
      </Text>
      <Text className="body-regular text-gray-200 mb-4">From ${price}</Text>
      <TouchableOpacity onPress={() => {}}>
        <Text className="paragraph-bold text-primary">Add to card+</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MenuCard;

const styles = StyleSheet.create({
  card: {
    ...Platform.select({
      android: { elevation: 10, shadowColor: "#878787" },
      ios: {},
    }),
  },
});
