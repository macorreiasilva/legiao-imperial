import React from 'react';
import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'default' | 'dark';
}

export const Card: React.FC<CardProps> = ({ children, variant = 'default', style, ...props }) => {
  const bgColor = variant === 'dark' ? 'bg-[#1F1F1F]' : 'bg-white';
  
  return (
    <View
      {...props}
      className={`${bgColor} rounded-2xl p-4 shadow-sm`}
      style={[{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }, style]}
    >
      {children}
    </View>
  );
};
