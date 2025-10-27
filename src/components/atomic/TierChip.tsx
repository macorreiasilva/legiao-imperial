import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tier } from '../../types';
import { getTierColor } from '../../utils/formatters';

interface TierChipProps {
  tier: Tier;
  size?: 'small' | 'medium' | 'large';
}

export const TierChip: React.FC<TierChipProps> = ({ tier, size = 'medium' }) => {
  const tierColor = getTierColor(tier);
  
  const sizeConfig = {
    small: { padding: 'px-2 py-1', text: 'text-xs', icon: 14 },
    medium: { padding: 'px-3 py-1.5', text: 'text-sm', icon: 16 },
    large: { padding: 'px-4 py-2', text: 'text-base', icon: 20 },
  };

  const config = sizeConfig[size];

  return (
    <View
      className={`flex-row items-center rounded-full ${config.padding}`}
      style={{ backgroundColor: tierColor + '20', borderColor: tierColor, borderWidth: 1 }}
      accessibilityRole="text"
      accessibilityLabel={`Nível ${tier}`}
    >
      <MaterialCommunityIcons
        name="shield-crown"
        size={config.icon}
        color={tierColor}
        style={{ marginRight: 4 }}
      />
      <Text className={`font-bold ${config.text}`} style={{ color: tierColor }} allowFontScaling>
        {tier}
      </Text>
    </View>
  );
};
