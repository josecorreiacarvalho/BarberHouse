import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

interface ServiceProps {
  id: string;
  name: string;
  price: number;
  description: string;
  rating: number;
  image: string;
}

const serviceImages = {
  "1": require("../../images/corte-masculino.png"),
  "2": require("../../images/barba.png"),
  "3": require("../../images/corte-barba.png"),
  "4": require("../../images/degrade.png"),
  "5": require("../../images/corte-infantil.png"),
  "6": require("../../images/limpeza-pele.png"),
};

export default function ServiceDetails() {
  const { id } = useLocalSearchParams();

  const [service, setService] = useState<ServiceProps | null>(null);

  useEffect(() => {
    async function getService() {
      const response = await fetch(
        `https://barberhouse-hsdm.onrender.com/services/${id}`,
      );

      const data = await response.json();
      setService(data);
    }

    getService();
  }, [id]);

  if (!service) {
    return (
      <View className="flex-1 bg-neutral-900 items-center justify-center">
        <Text className="text-white">Carregando...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-neutral-900 items-center justify-center">
      <Image
        source={serviceImages[service.id as keyof typeof serviceImages]}
        className="w-80 h-64 rounded-2xl mb-6"
        resizeMode="cover"
      />

      <Text className="text-white text-2xl font-bold">{service.name}</Text>

      <Text className="text-[#D4A24C] text-xl font-semibold mt-2">
        R$ {service.price}
      </Text>
      <Text className="text-yellow-400 text-base mt-3">
        ⭐ {service.rating}
      </Text>

      <Text className="text-gray-300 text-base text-center mt-4 px-8">
        {service.description}
      </Text>
      <Pressable
        className="bg-[#D4A24C] w-80 py-4 rounded-xl mt-8 items-center"
        onPress={() =>
          router.push({
            pathname: "/booking/[id]",
            params: { id: service.id },
          })
        }
      >
        <Text className="text-neutral-900 text-base font-bold">
          AGENDAR HORÁRIO
        </Text>
      </Pressable>
    </View>
  );
}
