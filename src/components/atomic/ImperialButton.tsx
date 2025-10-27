import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps } from 'react-native';

interface ImperialButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  loading?: boolean;
  children: React.ReactNode;
}

export const ImperialButton: React.FC<ImperialButtonProps> = ({
  variant = 'primary',
  loading = false,
  children,
  disabled,
  style,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-[#E10600] active:bg-[#C10500]';
      case 'secondary':
        return 'bg-[#111111] active:bg-[#000000]';
      case 'ghost':
        return 'bg-transparent border-2 border-[#E10600]';
      default:
        return 'bg-[#E10600]';
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case 'ghost':
        return 'text-[#E10600]';
      default:
        return 'text-white';
    }
  };

  return (
    <TouchableOpacity
      {...props}
      disabled={disabled || loading}
      style={style}
      className={`px-6 py-4 rounded-2xl items-center justify-center ${getVariantStyles()} ${disabled ? 'opacity-50' : ''}`}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'ghost' ? '#E10600' : '#FFFFFF'} />
      ) : (
        <Text className={`font-bold text-base ${getTextStyles()}`} allowFontScaling>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};
