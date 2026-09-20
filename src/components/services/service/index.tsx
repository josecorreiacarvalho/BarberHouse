import { View, Text, Pressable, Image } from "react-native";
import { router } from "expo-router";

const serviceImages = {
  "1": require("../../../images/corte-masculino.png"),
  "2": require("../../../images/barba.png"),
  "3": require("../../../images/corte-barba.png"),
  "4": require("../../../images/degrade.png"),
  "5": require("../../../images/corte-infantil.png"),
  "6": require("../../../images/limpeza-pele.png"),
};

interface ServiceProps {
  service: {
    id: string;
    name: string;
    price: number;
    description: string;
    rating: number;
    image: string;
  };
}

export function ServiceCard({ service }: ServiceProps) {
  return (
    <Pressable
      className="mr-4"
      onPress={() =>
        router.push({
          pathname: "/service/[id]",
          params: { id: service.id },
        })
      }
    >
      <View className="w-40 bg-neutral-800 rounded-xl p-2">
        <Image
          source={serviceImages[service.id as keyof typeof serviceImages]}
          className="w-full h-32 rounded-xl"
          resizeMode="cover"
        />

        <Text className="text-white font-semibold text-base mt-2">
          {service.name}
        </Text>

        <Text className="text-[#D4A24C] font-semibold mt-1">
          R$ {service.price}
        </Text>
      </View>
    </Pressable>
  );
}

