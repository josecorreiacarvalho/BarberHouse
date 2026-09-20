import { View, ScrollView, Pressable, Text } from "react-native";
import { Header } from "../components/header";
import Constants from "expo-constants";
import { Banner } from "@/components/banner";
import { Search } from "@/components/search";
import { Section } from "@/components/section";
import { Services } from "@/components/services";
import { Professionals } from "@/components/professionals";
import { router } from "expo-router";

const statusBarHeight = Constants.statusBarHeight;

export default function Index() {
  return (
    <ScrollView
      style={{ flex: 1 }}
      className="bg-neutral-900"
      showsVerticalScrollIndicator={false}
    >
      <View className="w-full px-4" style={{ marginTop: statusBarHeight + 8 }}>
        <Header />
        <Pressable
          onPress={() => router.push("/agendamentos")}
          className="bg-neutral-800 py-3 px-4 rounded-xl mb-4"
        >
          <Text className="text-[#D4A24C] font-semibold text-center">
            MEUS AGENDAMENTOS
          </Text>
        </Pressable>

        <Banner />

        <Search />
      </View>

      <Section
        name="Serviços em destaque"
        label="Veja mais"
        action={() => console.log("CLICOU NO VEJA MAIS")}
        size="text-2xl"
      />

      <Services />

      <Section
        name="Profissionais"
        label="Ver todos"
        action={() => console.log("CLICOU")}
        size="text-xl"
      />

      <Professionals />
    </ScrollView>
  );
}

