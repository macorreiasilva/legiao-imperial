import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImperialButton } from "../../components/atomic/ImperialButton";
import { useUIStore } from "../../store/uiStore";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    icon: "star-circle" as const,
    title: "Ganhe Pontos e Cashback",
    description:
      "A cada compra você acumula pontos e cashback para usar como quiser",
  },
  {
    id: "2",
    icon: "gift" as const,
    title: "Resgate é Simples",
    description:
      "Troque seus pontos por descontos, produtos exclusivos e experiências",
  },
  {
    id: "3",
    icon: "shield-crown" as const,
    title: "Legião Imperial",
    description:
      "Suba de nível e desbloqueie benefícios exclusivos: Bronze, Prata, Ouro e Elite",
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onComplete,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const setOnboardingCompleted = useUIStore(
    (state) => state.setOnboardingCompleted
  );

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex });
      setCurrentIndex(nextIndex);
    } else {
      setOnboardingCompleted(true);
      onComplete();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]" edges={["top", "bottom"]}>
      <View className="flex-1 bg-white">
        <FlatList
          ref={flatListRef}
          data={slides}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / width);
            setCurrentIndex(index);
          }}
          renderItem={({ item }) => (
            <View
              style={{ width }}
              className="flex-1 items-center justify-center p-8"
            >
              <MaterialCommunityIcons
                name={item.icon}
                size={120}
                color="#E10600"
              />
              <Text
                className="text-3xl font-bold text-[#111111] mt-8 text-center"
                allowFontScaling
              >
                {item.title}
              </Text>
              <Text
                className="text-lg text-[#6B7280] mt-4 text-center"
                allowFontScaling
              >
                {item.description}
              </Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />

        <View className="p-6">
          <View className="flex-row justify-center mb-6">
            {slides.map((_, index) => (
              <View
                key={index}
                className={`h-2 w-2 rounded-full mx-1 ${
                  index === currentIndex ? "bg-[#E10600] w-8" : "bg-[#E5E7EB]"
                }`}
              />
            ))}
          </View>

          <ImperialButton onPress={handleNext}>
            {currentIndex === slides.length - 1 ? "Começar" : "Próximo"}
          </ImperialButton>

          {currentIndex < slides.length - 1 && (
            <TouchableOpacity
              onPress={() => {
                setOnboardingCompleted(true);
                onComplete();
              }}
              className="mt-4"
            >
              <Text className="text-center text-[#6B7280]" allowFontScaling>
                Pular
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
