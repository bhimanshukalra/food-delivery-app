import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { Alert } from "react-native";
import "./globals.css";
import useAuthStore from "@/store/auth.store";

const fonts = {
  "QuickSand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
  "QuickSand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
  "QuickSand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
  "QuickSand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
  "QuickSand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
};

export default function RootLayout() {
  const { isLoading, fetchAuthenticatedUser } = useAuthStore();
  const [fontsLoaded, error] = useFonts(fonts);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hide();
    }
    if (error) {
      Alert.alert("An error occurred while loading fonts", error.message);
    }
  }, [fontsLoaded, error]);

  useEffect(() => {
    fetchAuthenticatedUser();
  }, []);

  if (!fontsLoaded || isLoading) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
