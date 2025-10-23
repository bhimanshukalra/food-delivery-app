import CartButton from "@/components/CartButton";
import { images, Offer, offers } from "@/constants";
import cn from "clsx";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CategoryItem = ({ item, index }: { item: Offer; index: number }) => {
  const isEvenIndex = index % 2 === 0;

  return (
    <View>
      <Pressable
        className={cn(
          `offer-card bg-[${item.color}]`,
          isEvenIndex ? "flex-row-reverse" : "flex-row"
        )}
        android_ripple={{ color: "#fffff22" }}
      >
        {({ pressed }) => (
          <>
            <View className="h-full w-1/2">
              <Image
                source={item.image}
                className="size-full"
                resizeMode="contain"
              />
            </View>
            <View
              className={cn(
                "offer-card__info",
                isEvenIndex ? "pl-10" : "pr-10"
              )}
            >
              <Text className="h1-bold text-white leading-tight">
                {item.title}
              </Text>
              <Image
                source={images.arrowRight}
                className="size-10"
                resizeMode="contain"
                tintColor={"#ffffff"}
              />
            </View>
          </>
        )}
      </Pressable>
    </View>
  );
};

const Header = () => (
  <View className="flex-between flex-row w-full my-5">
    <View className="flex-start">
      <Text className="small-bold text-primary">DELIVER TO</Text>
      <TouchableOpacity className="flex-center flex-row gap-x-1 mt-0.5">
        <Text>Florida</Text>
        <Image
          source={images.arrowDown}
          className="size-3"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
    <CartButton />
  </View>
);

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={offers}
        renderItem={({ item, index }) => (
          <CategoryItem item={item} index={index} />
        )}
        keyExtractor={({ id }) => id.toString()}
        contentContainerClassName="pb-28 px-5"
        ListHeaderComponent={<Header />}
      />
    </SafeAreaView>
  );
}
