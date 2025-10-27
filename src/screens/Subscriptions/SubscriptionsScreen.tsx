import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "../../components/atomic/Card";
import { ImperialButton } from "../../components/atomic/ImperialButton";
import { Skeleton } from "../../components/atomic/Skeleton";
import { useProducts, useSubscriptions } from "../../hooks/useApi";

export const SubscriptionsScreen = () => {
  const { data: subscriptions, isLoading: subsLoading } = useSubscriptions();
  const { data: products } = useProducts();

  const getProductName = (productId: string) => {
    if (!products) return "Produto";
    const product = products.find((p: any) => p.id === productId);
    return product?.name || "Produto";
  };

  if (subsLoading) {
    return (
      <View className="flex-1 bg-[#F9FAFB] p-4">
        <Skeleton height={200} className="mb-4" />
        <Skeleton height={200} />
      </View>
    );
  }

  if (!subscriptions) return null;

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]" edges={["top", "bottom"]}>
      <ScrollView className="flex-1 bg-[#F9FAFB]">
        <View className="p-4">
          <Text
            className="text-2xl font-bold text-[#111111] mb-2"
            allowFontScaling
          >
            Assinaturas
          </Text>
          <Text className="text-[#6B7280] mb-6" allowFontScaling>
            Receba seus suplementos favoritos automaticamente com desconto e
            mais pontos
          </Text>

          <View className="mb-6">
            <Text
              className="text-lg font-bold text-[#111111] mb-3"
              allowFontScaling
            >
              Suas Assinaturas Ativas
            </Text>

            {subscriptions.map((sub: any) => (
              <Card key={sub.id} style={{ marginBottom: 12 }}>
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-1">
                    <Text
                      className="text-[#111111] font-bold text-lg"
                      allowFontScaling
                    >
                      {sub.name}
                    </Text>
                    <Text
                      className="text-[#6B7280] text-sm mt-1"
                      allowFontScaling
                    >
                      A cada {sub.cycleDays} dias
                    </Text>
                  </View>
                  <View
                    className={`px-3 py-1 rounded-full ${
                      sub.status === "active"
                        ? "bg-[#22C55E]/20"
                        : "bg-[#F59E0B]/20"
                    }`}
                  >
                    <Text
                      className={`text-xs font-semibold ${
                        sub.status === "active"
                          ? "text-[#22C55E]"
                          : "text-[#F59E0B]"
                      }`}
                      allowFontScaling
                    >
                      {sub.status === "active"
                        ? "Ativa"
                        : sub.status === "paused"
                        ? "Pausada"
                        : "Cancelada"}
                    </Text>
                  </View>
                </View>

                <View className="border-t border-[#E5E7EB] pt-3 mb-3">
                  {sub.items.map((item: any, idx: number) => (
                    <View key={idx} className="flex-row items-center mb-2">
                      <MaterialCommunityIcons
                        name="package-variant"
                        size={20}
                        color="#6B7280"
                      />
                      <Text className="ml-2 text-[#6B7280]" allowFontScaling>
                        {item.qty}x {getProductName(item.productId)}
                      </Text>
                    </View>
                  ))}
                </View>

                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-row items-center">
                    <MaterialCommunityIcons
                      name="tag"
                      size={18}
                      color="#22C55E"
                    />
                    <Text
                      className="ml-1 text-[#22C55E] font-semibold"
                      allowFontScaling
                    >
                      {sub.discountPct}% de desconto
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <MaterialCommunityIcons
                      name="star-circle"
                      size={18}
                      color="#E10600"
                    />
                    <Text
                      className="ml-1 text-[#E10600] font-semibold"
                      allowFontScaling
                    >
                      +{sub.pointsBonusPct}% de pontos
                    </Text>
                  </View>
                </View>

                <View className="border-t border-[#E5E7EB] pt-3">
                  <View className="flex-row items-center mb-3">
                    <MaterialCommunityIcons
                      name="calendar"
                      size={18}
                      color="#6B7280"
                    />
                    <Text
                      className="ml-2 text-[#6B7280] text-sm"
                      allowFontScaling
                    >
                      Próximo envio:{" "}
                      {new Date(sub.nextShipmentAt).toLocaleDateString("pt-BR")}
                    </Text>
                  </View>

                  <View className="flex-row gap-2">
                    <TouchableOpacity className="flex-1 bg-[#F3F4F6] py-2 rounded-xl items-center">
                      <Text
                        className="text-[#111111] font-semibold"
                        allowFontScaling
                      >
                        {sub.status === "active" ? "Pausar" : "Retomar"}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 bg-[#F3F4F6] py-2 rounded-xl items-center">
                      <Text
                        className="text-[#111111] font-semibold"
                        allowFontScaling
                      >
                        Editar
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
            ))}
          </View>

          <View className="mb-6">
            <Text
              className="text-lg font-bold text-[#111111] mb-3"
              allowFontScaling
            >
              Criar Nova Assinatura
            </Text>

            <Card>
              <View className="items-center py-6">
                <MaterialCommunityIcons
                  name="plus-circle"
                  size={64}
                  color="#E10600"
                />
                <Text
                  className="text-[#111111] font-bold text-lg mt-3 mb-2"
                  allowFontScaling
                >
                  Monte sua Assinatura
                </Text>
                <Text
                  className="text-[#6B7280] text-center mb-4"
                  allowFontScaling
                >
                  Escolha seus produtos e economize nas próximas compras
                </Text>
                <ImperialButton
                  onPress={() => console.log("Create subscription")}
                >
                  Criar Assinatura
                </ImperialButton>
              </View>
            </Card>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
