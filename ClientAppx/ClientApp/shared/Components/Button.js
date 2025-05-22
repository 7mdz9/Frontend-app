// components/Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../theme';

const Button = ({ title, onPress, disabled, accessibilityLabel }) => (
  <TouchableOpacity
    style={[styles.button, disabled && { opacity:0.5 }]}
    onPress={onPress}
    disabled={disabled}
    accessibilityLabel={accessibilityLabel || title}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    paddingVertical: 10,
    alignItems:'center',
  },
  buttonText: {
    color:'#fff',
    fontSize:SIZES.fontSizeRegular,
    fontWeight:'600'
  }
});

export default Button;
