import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "../../components/atomic/Card";
import { useAuthStore } from "../../store/authStore";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuthStore();

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]" edges={["top", "bottom"]}>
      <View className="flex-1 bg-[#F9FAFB] p-4">
        <Text
          className="text-2xl font-bold text-[#111111] mb-4"
          allowFontScaling
        >
          Perfil
        </Text>

        <Card>
          <View className="items-center py-4">
            <View className="w-20 h-20 bg-[#E10600] rounded-full items-center justify-center mb-3">
              <MaterialCommunityIcons
                name="account"
                size={40}
                color="#FFFFFF"
              />
            </View>
            <Text className="text-xl font-bold text-[#111111]" allowFontScaling>
              {user?.name || "Usuário"}
            </Text>
            <Text className="text-[#6B7280]" allowFontScaling>
              {user?.email || "email@example.com"}
            </Text>
          </View>
        </Card>

        <View className="mt-4 gap-2">
          <TouchableOpacity>
            <Card>
              <View className="flex-row items-center py-2">
                <MaterialCommunityIcons
                  name="account-edit"
                  size={24}
                  color="#111111"
                />
                <Text
                  className="ml-3 text-[#111111] font-semibold"
                  allowFontScaling
                >
                  Editar Perfil
                </Text>
              </View>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.getParent()?.navigate("Support" as never)}
          >
            <Card>
              <View className="flex-row items-center py-2">
                <MaterialCommunityIcons
                  name="help-circle"
                  size={24}
                  color="#111111"
                />
                <Text
                  className="ml-3 text-[#111111] font-semibold"
                  allowFontScaling
                >
                  Suporte
                </Text>
              </View>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity onPress={logout}>
            <Card>
              <View className="flex-row items-center py-2">
                <MaterialCommunityIcons
                  name="logout"
                  size={24}
                  color="#E10600"
                />
                <Text
                  className="ml-3 text-[#E10600] font-semibold"
                  allowFontScaling
                >
                  Sair
                </Text>
              </View>
            </Card>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
