// /ClientApp/auth/SignUp.jsx
import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Platform,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Use your shared components and auth-specific common styles
import { FormInput, PrimaryButton } from '../shared/Components';
import CommonStyles from '../shared/CommonAuthStyles';
// Rename the imported auth theme to avoid duplicate declaration:
import { COLORS as authCOLORS, SIZES as authSIZES } from '../shared/authTheme';
import strings from '../strings';

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string()
    .email(strings.invalidEmail)
    .required('Email is required'),
  password: Yup.string()
    .min(8, strings.passwordWeak)
    .matches(/[A-Z]/, 'At least one uppercase letter is required.')
    .matches(/\d/, 'At least one number is required.')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match.')
    .required('Confirm password is required'),
});

export default function SignUp({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);

  const handlePrivacyPolicy = () => {
    Alert.alert('Privacy Policy', 'Your data is protected (front-end only demo).');
  };

  const handleNavigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={[CommonStyles.container, styles.authContainer]} accessibilityLabel="Sign Up Screen">
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        enableOnAndroid
        extraHeight={100}
        keyboardOpeningTime={0}
        bounces={false}
      >
        <Text style={styles.headerTitle}>{strings.signUpTitle}</Text>
        <Text style={styles.headerSubtitle}>{strings.signUpSubtitle}</Text>

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={SignUpSchema}
          validateOnChange
          validateOnBlur={false}
          onSubmit={(values) => {
            Alert.alert('Success', 'Account created successfully!');
            navigation.navigate('Login'); // or navigate to AppNavigator if desired
          }}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <View style={styles.form}>
              <FormInput
                placeholder={strings.firstNamePlaceholder}
                value={values.firstName}
                onChangeText={handleChange('firstName')}
                error={errors.firstName}
                touched={touched.firstName}
                // Pass the auth theme to the component
                theme={{ COLORS: authCOLORS, SIZES: authSIZES }}
              />
              <FormInput
                placeholder={strings.lastNamePlaceholder}
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                error={errors.lastName}
                touched={touched.lastName}
                theme={{ COLORS: authCOLORS, SIZES: authSIZES }}
              />
              <FormInput
                placeholder={strings.emailPlaceholder}
                value={values.email}
                onChangeText={handleChange('email')}
                error={errors.email}
                touched={touched.email}
                keyboardType="email-address"
                theme={{ COLORS: authCOLORS, SIZES: authSIZES }}
              />
              <FormInput
                placeholder={strings.passwordPlaceholder}
                value={values.password}
                onChangeText={handleChange('password')}
                secureTextEntry={!showPassword}
                error={errors.password}
                touched={touched.password}
                showPasswordToggle
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
                theme={{ COLORS: authCOLORS, SIZES: authSIZES }}
              />
              <FormInput
                placeholder="Confirm Password"
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                secureTextEntry={!showPassword}
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
                theme={{ COLORS: authCOLORS, SIZES: authSIZES }}
              />
              <PrimaryButton
                testID="SignUpSubmitButton"
                title={strings.signUpButton}
                onPress={handleSubmit}
                accessibilityLabel="Confirm Sign Up"
                theme={{ COLORS: authCOLORS, SIZES: authSIZES }}
              />
              <TouchableOpacity
                style={styles.privacyContainer}
                onPress={handlePrivacyPolicy}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color={authCOLORS.primary}
                  style={{ marginRight: 5 }}
                />
                <Text style={styles.privacyText}>{strings.privacyPolicy}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.loginLinkContainer}
                onPress={handleNavigateToLogin}
              >
                <Text style={styles.loginLinkText}>
                  Already have an account?{' '}
                  <Text style={[styles.loginLinkText, styles.highlight]}>
                    Log In
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  authContainer: {
    // Any additional auth-specific container styling if needed
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 50,
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
  privacyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  privacyText: {
    fontSize: 14,
    color: authCOLORS.primary,
    textDecorationLine: 'underline',
  },
  loginLinkContainer: {
    marginTop: 20,
  },
  loginLinkText: {
    fontSize: 14,
    textAlign: 'center',
    color: authCOLORS.text,
  },
  highlight: {
    color: authCOLORS.primary,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
