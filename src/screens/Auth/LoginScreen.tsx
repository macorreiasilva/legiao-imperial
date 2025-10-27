import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { ImperialButton } from "../../components/atomic/ImperialButton";
import { api } from "../../services/api";
import { useAuthStore } from "../../store/authStore";

export const LoginScreen = () => {
  const [email, setEmail] = useState("demo@imperial.com");
  const [password, setPassword] = useState("demo123");
  const [loading, setLoading] = useState(false);
  const { setUser, setToken } = useAuthStore();
  const insets = useSafeAreaInsets();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await api.auth.login(email, password);
      setUser(response.user);
      setToken(response.token);
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1 bg-white">
          <View className="flex-1 justify-center p-6">
            <View className="items-center mb-8">
              <View className="w-20 h-20 bg-[#E10600] rounded-full items-center justify-center mb-4">
                <Text
                  className="text-white text-3xl font-bold"
                  allowFontScaling
                >
                  I
                </Text>
              </View>
              <Text
                className="text-3xl font-bold text-[#111111]"
                allowFontScaling
              >
                Imperial Suplementos
              </Text>
              <Text className="text-[#6B7280] mt-2" allowFontScaling>
                Entrar na Legião Imperial
              </Text>
            </View>

            <View className="space-y-4">
              <View>
                <Text
                  className="text-[#111111] font-semibold mb-2"
                  allowFontScaling
                >
                  E-mail
                </Text>
                <TextInput
                  className="border border-[#E5E7EB] rounded-xl px-4 py-3 text-[#111111]"
                  placeholder="seu@email.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View className="mt-4">
                <Text
                  className="text-[#111111] font-semibold mb-2"
                  allowFontScaling
                >
                  Senha
                </Text>
                <TextInput
                  className="border border-[#E5E7EB] rounded-xl px-4 py-3 text-[#111111]"
                  placeholder="��������"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              <View className="mt-6">
                <ImperialButton onPress={handleLogin} loading={loading}>
                  Entrar
                </ImperialButton>
              </View>

              <Text
                className="text-center text-[#6B7280] text-sm mt-4"
                allowFontScaling
              >
                Use demo@imperial.com / demo123 para testar
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
