import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmptyState } from "../../components/atomic/EmptyState";
import { Skeleton } from "../../components/atomic/Skeleton";
import { ProductCard } from "../../components/composite/ProductCard";
import { useProducts } from "../../hooks/useApi";

const ShopScreen = () => {
  const { data: products, isLoading } = useProducts();

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]" edges={["top", "bottom"]}>
      <ScrollView className="flex-1 bg-[#F9FAFB]">
        <View className="p-4">
          <Text
            className="text-2xl font-bold text-[#111111] mb-4"
            allowFontScaling
          >
            Loja
          </Text>

          {isLoading ? (
            <View className="gap-3">
              <Skeleton height={250} />
              <Skeleton height={250} />
              <Skeleton height={250} />
            </View>
          ) : products && products.length > 0 ? (
            <View className="gap-3">
              {products.map((product: any) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onPress={() => console.log("Product pressed:", product.id)}
                />
              ))}
            </View>
          ) : (
            <EmptyState
              icon="store"
              title="Nenhum produto disponível"
              description="Estamos atualizando nosso catálogo!"
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShopScreen;
