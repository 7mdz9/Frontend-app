// /ClientApp/auth/LoginPage.jsx
import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Platform,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { COLORS as authCOLORS, SIZES as authSIZES } from '../shared/authTheme';
import FormInput from '../shared/Components/FormInput';
import PrimaryButton from '../shared/Components/PrimaryButton';
import strings from '../strings';

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const isEmailValid = email.includes('@');

  const handleLogin = () => {
    if (!email || !password) {
      setLoginError(strings.fillAllFields);
      return;
    }
    if (!isEmailValid) {
      setLoginError(strings.invalidEmail);
      return;
    }
    setLoginError(null);
    navigation.navigate('AppNavigator'); // Navigate to main tabs
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        enableOnAndroid={true}
        extraHeight={100}
        keyboardOpeningTime={0}
        bounces={false}
      >
        <Text style={styles.headerTitle}>{strings.loginTitle}</Text>
        <Text style={styles.headerSubtitle}>{strings.loginSubtitle}</Text>

        <View style={styles.form}>
          {loginError && (
            <Text style={styles.errorText}>{loginError}</Text>
          )}

          <FormInput
            placeholder={strings.emailPlaceholder}
            value={email}
            onChangeText={(val) => {
              setEmail(val);
              if (loginError) setLoginError(null);
            }}
            keyboardType="email-address"
            theme={{ COLORS: authCOLORS, SIZES: authSIZES }}
          />

          {email !== '' && (
            <Ionicons
              name={isEmailValid ? 'checkmark-circle' : 'close-circle'}
              size={20}
              color={isEmailValid ? authCOLORS.success : authCOLORS.error}
              style={{ position: 'absolute', right: 50, top: 95 }}
              accessibilityLabel={
                isEmailValid ? 'Valid email format' : 'Invalid email format'
              }
            />
          )}

          <FormInput
            placeholder={strings.passwordPlaceholder}
            value={password}
            onChangeText={(val) => {
              setPassword(val);
              if (loginError) setLoginError(null);
            }}
            secureTextEntry={!showPassword}
            showPasswordToggle
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            theme={{ COLORS: authCOLORS, SIZES: authSIZES }}
          />

          <TouchableOpacity
            onPress={handleForgotPassword}
            style={styles.forgotContainer}
            accessibilityLabel="Forgot Password"
          >
            <Text style={styles.forgotText}>{strings.forgotPassword}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.disabledButton} disabled>
            <Text style={styles.disabledButtonText}>{strings.rememberMe}</Text>
          </TouchableOpacity>

          <PrimaryButton
            title={strings.loginButton}
            onPress={handleLogin}
            accessibilityLabel="Confirm Login"
            theme={{ COLORS: authCOLORS, SIZES: authSIZES }}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            accessibilityLabel="Navigate to Sign Up screen"
          >
            <Text style={styles.linkText}>
              {strings.noAccount}{' '}
              <Text style={styles.linkHighlight}>{strings.loggin}</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: authCOLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
    paddingHorizontal: authSIZES.padding,
    paddingBottom: 80,
  },
  headerTitle: {
    fontSize: authSIZES.fontSizeHeading,
    fontWeight: 'bold',
    color: authCOLORS.primary,
    textAlign: 'center',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: authSIZES.fontSizeSubtitle,
    color: authCOLORS.text,
    textAlign: 'center',
    marginBottom: 30,
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  errorText: {
    color: authCOLORS.error,
    marginBottom: 10,
    textAlign: 'center',
  },
  forgotContainer: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    fontSize: 14,
    color: authCOLORS.primary,
    textDecorationLine: 'underline',
  },
  disabledButton: {
    width: '100%',
    height: authSIZES.inputHeight,
    borderRadius: authSIZES.inputHeight / 2,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  disabledButtonText: {
    fontSize: 14,
    color: '#999',
  },
  linkText: {
    fontSize: 14,
    color: authCOLORS.text,
    marginTop: 20,
    textAlign: 'center',
  },
  linkHighlight: {
    color: authCOLORS.primary,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
