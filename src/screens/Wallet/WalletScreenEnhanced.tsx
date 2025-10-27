import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "../../components/atomic/Card";
import { ImperialButton } from "../../components/atomic/ImperialButton";
import { QRCodeCard } from "../../components/atomic/QRCodeCard";
import { Skeleton } from "../../components/atomic/Skeleton";
import {
  useLoyaltyBalance,
  useLoyaltyHistory,
  useRedeemReward,
} from "../../hooks/useApi";
import {
  formatCurrency,
  formatDate,
  formatPoints,
} from "../../utils/formatters";

const REDEMPTION_TABLE = [
  { points: 1000, value: 30 },
  { points: 2000, value: 70 },
  { points: 3500, value: 140 },
];

export const WalletScreenEnhanced = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as
    | { initialTab?: "history" | "redeem" }
    | undefined;

  const [activeTab, setActiveTab] = useState<"history" | "redeem">("history");
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [generatedCoupon, setGeneratedCoupon] = useState<any>(null);

  const { data: balance, isLoading: balanceLoading } = useLoyaltyBalance();
  const { data: transactions, isLoading: historyLoading } = useLoyaltyHistory();
  const redeemMutation = useRedeemReward();

  useFocusEffect(
    useCallback(() => {
      const next = params?.initialTab ?? "history";
      setActiveTab(next);
      navigation.setParams?.({} as never);
    }, [params?.initialTab, navigation])
  );

  const handleRedeem = async (points: number, value: number) => {
    try {
      const coupon = await redeemMutation.mutateAsync({
        rewardId: `discount-${points}`,
        points,
      });
      setGeneratedCoupon({ ...coupon, value });
      setShowCouponModal(true);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível gerar o cupom. Tente novamente.");
    }
  };

  if (balanceLoading || historyLoading) {
    return (
      <View className="flex-1 bg-[#F9FAFB] p-4">
        <Skeleton height={100} className="mb-4" />
        <Skeleton height={200} />
      </View>
    );
  }

  if (!balance || !transactions) return null;

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]" edges={["top", "bottom"]}>
      <View className="flex-1 bg-[#F9FAFB]">
        <View className="p-4">
          <Text
            className="text-2xl font-bold text-[#111111] mb-4"
            allowFontScaling
          >
            Carteira
          </Text>

          <Card style={{ marginBottom: 16 }}>
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-[#6B7280] text-sm" allowFontScaling>
                  Pontos Disponíveis
                </Text>
                <Text
                  className="text-3xl font-bold text-[#E10600]"
                  allowFontScaling
                >
                  {formatPoints(balance.points)}
                </Text>
              </View>
              <View>
                <Text className="text-[#6B7280] text-sm" allowFontScaling>
                  Cashback
                </Text>
                <Text
                  className="text-3xl font-bold text-[#22C55E]"
                  allowFontScaling
                >
                  {formatCurrency(balance.cashback)}
                </Text>
              </View>
            </View>
          </Card>

          <View className="flex-row mb-4">
            <TouchableOpacity
              onPress={() => setActiveTab("history")}
              className={`flex-1 py-3 border-b-2 ${
                activeTab === "history"
                  ? "border-[#E10600]"
                  : "border-[#E5E7EB]"
              }`}
            >
              <Text
                className={`text-center font-semibold ${
                  activeTab === "history" ? "text-[#E10600]" : "text-[#6B7280]"
                }`}
                allowFontScaling
              >
                Histórico
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab("redeem")}
              className={`flex-1 py-3 border-b-2 ${
                activeTab === "redeem" ? "border-[#E10600]" : "border-[#E5E7EB]"
              }`}
            >
              <Text
                className={`text-center font-semibold ${
                  activeTab === "redeem" ? "text-[#E10600]" : "text-[#6B7280]"
                }`}
                allowFontScaling
              >
                Resgatar
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {activeTab === "history" ? (
          <ScrollView className="flex-1 px-4">
            {transactions.map((txn: any) => (
              <Card key={txn.id} style={{ marginBottom: 12 }}>
                <View className="flex-row items-start justify-between mb-2">
                  <View className="flex-1">
                    <View className="flex-row items-center mb-1">
                      <MaterialCommunityIcons
                        name={txn.channel === "store" ? "store" : "web"}
                        size={18}
                        color="#6B7280"
                      />
                      <Text
                        className="text-[#6B7280] text-sm ml-1"
                        allowFontScaling
                      >
                        {txn.channel === "store" ? "Loja Física" : "E-commerce"}
                      </Text>
                    </View>
                    <Text
                      className="text-[#111111] font-semibold"
                      allowFontScaling
                    >
                      {txn.pointsRedeemed
                        ? `Resgate de ${formatPoints(
                            txn.pointsRedeemed
                          )} pontos`
                        : `Compra - ${txn.items.length} ${
                            txn.items.length === 1 ? "item" : "itens"
                          }`}
                    </Text>
                    <Text className="text-[#6B7280] text-sm" allowFontScaling>
                      {formatDate(txn.date)}
                    </Text>
                  </View>
                  <View className="items-end">
                    {txn.pointsEarned > 0 && (
                      <Text
                        className="text-[#22C55E] font-bold"
                        allowFontScaling
                      >
                        +{formatPoints(txn.pointsEarned)} pts
                      </Text>
                    )}
                    {txn.pointsRedeemed && (
                      <Text
                        className="text-[#EF4444] font-bold"
                        allowFontScaling
                      >
                        -{formatPoints(txn.pointsRedeemed)} pts
                      </Text>
                    )}
                    {txn.cashbackEarned > 0 && (
                      <Text className="text-[#22C55E] text-sm" allowFontScaling>
                        +{formatCurrency(txn.cashbackEarned)}
                      </Text>
                    )}
                  </View>
                </View>
              </Card>
            ))}
          </ScrollView>
        ) : (
          <ScrollView className="flex-1 px-4 pb-4">
            <Text
              className="text-lg font-bold text-[#111111] mb-3"
              allowFontScaling
            >
              Tabela de Resgate
            </Text>
            <Text className="text-[#6B7280] mb-4" allowFontScaling>
              Troque seus pontos por descontos
            </Text>

            {REDEMPTION_TABLE.map((option, index) => (
              <Card key={index} style={{ marginBottom: 12 }}>
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text
                      className="text-[#E10600] font-bold text-2xl"
                      allowFontScaling
                    >
                      {formatPoints(option.points)} pontos
                    </Text>
                    <Text className="text-[#6B7280] text-sm" allowFontScaling>
                      Válido para compras acima de{" "}
                      {formatCurrency(option.value * 3)}
                    </Text>
                  </View>
                  <View className="items-end">
                    <Text
                      className="text-[#22C55E] font-bold text-2xl"
                      allowFontScaling
                    >
                      {formatCurrency(option.value)}
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleRedeem(option.points, option.value)}
                      className="mt-2 bg-[#E10600] px-4 py-2 rounded-xl"
                      disabled={balance.points < option.points}
                    >
                      <Text
                        className="text-white font-semibold"
                        allowFontScaling
                      >
                        Resgatar
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
            ))}
          </ScrollView>
        )}

        <Modal
          visible={showCouponModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowCouponModal(false)}
        >
          <View className="flex-1 bg-black/50 justify-center items-center p-4">
            <View className="bg-white rounded-2xl p-6 w-full max-w-md">
              <View className="items-end mb-2">
                <TouchableOpacity onPress={() => setShowCouponModal(false)}>
                  <MaterialCommunityIcons
                    name="close"
                    size={24}
                    color="#111111"
                  />
                </TouchableOpacity>
              </View>

              <View className="items-center mb-4">
                <MaterialCommunityIcons
                  name="check-circle"
                  size={64}
                  color="#22C55E"
                />
                <Text
                  className="text-2xl font-bold text-[#111111] mt-3"
                  allowFontScaling
                >
                  Cupom Gerado!
                </Text>
              </View>

              {generatedCoupon && (
                <>
                  <QRCodeCard code={generatedCoupon.code} />

                  <View className="mt-4 bg-[#F9FAFB] p-4 rounded-xl">
                    <Text
                      className="text-[#6B7280] text-sm mb-1"
                      allowFontScaling
                    >
                      Valor do desconto
                    </Text>
                    <Text
                      className="text-[#22C55E] font-bold text-2xl mb-3"
                      allowFontScaling
                    >
                      {formatCurrency(generatedCoupon.value)}
                    </Text>
                    <Text className="text-[#6B7280] text-sm" allowFontScaling>
                      Válido até: {formatDate(generatedCoupon.expiresAt)}
                    </Text>
                  </View>

                  <View className="mt-4">
                    <ImperialButton onPress={() => setShowCouponModal(false)}>
                      Fechar
                    </ImperialButton>
                  </View>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default WalletScreenEnhanced;
