import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "../../components/atomic/Card";
import { ImperialButton } from "../../components/atomic/ImperialButton";
import { Skeleton } from "../../components/atomic/Skeleton";
import { useProducts } from "../../hooks/useApi";
import { formatCurrency } from "../../utils/formatters";

interface SubscriptionItem {
  productId: string;
  qty: number;
}

const CYCLE_OPTIONS = [
  { days: 30, label: "30 dias", discount: 10, pointsBonus: 20 },
  { days: 45, label: "45 dias", discount: 12, pointsBonus: 22 },
  { days: 60, label: "60 dias", discount: 15, pointsBonus: 25 },
];

export const CreateSubscriptionScreen = () => {
  const navigation = useNavigation();
  const { data: products, isLoading } = useProducts();
  const [selectedItems, setSelectedItems] = useState<SubscriptionItem[]>([]);
  const [cycleDays, setCycleDays] = useState(30);
  const [subscriptionName, setSubscriptionName] = useState("");

  const selectedCycle = CYCLE_OPTIONS.find((c) => c.days === cycleDays);

  const handleToggleProduct = (productId: string) => {
    const existingItem = selectedItems.find(
      (item) => item.productId === productId
    );

    if (existingItem) {
      setSelectedItems(
        selectedItems.filter((item) => item.productId !== productId)
      );
    } else {
      setSelectedItems([...selectedItems, { productId, qty: 1 }]);
    }
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setSelectedItems(
      selectedItems.map((item) => {
        if (item.productId === productId) {
          const newQty = Math.max(1, item.qty + delta);
          return { ...item, qty: newQty };
        }
        return item;
      })
    );
  };

  const calculateTotal = () => {
    if (!products) return 0;

    return selectedItems.reduce((total, item) => {
      const product = products.find((p: any) => p.id === item.productId);
      if (product) {
        return total + product.price * item.qty;
      }
      return total;
    }, 0);
  };

  const handleCreateSubscription = () => {
    if (selectedItems.length === 0) {
      Alert.alert("Atenção", "Selecione pelo menos um produto para continuar.");
      return;
    }

    if (!subscriptionName.trim()) {
      Alert.alert("Atenção", "Digite um nome para sua assinatura.");
      return;
    }

    const total = calculateTotal();
    const discount = selectedCycle?.discount || 0;
    const finalPrice = total * (1 - discount / 100);

    Alert.alert(
      "Assinatura Criada!",
      `${subscriptionName}\n\nTotal: ${formatCurrency(
        total
      )}\nDesconto ${discount}%: ${formatCurrency(
        finalPrice
      )}\n\nSua assinatura foi criada com sucesso!`,
      [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-[#F9FAFB] p-4">
        <Skeleton height={200} className="mb-4" />
        <Skeleton height={300} />
      </View>
    );
  }

  if (!products) return null;

  const total = calculateTotal();
  const discount = selectedCycle?.discount || 0;
  const finalPrice = total * (1 - discount / 100);

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]" edges={["bottom"]}>
      <ScrollView className="flex-1 p-4">
        <Text
          className="text-2xl font-bold text-[#111111] mb-2"
          allowFontScaling
        >
          Criar Assinatura
        </Text>
        <Text className="text-[#6B7280] mb-6" allowFontScaling>
          Monte sua assinatura personalizada e economize nas próximas compras
        </Text>

        <Card style={{ marginBottom: 16 }}>
          <Text className="text-[#111111] font-bold mb-3" allowFontScaling>
            Nome da Assinatura
          </Text>
          <TextInput
            className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-3 text-[#111111]"
            placeholder="Ex: Kit Ganho de Massa"
            value={subscriptionName}
            onChangeText={setSubscriptionName}
            placeholderTextColor="#9CA3AF"
          />
        </Card>

        <View className="mb-4">
          <Text
            className="text-lg font-bold text-[#111111] mb-3"
            allowFontScaling
          >
            Periodicidade
          </Text>
          <View className="flex-row gap-2">
            {CYCLE_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.days}
                onPress={() => setCycleDays(option.days)}
                className="flex-1"
              >
                <Card
                  style={{
                    borderWidth: 2,
                    borderColor:
                      cycleDays === option.days ? "#E10600" : "transparent",
                  }}
                >
                  <Text
                    className={`text-center font-bold ${
                      cycleDays === option.days
                        ? "text-[#E10600]"
                        : "text-[#111111]"
                    }`}
                    allowFontScaling
                  >
                    {option.label}
                  </Text>
                  <Text
                    className="text-[#6B7280] text-xs text-center mt-1"
                    allowFontScaling
                  >
                    {option.discount}% OFF
                  </Text>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="mb-4">
          <Text
            className="text-lg font-bold text-[#111111] mb-3"
            allowFontScaling
          >
            Selecione os Produtos
          </Text>

          {products.map((product: any) => {
            const selectedItem = selectedItems.find(
              (item) => item.productId === product.id
            );
            const isSelected = !!selectedItem;

            return (
              <Card
                key={product.id}
                style={{
                  marginBottom: 12,
                  borderWidth: 2,
                  borderColor: isSelected ? "#E10600" : "transparent",
                }}
              >
                <TouchableOpacity
                  onPress={() => handleToggleProduct(product.id)}
                >
                  <View className="flex-row items-start justify-between">
                    <View className="flex-1 mr-3">
                      <Text
                        className="text-[#111111] font-bold"
                        allowFontScaling
                      >
                        {product.name}
                      </Text>
                      <Text className="text-[#6B7280] text-sm" allowFontScaling>
                        {product.brand}
                      </Text>
                      <Text
                        className="text-[#E10600] font-bold mt-1"
                        allowFontScaling
                      >
                        {formatCurrency(product.price)}
                      </Text>
                    </View>
                    <View
                      className={`w-6 h-6 rounded-full items-center justify-center ${
                        isSelected
                          ? "bg-[#E10600]"
                          : "border-2 border-[#E5E7EB]"
                      }`}
                    >
                      {isSelected && (
                        <MaterialCommunityIcons
                          name="check"
                          size={16}
                          color="#FFFFFF"
                        />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>

                {isSelected && selectedItem && (
                  <View className="mt-3 pt-3 border-t border-[#E5E7EB]">
                    <View className="flex-row items-center justify-between">
                      <Text
                        className="text-[#6B7280] font-semibold"
                        allowFontScaling
                      >
                        Quantidade
                      </Text>
                      <View className="flex-row items-center gap-3">
                        <TouchableOpacity
                          onPress={() => handleUpdateQuantity(product.id, -1)}
                          className="w-8 h-8 bg-[#E5E7EB] rounded-full items-center justify-center"
                        >
                          <MaterialCommunityIcons
                            name="minus"
                            size={18}
                            color="#111111"
                          />
                        </TouchableOpacity>
                        <Text
                          className="text-[#111111] font-bold text-lg"
                          allowFontScaling
                        >
                          {selectedItem.qty}
                        </Text>
                        <TouchableOpacity
                          onPress={() => handleUpdateQuantity(product.id, 1)}
                          className="w-8 h-8 bg-[#E10600] rounded-full items-center justify-center"
                        >
                          <MaterialCommunityIcons
                            name="plus"
                            size={18}
                            color="#FFFFFF"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              </Card>
            );
          })}
        </View>

        {selectedItems.length > 0 && (
          <Card style={{ marginBottom: 16 }}>
            <Text
              className="text-lg font-bold text-[#111111] mb-3"
              allowFontScaling
            >
              Resumo da Assinatura
            </Text>

            <View className="border-b border-[#E5E7EB] pb-3 mb-3">
              {selectedItems.map((item) => {
                const product = products.find(
                  (p: any) => p.id === item.productId
                );
                if (!product) return null;

                return (
                  <View
                    key={item.productId}
                    className="flex-row items-center justify-between mb-2"
                  >
                    <Text className="text-[#6B7280]" allowFontScaling>
                      {item.qty}x {product.name}
                    </Text>
                    <Text
                      className="text-[#111111] font-semibold"
                      allowFontScaling
                    >
                      {formatCurrency(product.price * item.qty)}
                    </Text>
                  </View>
                );
              })}
            </View>

            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-[#6B7280]" allowFontScaling>
                Subtotal
              </Text>
              <Text className="text-[#111111] font-semibold" allowFontScaling>
                {formatCurrency(total)}
              </Text>
            </View>

            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-[#22C55E]" allowFontScaling>
                Desconto ({discount}%)
              </Text>
              <Text className="text-[#22C55E] font-semibold" allowFontScaling>
                -{formatCurrency(total * (discount / 100))}
              </Text>
            </View>

            <View className="border-t border-[#E5E7EB] pt-3 mt-2">
              <View className="flex-row items-center justify-between mb-3">
                <Text
                  className="text-[#111111] font-bold text-lg"
                  allowFontScaling
                >
                  Total
                </Text>
                <Text
                  className="text-[#E10600] font-bold text-2xl"
                  allowFontScaling
                >
                  {formatCurrency(finalPrice)}
                </Text>
              </View>

              <View className="bg-[#F9FAFB] p-3 rounded-xl">
                <View className="flex-row items-center mb-2">
                  <MaterialCommunityIcons
                    name="star-circle"
                    size={20}
                    color="#E10600"
                  />
                  <Text
                    className="ml-2 text-[#E10600] font-semibold"
                    allowFontScaling
                  >
                    +{selectedCycle?.pointsBonus}% de pontos em cada compra
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <MaterialCommunityIcons
                    name="refresh"
                    size={20}
                    color="#6B7280"
                  />
                  <Text
                    className="ml-2 text-[#6B7280] text-sm"
                    allowFontScaling
                  >
                    Entrega automática a cada {cycleDays} dias
                  </Text>
                </View>
              </View>
            </View>
          </Card>
        )}

        <View className="flex-row gap-3 mb-4">
          <View className="flex-1">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="bg-[#E5E7EB] py-4 rounded-xl items-center"
            >
              <Text className="text-[#111111] font-bold" allowFontScaling>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-1">
            <ImperialButton
              onPress={handleCreateSubscription}
              disabled={selectedItems.length === 0}
            >
              Criar Assinatura
            </ImperialButton>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

