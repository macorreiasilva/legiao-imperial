import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, Share, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "../../components/atomic/Card";
import { ImperialButton } from "../../components/atomic/ImperialButton";
import { Skeleton } from "../../components/atomic/Skeleton";
import { useReferrals } from "../../hooks/useApi";

export const ReferralsScreen = () => {
  const { data: referral, isLoading } = useReferrals();

  if (isLoading) {
    return (
      <View className="flex-1 bg-[#F9FAFB] p-4">
        <Skeleton height={200} className="mb-4" />
        <Skeleton height={300} />
      </View>
    );
  }

  if (!referral) return null;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Entre na Legião Imperial! Use meu código ${referral.code} e ganhe bônus de boas-vindas. ${referral.url}`,
        title: "Indique & Ganhe - Imperial Suplementos",
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]" edges={["top", "bottom"]}>
      <ScrollView className="flex-1 bg-[#F9FAFB]">
        <View className="p-4">
          <Text
            className="text-2xl font-bold text-[#111111] mb-2"
            allowFontScaling
          >
            Indique & Ganhe
          </Text>
          <Text className="text-[#6B7280] mb-6" allowFontScaling>
            Compartilhe seu código e ganhe pontos quando seus amigos fizerem a
            primeira compra
          </Text>

          <Card>
            <View className="items-center py-4">
              <View className="bg-[#E10600]/10 p-4 rounded-full mb-4">
                <MaterialCommunityIcons
                  name="account-multiple"
                  size={48}
                  color="#E10600"
                />
              </View>
              <Text
                className="text-[#111111] font-bold text-lg mb-2"
                allowFontScaling
              >
                Seu Código de Indicação
              </Text>
              <Text
                className="text-3xl font-bold text-[#E10600] mb-4"
                allowFontScaling
              >
                {referral.code}
              </Text>
              <Text
                className="text-[#6B7280] text-sm text-center mb-4"
                allowFontScaling
              >
                {referral.url}
              </Text>
            </View>
          </Card>

          <View className="mt-4">
            <ImperialButton onPress={handleShare}>
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="share-variant"
                  size={20}
                  color="#FFFFFF"
                />
                <Text className="ml-2 text-white font-bold">Compartilhar</Text>
              </View>
            </ImperialButton>
          </View>

          <View className="mt-6">
            <Text
              className="text-xl font-bold text-[#111111] mb-3"
              allowFontScaling
            >
              Como Funciona?
            </Text>

            <Card>
              <View className="flex-row items-start mb-4">
                <View className="bg-[#E10600] w-8 h-8 rounded-full items-center justify-center mr-3">
                  <Text className="text-white font-bold" allowFontScaling>
                    1
                  </Text>
                </View>
                <View className="flex-1">
                  <Text
                    className="text-[#111111] font-semibold"
                    allowFontScaling
                  >
                    Compartilhe seu código
                  </Text>
                  <Text className="text-[#6B7280] text-sm" allowFontScaling>
                    Envie para amigos via WhatsApp, Instagram ou link
                  </Text>
                </View>
              </View>

              <View className="flex-row items-start mb-4">
                <View className="bg-[#E10600] w-8 h-8 rounded-full items-center justify-center mr-3">
                  <Text className="text-white font-bold" allowFontScaling>
                    2
                  </Text>
                </View>
                <View className="flex-1">
                  <Text
                    className="text-[#111111] font-semibold"
                    allowFontScaling
                  >
                    Amigo ganha bônus
                  </Text>
                  <Text className="text-[#6B7280] text-sm" allowFontScaling>
                    Seu amigo recebe bônus de boas-vindas ao cadastrar
                  </Text>
                </View>
              </View>

              <View className="flex-row items-start">
                <View className="bg-[#E10600] w-8 h-8 rounded-full items-center justify-center mr-3">
                  <Text className="text-white font-bold" allowFontScaling>
                    3
                  </Text>
                </View>
                <View className="flex-1">
                  <Text
                    className="text-[#111111] font-semibold"
                    allowFontScaling
                  >
                    Você ganha pontos
                  </Text>
                  <Text className="text-[#6B7280] text-sm" allowFontScaling>
                    Receba 500 pontos após a primeira compra do indicado
                  </Text>
                </View>
              </View>
            </Card>
          </View>

          <View className="mt-6 mb-4">
            <Text
              className="text-xl font-bold text-[#111111] mb-3"
              allowFontScaling
            >
              Convites ({referral.invited.length})
            </Text>

            {referral.invited.map((invite, index) => (
              <Card key={index} style={{ marginBottom: 8 }}>
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1">
                    <MaterialCommunityIcons
                      name="account-circle"
                      size={40}
                      color="#9CA3AF"
                    />
                    <View className="ml-3 flex-1">
                      <Text
                        className="text-[#111111] font-semibold"
                        allowFontScaling
                      >
                        {invite.name || "Usuário Anônimo"}
                      </Text>
                      <Text className="text-[#6B7280] text-sm" allowFontScaling>
                        {new Date(invite.createdAt).toLocaleDateString("pt-BR")}
                      </Text>
                    </View>
                  </View>
                  <View
                    className={`px-3 py-1 rounded-full ${
                      invite.status === "converted"
                        ? "bg-[#22C55E]/20"
                        : "bg-[#F59E0B]/20"
                    }`}
                  >
                    <Text
                      className={`text-xs font-semibold ${
                        invite.status === "converted"
                          ? "text-[#22C55E]"
                          : "text-[#F59E0B]"
                      }`}
                      allowFontScaling
                    >
                      {invite.status === "converted"
                        ? "Convertido"
                        : "Pendente"}
                    </Text>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
