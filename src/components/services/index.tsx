import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { ServiceCard } from "./service";

interface ServiceProps {
  id: string;
  name: string;
  price: number;
  description: string;
  rating: number;
  image: string;
}

export function Services() {
  const [services, setServices] = useState<ServiceProps[]>([]);

  useEffect(() => {
    async function getServices() {
      const response = await fetch(
        "https://barberhouse-hsdm.onrender.com/services",
      );
      const data = await response.json();

      setServices(data);
    }

    getServices();
  }, []);

  return (
    <FlatList
      data={services}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => <ServiceCard service={item} />}
    />
  );
}

