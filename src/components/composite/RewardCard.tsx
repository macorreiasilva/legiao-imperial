import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Reward } from "../../types";
import { formatPoints } from "../../utils/formatters";
import { Card } from "../atomic/Card";

interface RewardCardProps {
  reward: Reward;
  onPress: () => void;
}

export const RewardCard: React.FC<RewardCardProps> = ({ reward, onPress }) => {
  const productImages: Record<string, any> = {
    "product-1": require("../../../assets/images/products/product-1.png"),
    "product-2": require("../../../assets/images/products/product-2.png"),
    "product-3": require("../../../assets/images/products/product-3.png"),
    "experience-1": require("../../../assets/images/products/experience-1.png"),
  };

  const getLocalImage = (key: string) => {
    return (
      productImages[key] ||
      require("../../../assets/images/products/placeholder.png")
    );
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card>
        {reward.imageUrl ? (
          <Image
            source={
              reward.imageKey
                ? getLocalImage(reward.imageKey)
                : { uri: reward.imageUrl }
            }
            className="w-full h-40 rounded-xl mb-3"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-40 bg-[#F3F4F6] rounded-xl mb-3 items-center justify-center">
            <MaterialCommunityIcons name="gift" size={56} color="#9CA3AF" />
          </View>
        )}

        <Text
          className="text-[#111111] font-bold text-base mb-2"
          numberOfLines={2}
          allowFontScaling
        >
          {reward.name}
        </Text>

        <View className="flex-row items-center">
          <MaterialCommunityIcons
            name="star-circle"
            size={20}
            color="#E10600"
          />
          <Text
            className="text-[#E10600] font-bold text-base ml-1"
            allowFontScaling
          >
            {reward.costPoints
              ? formatPoints(reward.costPoints) + " pts"
              : "Grátis"}
          </Text>
        </View>

        {reward.stock !== undefined && reward.stock > 0 && (
          <Text className="text-[#6B7280] text-xs mt-2" allowFontScaling>
            Estoque: {reward.stock}
          </Text>
        )}
      </Card>
    </TouchableOpacity>
  );
};
