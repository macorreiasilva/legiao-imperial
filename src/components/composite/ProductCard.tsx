import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Product } from "../../types";
import { formatCurrency } from "../../utils/formatters";
import { Card } from "../atomic/Card";

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
}) => {
  const productImages: Record<string, any> = {
    "product-4": require("../../../assets/images/products/product-4.png"),
    "product-5": require("../../../assets/images/products/product-5.png"),
    "product-6": require("../../../assets/images/products/product-6.png"),
    "product-7": require("../../../assets/images/products/product-7.png"),
    "product-8": require("../../../assets/images/products/product-8.png"),
    "product-9": require("../../../assets/images/products/product-9.png"),
    "product-10": require("../../../assets/images/products/product-10.png"),
    "product-11": require("../../../assets/images/products/product-11.png"),
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
        {product.imageUrl ? (
          <Image
            source={
              product.imageKey
                ? getLocalImage(product.imageKey)
                : { uri: product.imageUrl }
            }
            className="w-full h-40 rounded-xl mb-3"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-32 bg-[#F3F4F6] rounded-xl mb-3 items-center justify-center">
            <MaterialCommunityIcons
              name="package-variant"
              size={48}
              color="#9CA3AF"
            />
          </View>
        )}

        {product.pointsMultiplier && product.pointsMultiplier > 1 && (
          <View className="absolute top-2 right-2 bg-[#FFD700] px-2 py-1 rounded-full flex-row items-center">
            <MaterialCommunityIcons name="star" size={14} color="#111111" />
            <Text
              className="text-[#111111] text-xs font-bold ml-1"
              allowFontScaling
            >
              x{product.pointsMultiplier}
            </Text>
          </View>
        )}

        <Text
          className="text-[#111111] font-bold text-base mb-1"
          numberOfLines={2}
          allowFontScaling
        >
          {product.name}
        </Text>

        <Text className="text-[#6B7280] text-sm mb-2" allowFontScaling>
          {product.brand}
        </Text>

        <Text className="text-[#E10600] font-bold text-lg" allowFontScaling>
          {formatCurrency(product.price)}
        </Text>
      </Card>
    </TouchableOpacity>
  );
};
