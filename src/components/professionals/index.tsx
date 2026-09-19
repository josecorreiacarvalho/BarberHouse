import { FlatList } from "react-native";
import { useEffect, useState } from "react";
import { ProfessionalItem } from "./horizontal";

export interface ProfessionalProps {
  id: string;
  name: string;
  image: string;
}

export function Professionals() {
  const [professionals, setProfessionals] = useState<ProfessionalProps[]>([]);

  useEffect(() => {
    async function getProfessionals() {
      const response = await fetch(
        "http://192.168.1.132:3000/professionals"
      );

      const data = await response.json();
      setProfessionals(data);
    }

    getProfessionals();
  }, []);

  return (
    <FlatList
      data={professionals}
      renderItem={({ item }) => <ProfessionalItem item={item} />}
      horizontal
      contentContainerStyle={{
        gap: 14,
        paddingLeft: 16,
        paddingRight: 16,
      }}
      showsHorizontalScrollIndicator={false}
    />
  );
}