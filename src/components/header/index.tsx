import { View, Image } from "react-native";

export function Header() {
  return (
    <View className="w-full pt-12 pb-4 px-4">
      <Image
        source={require("../../images/logo.png")}
        resizeMode="contain"
        style={{
          width: "100%",
          height: 100,
        }}
      />
    </View>
  );
}
