import { useEffect, useState } from "react";
import { FlatList } from "react-native";
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
        "https://barberhouse-hsdm.onrender.com/professionals",
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

