import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ImperialButton } from './ImperialButton';

interface EmptyStateProps {
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  description?: string;
  ctaLabel?: string;
  onPressCta?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'inbox',
  title,
  description,
  ctaLabel,
  onPressCta,
}) => {
  return (
    <View className="flex-1 items-center justify-center p-8">
      <MaterialCommunityIcons name={icon} size={64} color="#9CA3AF" />
      <Text className="text-xl font-bold text-[#111111] mt-4 text-center" allowFontScaling>
        {title}
      </Text>
      {description && (
        <Text className="text-sm text-[#6B7280] mt-2 text-center" allowFontScaling>
          {description}
        </Text>
      )}
      {ctaLabel && onPressCta && (
        <View className="mt-6 w-full max-w-xs">
          <ImperialButton onPress={onPressCta}>{ctaLabel}</ImperialButton>
        </View>
      )}
    </View>
  );
};
