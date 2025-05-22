// /ClientApp/shared/Components/FormInput.jsx
import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// Import default theme for fallback (main app theme)
import { COLORS as defaultCOLORS, SIZES as defaultSIZES } from '../theme';

// Dynamically generate styles using provided COLORS and SIZES
const createStyles = (COLORS, SIZES) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: SIZES.inputHeight,
      backgroundColor: '#FFFFFF',
      borderColor: COLORS.border,
      borderWidth: 1,
      borderRadius: SIZES.inputHeight / 2,
      paddingHorizontal: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      elevation: 2,
    },
    containerError: {
      borderColor: COLORS.error,
    },
    input: {
      flex: 1,
      fontSize: SIZES.fontSizeRegular,
      color: COLORS.text,
    },
    errorIcon: {
      marginLeft: 5,
    },
    errorText: {
      color: COLORS.error,
      marginTop: 3,
      fontSize: 14,
    },
  });

export default function FormInput({
  placeholder = '',
  value = '',
  onChangeText,
  secureTextEntry = false,
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword = null,
  error = null,
  touched = false,
  style = {},
  // Accept an optional theme prop (should be an object with { COLORS, SIZES })
  theme,
  ...rest
}) {
  // Use provided theme or fall back to default theme
  const currentCOLORS = theme && theme.COLORS ? theme.COLORS : defaultCOLORS;
  const currentSIZES = theme && theme.SIZES ? theme.SIZES : defaultSIZES;
  const styles = createStyles(currentCOLORS, currentSIZES);
  const isError = !!error && touched;

  return (
    <View style={{ marginBottom: 15, width: '100%' }}>
      {/* Input Container */}
      <View style={[styles.container, isError && styles.containerError, style]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={currentCOLORS.placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          allowFontScaling
          {...rest}
        />

        {showPasswordToggle && (
          <TouchableOpacity
            onPress={onTogglePassword}
            accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color={currentCOLORS.text}
            />
          </TouchableOpacity>
        )}

        {isError && (
          <Ionicons
            name="close-circle"
            size={20}
            color={currentCOLORS.error}
            accessibilityLabel="Invalid input"
            style={styles.errorIcon}
          />
        )}
      </View>

      {isError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}
