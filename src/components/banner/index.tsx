import { View, Image } from "react-native";
import PagerView from "react-native-pager-view";

export function Banner() {
  return (
    <View className="w-full h-48 rounded-2xl mt-5 mb-4 overflow-hidden">
      <PagerView
        style={{ flex: 1 }}
        initialPage={0}
        pageMargin={14}
      >
        <View key="1">
          <Image
            source={require("../../images/slide1.png")}
            className="w-full h-56 rounded-2xl"
            resizeMode="cover"
          />
        </View>

        <View key="2">
          <Image
            source={require("../../images/slide2.png")}
            className="w-full h-56 rounded-2xl"
            resizeMode="cover"
          />
        </View>

        <View key="3">
          <Image
            source={require("../../images/slide3.png")}
            className="w-full h-56 rounded-2xl"
            resizeMode="cover"
          />
        </View>

        <View key="4">
          <Image
            source={require("../../images/slide4.png")}
            className="w-full h-56 rounded-2xl"
            resizeMode="cover"
          />
        </View>

        <View key="5">
          <Image
            source={require("../../images/slide5.png")}
            className="w-full h-56 rounded-2xl"
            resizeMode="cover"
          />
        </View>
      </PagerView>
    </View>
  );
}