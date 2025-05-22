// /ClientApp/shared/Components/PrimaryButton.jsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
// Import default theme for fallback (main app theme)
import { COLORS as defaultCOLORS, SIZES as defaultSIZES } from '../theme';

// Dynamically generate styles using provided COLORS and SIZES
const createStyles = (COLORS, SIZES) =>
  StyleSheet.create({
    button: {
      width: '100%',
      height: SIZES.inputHeight,
      borderRadius: SIZES.inputHeight / 2,
      backgroundColor: COLORS.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      elevation: 3,
    },
    text: {
      fontSize: 18,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    disabled: {
      opacity: 0.6,
    },
  });

export default function PrimaryButton({
  testID,
  title,
  onPress,
  disabled,
  accessibilityLabel,
  style,
  textStyle,
  // Accept an optional theme prop (object with { COLORS, SIZES })
  theme,
}) {
  // Use provided theme or default fallback
  const currentCOLORS = theme && theme.COLORS ? theme.COLORS : defaultCOLORS;
  const currentSIZES = theme && theme.SIZES ? theme.SIZES : defaultSIZES;
  const styles = createStyles(currentCOLORS, currentSIZES);

  return (
    <TouchableOpacity
      testID={testID}
      style={[styles.button, disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel || title}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}
