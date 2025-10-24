import CustomHeader from "@/components/CustomHeader";
import { images } from "@/constants";
import useAuthStore, { User } from "@/store/auth.store";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfilePicture = ({
  userImageSource,
}: {
  userImageSource: {
    uri: string;
  };
}) => (
  <View>
    <Image source={userImageSource} className="size-20 rounded-full" />
    <TouchableOpacity className="bg-primary rounded-full p-1 absolute bottom-0 right-0">
      <Image source={images.pencil} className="size-4" />
    </TouchableOpacity>
  </View>
);
interface UserDetailItemProps {
  icon: ImageSourcePropType;
  label: string;
  value: string;
}
const UserDetailItem = ({ icon, label, value }: UserDetailItemProps) => (
  <View className="flex flex-row items-start justify-start">
    <View className="bg-amber-50 p-2 rounded-full">
      <Image source={icon} className="size-6" />
    </View>
    <View className="ml-4">
      <Text className="paragraph-medium text-gray-200">{label}</Text>
      <Text className="paragraph-bold text-dark-100">{value}</Text>
    </View>
  </View>
);

const UserDetails = ({ user }: { user: User | null }) => (
  <View className="flex w-full bg-white rounded-2xl p-5 gap-8 mt-8">
    <UserDetailItem
      icon={images.user}
      label="Full Name"
      value={user?.name ?? ""}
    />
    <UserDetailItem
      icon={images.envelope}
      label="Email"
      value={user?.email ?? ""}
    />
    <UserDetailItem
      icon={images.phone}
      label="Phone number"
      value={"+1 555 123 4567"}
    />
    <UserDetailItem
      icon={images.location}
      label="Address 1 - (Home)"
      value={"123 Main Street, Springfield, IL 62704"}
    />
    <UserDetailItem
      icon={images.location}
      label="Address 2 - (Work)"
      value={"221B Rose Street, Foodville, FL 12345"}
    />
  </View>
);

const EditButton = () => (
  <TouchableOpacity className="border w-full p-4 rounded-3xl items-center border-primary bg-amber-100 mt-8">
    <Text className="paragraph-bold text-primary">Edit Profile</Text>
  </TouchableOpacity>
);

const LogoutButton = () => (
  <TouchableOpacity className="border w-full p-4 rounded-3xl justify-center border-red-600 bg-red-100 mt-8 flex flex-row gap-2">
    <Image source={images.logout} className="size-6" />
    <Text className="paragraph-bold text-red-500">Logout</Text>
  </TouchableOpacity>
);

const Profile = () => {
  const { user } = useAuthStore();
  const userImageSource = { uri: user?.avatar ?? "" };

  return (
    <SafeAreaView className="flex flex-1 items-center px-5 bg-amber-50">
      <CustomHeader title="Profile" />
      <ProfilePicture userImageSource={userImageSource} />
      <UserDetails user={user} />
      <EditButton />
      <LogoutButton />
    </SafeAreaView>
  );
};

export default Profile;
