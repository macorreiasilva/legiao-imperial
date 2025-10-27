import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "../../components/atomic/Card";
import { ImperialButton } from "../../components/atomic/ImperialButton";
import { useAuthStore } from "../../store/authStore";

interface EditProfileForm {
  name: string;
  phone: string;
  birthday: string;
  gym: string;
}

export const EditProfileScreen = () => {
  const navigation = useNavigation();
  const { user, setUser } = useAuthStore();
  const [isSaving, setIsSaving] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileForm>({
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
      birthday: user?.birthday || "",
      gym: user?.gym || "",
    },
  });

  const onSubmit = async (data: EditProfileForm) => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (user) {
        setUser({
          ...user,
          name: data.name,
          phone: data.phone,
          birthday: data.birthday,
          gym: data.gym,
        });
      }

      Alert.alert("Sucesso", "Perfil atualizado com sucesso!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível atualizar o perfil. Tente novamente."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]" edges={["bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1 p-4">
          <View className="items-center mb-6">
            <View className="w-24 h-24 bg-[#E10600] rounded-full items-center justify-center mb-3">
              <MaterialCommunityIcons
                name="account"
                size={48}
                color="#FFFFFF"
              />
            </View>
            <Text className="text-xl font-bold text-[#111111]" allowFontScaling>
              Editar Perfil
            </Text>
          </View>

          <Card style={{ marginBottom: 16 }}>
            <View className="mb-4">
              <Text
                className="text-[#111111] font-semibold mb-2"
                allowFontScaling
              >
                Nome Completo
              </Text>
              <Controller
                control={control}
                name="name"
                rules={{ required: "Nome é obrigatório" }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-3 text-[#111111]"
                    placeholder="Digite seu nome completo"
                    value={value}
                    onChangeText={onChange}
                    placeholderTextColor="#9CA3AF"
                  />
                )}
              />
              {errors.name && (
                <Text className="text-[#EF4444] text-sm mt-1" allowFontScaling>
                  {errors.name.message}
                </Text>
              )}
            </View>

            <View className="mb-4">
              <Text
                className="text-[#111111] font-semibold mb-2"
                allowFontScaling
              >
                E-mail
              </Text>
              <View className="bg-[#F3F4F6] border border-[#E5E7EB] rounded-xl px-4 py-3 flex-row items-center">
                <Text className="text-[#6B7280] flex-1" allowFontScaling>
                  {user?.email}
                </Text>
                <MaterialCommunityIcons name="lock" size={20} color="#6B7280" />
              </View>
              <Text className="text-[#6B7280] text-xs mt-1" allowFontScaling>
                O e-mail não pode ser alterado
              </Text>
            </View>

            <View className="mb-4">
              <Text
                className="text-[#111111] font-semibold mb-2"
                allowFontScaling
              >
                Telefone
              </Text>
              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-3 text-[#111111]"
                    placeholder="(00) 00000-0000"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="phone-pad"
                    placeholderTextColor="#9CA3AF"
                  />
                )}
              />
            </View>

            <View className="mb-4">
              <Text
                className="text-[#111111] font-semibold mb-2"
                allowFontScaling
              >
                Data de Nascimento
              </Text>
              <Controller
                control={control}
                name="birthday"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-3 text-[#111111]"
                    placeholder="DD/MM/AAAA"
                    value={value}
                    onChangeText={onChange}
                    placeholderTextColor="#9CA3AF"
                  />
                )}
              />
            </View>

            <View>
              <Text
                className="text-[#111111] font-semibold mb-2"
                allowFontScaling
              >
                Academia
              </Text>
              <Controller
                control={control}
                name="gym"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-3 text-[#111111]"
                    placeholder="Nome da sua academia"
                    value={value}
                    onChangeText={onChange}
                    placeholderTextColor="#9CA3AF"
                  />
                )}
              />
            </View>
          </Card>

          <View className="flex-row gap-3 mb-4">
            <View className="flex-1">
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="bg-[#E5E7EB] py-4 rounded-xl items-center"
              >
                <Text className="text-[#111111] font-bold" allowFontScaling>
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-1">
              <ImperialButton
                onPress={handleSubmit(onSubmit)}
                loading={isSaving}
              >
                Salvar
              </ImperialButton>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
