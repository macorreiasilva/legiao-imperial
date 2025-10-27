import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "../../components/atomic/Card";
import { Skeleton } from "../../components/atomic/Skeleton";
import { PointsHeader } from "../../components/composite/PointsHeader";
import { useLoyaltyBalance, useUser } from "../../hooks/useApi";
import { formatCurrency, getDaysUntil } from "../../utils/formatters";

export const HomeScreen = () => {
  const navigation = useNavigation();
  const { data: user, isLoading: userLoading } = useUser();
  const { data: balance, isLoading: balanceLoading } = useLoyaltyBalance();

  if (userLoading || balanceLoading) {
    return (
      <View className="flex-1 bg-[#F9FAFB] p-4">
        <Skeleton height={150} className="mb-4" />
        <Skeleton height={100} className="mb-4" />
        <Skeleton height={200} />
      </View>
    );
  }

  if (!user || !balance) return null;

  const expiringLots = balance.expiringLots.filter(
    (lot) => getDaysUntil(lot.expiresAt) <= 30
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]" edges={["top", "bottom"]}>
      <ScrollView className="flex-1 bg-[#F9FAFB]">
        <View className="p-4">
          <PointsHeader
            points={user.tierPoints}
            nextTierAt={user.nextTierAt}
            tier={user.tier as any}
            userName={user.name}
          />

          {expiringLots.length > 0 && (
            <View className="bg-[#FFF3CD] border border-[#F59E0B] p-4 rounded-xl mt-4 flex-row items-center">
              <MaterialCommunityIcons
                name="alert-circle"
                size={24}
                color="#F59E0B"
              />
              <View className="ml-3 flex-1">
                <Text className="text-[#111111] font-semibold" allowFontScaling>
                  Pontos expirando!
                </Text>
                <Text className="text-[#6B7280] text-sm" allowFontScaling>
                  {expiringLots[0].points} pts em{" "}
                  {getDaysUntil(expiringLots[0].expiresAt)} dias
                </Text>
              </View>
            </View>
          )}

          <View className="mt-6">
            <Text
              className="text-xl font-bold text-[#111111] mb-3"
              allowFontScaling
            >
              Seu Saldo
            </Text>

            <Card>
              <View className="flex-row justify-between items-center mb-4">
                <View>
                  <Text className="text-[#6B7280] text-sm" allowFontScaling>
                    Pontos
                  </Text>
                  <Text
                    className="text-2xl font-bold text-[#E10600]"
                    allowFontScaling
                  >
                    {balance.points}
                  </Text>
                </View>
                <View>
                  <Text className="text-[#6B7280] text-sm" allowFontScaling>
                    Cashback
                  </Text>
                  <Text
                    className="text-2xl font-bold text-[#22C55E]"
                    allowFontScaling
                  >
                    {formatCurrency(balance.cashback)}
                  </Text>
                </View>
              </View>

              <TouchableOpacity className="bg-[#E10600] py-3 rounded-xl items-center">
                <Text className="text-white font-bold" allowFontScaling>
                  Resgatar Agora
                </Text>
              </TouchableOpacity>
            </Card>
          </View>

          <View className="mt-6">
            <Text
              className="text-xl font-bold text-[#111111] mb-3"
              allowFontScaling
            >
              Ações Rápidas
            </Text>

            <View className="flex-row gap-3">
              <TouchableOpacity
                className="flex-1"
                onPress={() => navigation.navigate("Wallet" as never)}
              >
                <Card>
                  <MaterialCommunityIcons
                    name="qrcode"
                    size={32}
                    color="#E10600"
                  />
                  <Text
                    className="text-[#111111] font-semibold mt-2"
                    allowFontScaling
                  >
                    Meu QR
                  </Text>
                </Card>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1"
                onPress={() =>
                  navigation.getParent()?.navigate("Referrals" as never)
                }
              >
                <Card>
                  <MaterialCommunityIcons
                    name="account-multiple"
                    size={32}
                    color="#E10600"
                  />
                  <Text
                    className="text-[#111111] font-semibold mt-2"
                    allowFontScaling
                  >
                    Indique
                  </Text>
                </Card>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1"
                onPress={() =>
                  navigation.getParent()?.navigate("Subscriptions" as never)
                }
              >
                <Card>
                  <MaterialCommunityIcons
                    name="refresh"
                    size={32}
                    color="#E10600"
                  />
                  <Text
                    className="text-[#111111] font-semibold mt-2"
                    allowFontScaling
                  >
                    Assinaturas
                  </Text>
                </Card>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
