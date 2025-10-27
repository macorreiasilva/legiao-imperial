import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "../../components/atomic/Card";

const FAQ_ITEMS = [
  {
    question: "Como ganho pontos?",
    answer:
      "Você ganha pontos a cada compra realizada em nossas lojas físicas ou e-commerce. O valor varia conforme o produto e seu nível na Legião Imperial.",
  },
  {
    question: "Como resgato meus pontos?",
    answer:
      "Acesse a aba Carteira, escolha o valor de resgate e gere seu cupom/QR para usar na loja ou e-commerce.",
  },
  {
    question: "O que são os níveis da Legião Imperial?",
    answer:
      "Bronze, Prata, Ouro e Elite são níveis de fidelidade. Quanto mais você compra, mais sobe de nível e desbloqueia benefícios exclusivos.",
  },
  {
    question: "Meus pontos expiram?",
    answer:
      "Sim, os pontos têm validade de 12 meses a partir da data de acúmulo. Você receberá avisos 30 e 7 dias antes do vencimento.",
  },
];

const STORES = [
  {
    name: "Imperial Suplementos - Vila Mariana",
    address: "Rua Domingos de Morais, 1234",
    phone: "(11) 3456-7890",
    hours: "Seg-Sex: 8h-20h | Sáb: 9h-18h",
  },
  {
    name: "Imperial Suplementos - Paulista",
    address: "Av. Paulista, 5678",
    phone: "(11) 3456-7891",
    hours: "Seg-Sex: 8h-20h | Sáb: 9h-18h",
  },
];

export const SupportScreen = () => {
  const handleWhatsApp = () => {
    Linking.openURL(
      "https://wa.me/5511999887766?text=Olá,%20preciso%20de%20ajuda"
    );
  };

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone.replace(/\D/g, "")}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]" edges={["top", "bottom"]}>
      <ScrollView className="flex-1 bg-[#F9FAFB]">
        <View className="p-4">
          <Text
            className="text-2xl font-bold text-[#111111] mb-2"
            allowFontScaling
          >
            Suporte
          </Text>
          <Text className="text-[#6B7280] mb-6" allowFontScaling>
            Estamos aqui para ajudar você
          </Text>

          <Card style={{ marginBottom: 16 }}>
            <TouchableOpacity
              onPress={handleWhatsApp}
              className="flex-row items-center py-3"
            >
              <View className="bg-[#25D366] w-12 h-12 rounded-full items-center justify-center">
                <MaterialCommunityIcons
                  name="whatsapp"
                  size={28}
                  color="#FFFFFF"
                />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-[#111111] font-bold" allowFontScaling>
                  Fale pelo WhatsApp
                </Text>
                <Text className="text-[#6B7280] text-sm" allowFontScaling>
                  Atendimento de Seg-Sex, 9h-18h
                </Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </Card>

          <View className="mb-6">
            <Text
              className="text-xl font-bold text-[#111111] mb-3"
              allowFontScaling
            >
              Perguntas Frequentes
            </Text>

            {FAQ_ITEMS.map((item, index) => (
              <Card key={index} style={{ marginBottom: 12 }}>
                <Text
                  className="text-[#111111] font-bold mb-2"
                  allowFontScaling
                >
                  {item.question}
                </Text>
                <Text className="text-[#6B7280]" allowFontScaling>
                  {item.answer}
                </Text>
              </Card>
            ))}
          </View>

          <View className="mb-6">
            <Text
              className="text-xl font-bold text-[#111111] mb-3"
              allowFontScaling
            >
              Nossas Lojas
            </Text>

            {STORES.map((store, index) => (
              <Card key={index} style={{ marginBottom: 12 }}>
                <View className="flex-row items-start mb-2">
                  <MaterialCommunityIcons
                    name="store"
                    size={24}
                    color="#E10600"
                  />
                  <View className="ml-3 flex-1">
                    <Text className="text-[#111111] font-bold" allowFontScaling>
                      {store.name}
                    </Text>
                    <Text
                      className="text-[#6B7280] text-sm mt-1"
                      allowFontScaling
                    >
                      {store.address}
                    </Text>
                    <View className="flex-row items-center mt-2">
                      <MaterialCommunityIcons
                        name="clock"
                        size={16}
                        color="#6B7280"
                      />
                      <Text
                        className="text-[#6B7280] text-sm ml-1"
                        allowFontScaling
                      >
                        {store.hours}
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => handleCall(store.phone)}
                  className="flex-row items-center mt-3 pt-3 border-t border-[#E5E7EB]"
                >
                  <MaterialCommunityIcons
                    name="phone"
                    size={20}
                    color="#E10600"
                  />
                  <Text
                    className="text-[#E10600] font-semibold ml-2"
                    allowFontScaling
                  >
                    {store.phone}
                  </Text>
                </TouchableOpacity>
              </Card>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
