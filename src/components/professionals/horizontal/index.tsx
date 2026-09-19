import { Pressable, Text, Image } from "react-native";
import { ProfessionalProps } from "@/components/professionals";

const professionalImages = {
  "1": require("../../../images/lucas.png"),
  "2": require("../../../images/rafael.png"),
  "3": require("../../../images/matheus.png"),
  "4": require("../../../images/gabriel.png"),
  "5": require("../../../images/bruno.png"),
  
};

export function ProfessionalItem({ item }: { item: ProfessionalProps }) {
  return (
    <Pressable className="flex flex-col items-center justify-center">
      <Image
        source={professionalImages[item.id as keyof typeof professionalImages]}
        className="w-24 h-24 rounded-full"
        resizeMode="cover"
      />

      <Text
        className="text-sm mt-2 w-24 text-center leading-4 text-white"
        numberOfLines={2}
      >
        {item.name}
      </Text>
    </Pressable>
  );
}
