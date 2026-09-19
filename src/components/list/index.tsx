import { View } from "react-native";
import { useEffect, useState } from "react";
import { ServiceListItem } from "./item";

export interface ServiceListProps {
  id: string;
  name: string;
  price: number;
  description: string;
  rating: number;
  image: string;
}

export function ServiceVerticalList() {
  const [services, setServices] = useState<ServiceListProps[]>([]);

  useEffect(() => {
    async function getServices() {
      const response = await fetch(
        "http://192.168.1.132:3000/services"
      );

      const data = await response.json();
      setServices(data);
    }

    getServices();
  }, []);

  return (
    <View className="px-4 flex-1 w-full h-full mb-11 gap-4">
      {services.map((item) => (
        <ServiceListItem item={item} key={item.id} />
      ))}
    </View>
  );
}