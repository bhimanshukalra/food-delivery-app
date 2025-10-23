import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { createUser } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  const submit = async () => {
    if (!form.email || !form.password || !form.name) {
      Alert.alert("Error", "Please enter valid email address & password");
      return;
    }
    setIsSubmitting(true);

    try {
      await createUser({ ...form });
      Alert.alert("Success", "User signed up successfully.");
      router.replace("/");
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOnChangeName = (name: string) => {
    setForm((prev) => ({ ...prev, name }));
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
        placeholder="Enter your full name"
        value={form.name}
        onChangeText={handleOnChangeName}
        label="Full name"
      />
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
      <CustomButton title="Sign Up" onPress={submit} isLoading={isSubmitting} />
      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          Already have an account?
        </Text>
        <Link href="/sign-in" className="base-bold text-primary">
          Sign in
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
