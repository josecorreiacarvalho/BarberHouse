import { View, Pressable, Text, Image } from "react-native";
import { ServiceListProps } from "@/components/list";

const serviceImages = {
  "1": require("../../../images/corte-masculino.png"),
  "2": require("../../../images/barba.png"),
  "3": require("../../../images/corte-barba.png"),
  "4": require("../../../images/degrade.png"),
  "5": require("../../../images/corte-infantil.png"),
  "6": require("../../../images/limpeza-pele.png"),
};

export function ServiceListItem({
  item,
}: {
  item: ServiceListProps;
}) {
  return (
    <Pressable className="flex flex-row items-center justify-start gap-2">
      <Image
        source={serviceImages[item.id as keyof typeof serviceImages]}
        className="w-20 h-20 rounded-full"
        resizeMode="cover"
      />

      <View>
        <Text className="text-white">{item.name}</Text>
      </View>
    </Pressable>
  );
}