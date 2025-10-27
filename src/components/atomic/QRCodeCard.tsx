import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { Card } from "./Card";

interface QRCodeCardProps {
  code: string;
  onCopy?: () => void;
}

export const QRCodeCard: React.FC<QRCodeCardProps> = ({ code, onCopy }) => {
  const handleCopy = async () => {
    await Clipboard.setStringAsync(code);
    Alert.alert("Copiado!", "CÃƒÂ³digo copiado para a ÃƒÂ¡rea de transferÃƒÂªncia");
    onCopy?.();
  };

  return (
    <Card>
      <View className="items-center">
        <View className="bg-white p-4 rounded-2xl">
          <QRCode value={code} size={200} />
        </View>

        <Text
          className="text-2xl font-bold text-[#111111] mt-4"
          allowFontScaling
        >
          {code}
        </Text>

        <TouchableOpacity
          onPress={handleCopy}
          className="flex-row items-center mt-4 px-4 py-2 bg-[#F3F4F6] rounded-full"
          accessibilityRole="button"
          accessibilityLabel="Copiar c�digo"
        >
          <MaterialCommunityIcons
            name="content-copy"
            size={18}
            color="#111111"
          />
          <Text className="ml-2 font-semibold text-[#111111]" allowFontScaling>
            Copiar C�digo
          </Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

export default QRCodeCard;
