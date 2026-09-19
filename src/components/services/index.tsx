import { FlatList, Text } from "react-native";
import { useEffect, useState } from "react";
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
     const response = await fetch("http://192.168.1.132:3000/services");
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