import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../shared/theme';

const FADE_DURATION = 800;
const SPLASH_TIMEOUT = 1500;
const LOGO_SIZE = 180;

// We removed "useNavigation()" and now accept navigation as a prop:
export default function StarterScreen({ navigation }) {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: FADE_DURATION,
      useNativeDriver: true, // Ensures smoother animation
    }).start();

    // Navigate to Onboarding screen after SPLASH_TIMEOUT
    const timer = setTimeout(() => {
      navigation.navigate('Onboarding');
    }, SPLASH_TIMEOUT);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.background, COLORS.background]}
        style={styles.background}
      >
        <Animated.View style={[styles.iconContainer, { opacity: fadeAnim }]}>
          <Image
            source={require('../assets/Starters/Splash-Icon.png')}
            style={styles.icon}
            accessibilityLabel="App logo"
          />
        </Animated.View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
  },
  icon: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    resizeMode: 'contain',
  },
});
