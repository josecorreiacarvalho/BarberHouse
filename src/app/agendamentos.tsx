import { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, Alert } from "react-native";
import { router } from "expo-router";

interface AppointmentProps {
  id: string;
  serviceName: string;
  professionalName: string;
  date: string;
  time: string;
  price: number;
}

export default function Appointments() {
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);

  useEffect(() => {
    async function getAppointments() {
      const response = await fetch("http://192.168.1.132:3000/appointments");

      const data = await response.json();

      setAppointments(data);
    }

    getAppointments();
  }, []);
  async function handleCancelAppointment(id: string) {
    Alert.alert(
      "Cancelar agendamento",
      "Deseja realmente cancelar este agendamento?",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim",
          style: "destructive",
          onPress: async () => {
            await fetch(`http://192.168.1.132:3000/appointments/${id}`, {
              method: "DELETE",
            });

            setAppointments((oldAppointments) =>
              oldAppointments.filter((appointment) => appointment.id !== id),
            );
          },
        },
      ],
    );
  }

  return (
    <View className="flex-1 bg-neutral-900 px-4 pt-10">
      <Text className="text-white text-2xl font-bold">Meus agendamentos</Text>

      <Text className="text-gray-400 mt-2 mb-6">
        Acompanhe seus horários agendados.
      </Text>

      <Pressable onPress={() => router.replace("/")} className="mb-6">
        <Text className="text-[#D4A24C] font-semibold">← Voltar para Home</Text>
      </Pressable>

      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text className="text-gray-400 text-center mt-10">
            Você ainda não possui agendamentos.
          </Text>
        }
        renderItem={({ item }) => (
          <View className="bg-neutral-800 rounded-2xl p-5 mb-4">
            <Text className="text-white text-lg font-bold">
              {item.serviceName}
            </Text>

            <Text className="text-gray-400 mt-2">
              Profissional: {item.professionalName}
            </Text>

            <Text className="text-gray-400 mt-1">Data: {item.date}</Text>

            <Text className="text-gray-400 mt-1">Horário: {item.time}</Text>

            <Text className="text-[#D4A24C] text-lg font-bold mt-3">
              R$ {item.price}
            </Text>
            <Pressable
              onPress={() => handleCancelAppointment(item.id)}
              className="border border-red-500 py-3 rounded-xl mt-4 items-center"
            >
              <Text className="text-red-500 font-semibold">
                CANCELAR AGENDAMENTO
              </Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}
