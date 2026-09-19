import { View, Text, Pressable, Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

interface ServiceProps {
  id: string;
  name: string;
  price: number;
}

interface ProfessionalProps {
  id: string;
  name: string;
}

export default function Confirm() {
  const { id, professionalId, date, time } = useLocalSearchParams();

  const [service, setService] = useState<ServiceProps | null>(null);
  const [professional, setProfessional] = useState<ProfessionalProps | null>(
    null,
  );

  useEffect(() => {
    async function getData() {
      const serviceResponse = await fetch(
        `http://192.168.1.132:3000/services/${id}`,
      );

      const professionalResponse = await fetch(
        `http://192.168.1.132:3000/professionals/${professionalId}`,
      );

      const serviceData = await serviceResponse.json();
      const professionalData = await professionalResponse.json();

      setService(serviceData);
      setProfessional(professionalData);
    }

    getData();
  }, [id, professionalId]);

  async function handleConfirmAppointment() {
    try {
      console.log("CLICOU NO BOTÃO");

      const response = await fetch("http://192.168.1.132:3000/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId: service?.id,
          serviceName: service?.name,
          professionalId: professional?.id,
          professionalName: professional?.name,
          date,
          time,
          price: service?.price,
        }),
      });

      console.log("STATUS:", response.status);

      const data = await response.json();

      console.log("RESPOSTA:", data);
    Alert.alert(
  "Agendamento confirmado!",
  "Seu horário foi agendado com sucesso.",
  [
    {
      text: "OK",
    onPress: () => router.replace("/agendamentos"),
    },
  ]
);
    } catch (error) {
      console.log("ERRO AO SALVAR:", error);
    }
  }

  if (!service || !professional) {
    return (
      <View className="flex-1 bg-neutral-900 items-center justify-center">
        <Text className="text-white">Carregando...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-neutral-900 px-4 pt-10">
      <Text className="text-white text-2xl font-bold">
        Confirmar agendamento
      </Text>

      <Text className="text-gray-400 mt-2 mb-8">
        Confira os dados antes de confirmar seu horário.
      </Text>

      <View className="bg-neutral-800 rounded-2xl p-5">
        <Text className="text-gray-400 text-sm">Serviço</Text>

        <Text className="text-white text-lg font-semibold mt-1">
          {service.name}
        </Text>

        <View className="h-[1px] bg-neutral-700 my-4" />

        <Text className="text-gray-400 text-sm">Profissional</Text>

        <Text className="text-white text-lg font-semibold mt-1">
          {professional.name}
        </Text>

        <View className="h-[1px] bg-neutral-700 my-4" />

        <Text className="text-gray-400 text-sm">Data</Text>

        <Text className="text-white text-lg font-semibold mt-1">{date}</Text>

        <View className="h-[1px] bg-neutral-700 my-4" />

        <Text className="text-gray-400 text-sm">Horário</Text>

        <Text className="text-[#D4A24C] text-lg font-bold mt-1">{time}</Text>

        <View className="h-[1px] bg-neutral-700 my-4" />

        <Text className="text-gray-400 text-sm">Valor</Text>

        <Text className="text-[#D4A24C] text-lg font-bold mt-1">
          R$ {service.price}
        </Text>
      </View>
      <Pressable
        className="bg-[#D4A24C] w-full py-4 rounded-xl mt-6 items-center"
        onPress={handleConfirmAppointment}
      >
        <Text className="text-neutral-900 text-base font-bold">
          CONFIRMAR AGENDAMENTO
        </Text>
      </Pressable>
    </View>
  );
}
