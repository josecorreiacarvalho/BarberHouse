import { View, Text, Image, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";

interface ProfessionalProps {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  image: string;
}

const professionalImages = {
  "1": require("../../images/lucas.png"),
  "2": require("../../images/rafael.png"),
  "3": require("../../images/matheus.png"),
  "4": require("../../images/gabriel.png"),
  "5": require("../../images/bruno.png"),
};

export default function Booking() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [professionals, setProfessionals] = useState<ProfessionalProps[]>([]);

  useEffect(() => {
    async function getProfessionals() {
      const response = await fetch("http://192.168.1.132:3000/professionals");

      const data = await response.json();
      setProfessionals(data);
    }

    getProfessionals();
  }, []);

  return (
    <View className="flex-1 bg-neutral-900 px-4 pt-10">
      <Text className="text-white text-2xl font-bold mb-6">
        Escolha seu profissional
      </Text>

      {professionals.map((professional) => (
        <Pressable
          key={professional.id}
          className="bg-neutral-800 rounded-xl p-3 mb-3 flex-row items-center"
          onPress={() =>
            router.push({
              pathname: "/schedule/[id]",
              params: {
                id,
                professionalId: professional.id,
              },
            })
          }
        >
          <Image
            source={
              professionalImages[
                professional.id as keyof typeof professionalImages
              ]
            }
            className="w-16 h-16 rounded-full"
            resizeMode="cover"
          />

          <View className="ml-4 flex-1">
            <Text className="text-white text-lg font-semibold">
              {professional.name}
            </Text>

            <Text className="text-gray-400 text-sm mt-1">
              {professional.specialty}
            </Text>

            <Text className="text-[#D4A24C] text-sm mt-1">
              ⭐ {professional.rating}
            </Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}
