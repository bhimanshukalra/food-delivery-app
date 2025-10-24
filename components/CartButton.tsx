import { images } from "@/constants";
import { useCartStore } from "@/store/cart.store";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const CartButton = () => {
  const { getTotalItems } = useCartStore();
  const totalItemCount = getTotalItems();

  const onPressCartButton = () => {
    router.push("/cart");
  };

  return (
    <TouchableOpacity className="cart-btn" onPress={onPressCartButton}>
      <Image source={images.bag} className="size-5" resizeMode="contain" />
      {totalItemCount > 0 && (
        <View className="cart-badge">
          <Text className="small-bold text-white">{totalItemCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CartButton;
