import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please enter valid email address & password");
      return
    }
    setIsSubmitting(true);

    try {
      Alert.alert("Success", "User signed in successfully.");
      router.replace("/");
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOnChangeEmail = (email: string) => {
    setForm((prev) => ({ ...prev, email }));
  };

  const handleOnChangePassword = (password: string) => {
    setForm((prev) => ({ ...prev, password }));
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        onChangeText={handleOnChangeEmail}
        label="Email"
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Enter your password"
        value={form.password}
        onChangeText={handleOnChangePassword}
        label="Password"
        secureTextEntry
      />
      <CustomButton title="Sign In" onPress={submit} isLoading={isSubmitting} />
      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          Don't have an account?
        </Text>
        <Link href="/sign-up" className="base-bold text-primary">
          Sign up
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
