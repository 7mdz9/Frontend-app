import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginPage from '../auth/Login'; // or '../Register/Login' if that's your path
import strings from '../strings';

jest.useFakeTimers();

describe('LoginPage', () => {
  it('shows "Please fill in all fields" if either field is empty', () => {
    const mockNavigation = { navigate: jest.fn() };
    const { getByText, getByPlaceholderText } = render(
      <LoginPage navigation={mockNavigation} />
    );

    // Provide email but not password
    fireEvent.changeText(getByPlaceholderText(strings.emailPlaceholder), 'hello@example.com');
    fireEvent.press(getByText(strings.loginButton));

    expect(getByText(strings.fillAllFields)).toBeTruthy();
    expect(mockNavigation.navigate).not.toHaveBeenCalled();
  });

  it('shows "Please enter a valid email" if email is missing "@"', () => {
    const mockNavigation = { navigate: jest.fn() };
    const { getByText, getByPlaceholderText } = render(
      <LoginPage navigation={mockNavigation} />
    );

    // Provide invalid email + valid password
    fireEvent.changeText(getByPlaceholderText(strings.emailPlaceholder), 'invalidEmail');
    fireEvent.changeText(getByPlaceholderText(strings.passwordPlaceholder), 'Password123');
    fireEvent.press(getByText(strings.loginButton));

    expect(getByText(strings.invalidEmail)).toBeTruthy();
    expect(mockNavigation.navigate).not.toHaveBeenCalled();
  });

  it('navigates to AppNavigator if valid email & password', () => {
    const mockNavigation = { navigate: jest.fn() };
    const { getByText, getByPlaceholderText, queryByText } = render(
      <LoginPage navigation={mockNavigation} />
    );

    fireEvent.changeText(getByPlaceholderText(strings.emailPlaceholder), 'hello@example.com');
    fireEvent.changeText(getByPlaceholderText(strings.passwordPlaceholder), 'SecretPass1');
    fireEvent.press(getByText(strings.loginButton));

    // No error
    expect(queryByText(strings.fillAllFields)).toBeNull();
    expect(queryByText(strings.invalidEmail)).toBeNull();

    // Navigates successfully
    expect(mockNavigation.navigate).toHaveBeenCalledWith('AppNavigator');
  });
});
