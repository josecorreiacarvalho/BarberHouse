import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";

const dates = [
  { id: "1", day: "SEG", number: "21" },
  { id: "2", day: "TER", number: "22" },
  { id: "3", day: "QUA", number: "23" },
  { id: "4", day: "QUI", number: "24" },
  { id: "5", day: "SEX", number: "25" },
];
const times = [
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export default function Schedule() {
  const { id, professionalId } = useLocalSearchParams<{
    id: string;
    professionalId: string;
  }>();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  return (
    <View className="flex-1 bg-neutral-900 px-4 pt-10">
      <Text className="text-white text-2xl font-bold">
        Escolha a data e o horário
      </Text>

      <Text className="text-gray-400 mt-2 mb-6">
        Selecione o melhor dia para você
      </Text>

      <View className="flex-row justify-between">
        {dates.map((date) => (
          <Pressable
            key={date.id}
            onPress={() => setSelectedDate(`${date.day}, ${date.number}`)}
            className={`w-16 py-4 rounded-xl items-center ${
              selectedDate === date.id ? "bg-[#D4A24C]" : "bg-neutral-800"
            }`}
          >
            <Text
              className={
                selectedDate === `${date.day}, ${date.number}`
                  ? "text-neutral-900 font-semibold"
                  : "text-gray-400"
              }
            >
              {date.day}
            </Text>

            <Text
              className={`text-xl font-bold mt-1 ${
                selectedDate === date.id ? "text-neutral-900" : "text-white"
              }`}
            >
              {date.number}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text className="text-white text-xl font-bold mt-8 mb-4">
        Horários disponíveis
      </Text>

      <View className="flex-row flex-wrap gap-3">
        {times.map((time) => (
          <Pressable
            key={time}
            onPress={() => setSelectedTime(time)}
            className={`w-[22%] py-3 rounded-xl items-center ${
              selectedTime === time ? "bg-[#D4A24C]" : "bg-neutral-800"
            }`}
          >
            <Text
              className={
                selectedTime === time
                  ? "text-neutral-900 font-bold"
                  : "text-white"
              }
            >
              {time}
            </Text>
          </Pressable>
        ))}
      </View>
      <Pressable
        disabled={!selectedDate || !selectedTime}
        className={`w-full py-4 rounded-xl mt-8 items-center ${
          selectedDate && selectedTime ? "bg-[#D4A24C]" : "bg-neutral-700"
        }`}
        onPress={() =>
          router.push({
            pathname: "/confirm/[id]",
            params: {
              id,
              professionalId,
              date: selectedDate,
              time: selectedTime,
            },
          })
        }
      >
        <Text
          className={`text-base font-bold ${
            selectedDate && selectedTime ? "text-neutral-900" : "text-gray-400"
          }`}
        >
          CONTINUAR
        </Text>
      </Pressable>
    </View>
  );
}
