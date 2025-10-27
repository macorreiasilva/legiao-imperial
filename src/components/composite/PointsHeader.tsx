import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";
import { Tier } from "../../types";
import { formatPoints, getTierProgress } from "../../utils/formatters";
import { TierChip } from "../atomic/TierChip";

interface PointsHeaderProps {
  points: number;
  nextTierAt: number;
  tier: Tier;
  userName?: string;
}

export const PointsHeader: React.FC<PointsHeaderProps> = ({
  points,
  nextTierAt,
  tier,
  userName,
}) => {
  const progress = getTierProgress(points, nextTierAt);

  return (
    <LinearGradient
      colors={["#E10600", "#111111"]}
      start={{ x: 0, y: 0 }} // topo-esquerda
      end={{ x: 1, y: 1 }} // baixo-direita (≈ to-br)
      style={{ padding: 24, borderRadius: 16 }} // p-6 rounded-2xl
    >
      {userName && (
        <Text className="text-white text-lg mb-2" allowFontScaling>
          Olá, {userName}
        </Text>
      )}

      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-white text-2xl font-bold" allowFontScaling>
          {formatPoints(points)} pontos
        </Text>
        <TierChip tier={tier} size="large" />
      </View>

      <View className="bg-white/20 h-2 rounded-full overflow-hidden mb-2">
        <View className="bg-white h-full" style={{ width: `${progress}%` }} />
      </View>

      <Text className="text-white/80 text-sm" allowFontScaling>
        Próximo nível em {formatPoints(nextTierAt - points)} pontos
      </Text>
    </LinearGradient>
  );
};
