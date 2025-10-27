import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmptyState } from "../../components/atomic/EmptyState";
import { Skeleton } from "../../components/atomic/Skeleton";
import { RewardCard } from "../../components/composite/RewardCard";
import { useRewards } from "../../hooks/useApi";

const RewardsScreen = () => {
  const { data: rewards, isLoading } = useRewards();

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]" edges={["top", "bottom"]}>
      <ScrollView className="flex-1 bg-[#F9FAFB]">
        <View className="p-4">
          <Text
            className="text-2xl font-bold text-[#111111] mb-4"
            allowFontScaling
          >
            Recompensas
          </Text>

          {isLoading ? (
            <View className="gap-3">
              <Skeleton height={200} />
              <Skeleton height={200} />
              <Skeleton height={200} />
            </View>
          ) : rewards && rewards.length > 0 ? (
            <View className="gap-3">
              {rewards.map((reward: any) => (
                <RewardCard
                  key={reward.id}
                  reward={reward}
                  onPress={() => console.log("Reward pressed:", reward.id)}
                />
              ))}
            </View>
          ) : (
            <EmptyState
              icon="gift"
              title="Nenhuma recompensa disponível"
              description="Novas recompensas em breve!"
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RewardsScreen;
