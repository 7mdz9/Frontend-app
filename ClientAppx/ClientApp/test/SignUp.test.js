// test/SignUp.test.js
import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import SignUp from '../auth/SignUp'; // Adjust path if needed
import strings from '../strings';

jest.useFakeTimers();

describe('SignUp', () => {
  it('shows error if fields are empty', async () => {
    const mockNav = { navigate: jest.fn() };
    const { getByTestId, getByText } = render(<SignUp navigation={mockNav} />);

    await act(async () => {
      fireEvent.press(getByTestId('SignUpSubmitButton'));
    });

    // Now wait for the required errors to appear
    await waitFor(() => {
      expect(getByText('First name is required')).toBeTruthy();
      expect(getByText('Last name is required')).toBeTruthy();
      expect(getByText('Email is required')).toBeTruthy();
      expect(getByText('Password is required')).toBeTruthy();
      expect(getByText('Confirm password is required')).toBeTruthy();
    });

    expect(mockNav.navigate).not.toHaveBeenCalled();
  });

  it('shows invalid email error if email is malformed', async () => {
    const mockNav = { navigate: jest.fn() };
    const { getByTestId, getByPlaceholderText, getByText } = render(
      <SignUp navigation={mockNav} />
    );

    // Fill up fields with an invalid email
    await act(async () => {
      fireEvent.changeText(
        getByPlaceholderText(strings.firstNamePlaceholder),
        'John'
      );
      fireEvent.changeText(
        getByPlaceholderText(strings.lastNamePlaceholder),
        'Doe'
      );
      fireEvent.changeText(
        getByPlaceholderText(strings.emailPlaceholder),
        'badEmail'
      );
      fireEvent.changeText(
        getByPlaceholderText(strings.passwordPlaceholder),
        'Password1'
      );
      fireEvent.changeText(
        getByPlaceholderText('Confirm Password'),
        'Password1'
      );
    });

    // Press submit
    await act(async () => {
      fireEvent.press(getByTestId('SignUpSubmitButton'));
    });

    // Expect the invalid email message
    await waitFor(() => {
      expect(getByText(strings.invalidEmail)).toBeTruthy();
      expect(mockNav.navigate).not.toHaveBeenCalled();
    });
  });

  it('shows mismatch error if confirmPassword differs', async () => {
    const mockNav = { navigate: jest.fn() };
    const { getByTestId, getByPlaceholderText, getByText } = render(
      <SignUp navigation={mockNav} />
    );

    // Fill up with mismatched confirm
    await act(async () => {
      fireEvent.changeText(
        getByPlaceholderText(strings.firstNamePlaceholder),
        'John'
      );
      fireEvent.changeText(
        getByPlaceholderText(strings.lastNamePlaceholder),
        'Doe'
      );
      fireEvent.changeText(
        getByPlaceholderText(strings.emailPlaceholder),
        'john@example.com'
      );
      fireEvent.changeText(
        getByPlaceholderText(strings.passwordPlaceholder),
        'Password1'
      );
      fireEvent.changeText(
        getByPlaceholderText('Confirm Password'),
        'Different'
      );
    });

    // Press submit
    await act(async () => {
      fireEvent.press(getByTestId('SignUpSubmitButton'));
    });

    // Expect "Passwords must match."
    await waitFor(() => {
      expect(getByText('Passwords must match.')).toBeTruthy();
      expect(mockNav.navigate).not.toHaveBeenCalled();
    });
  });

  it('navigates to Login upon successful sign up', async () => {
    const mockNav = { navigate: jest.fn() };
    const { getByTestId, getByPlaceholderText, queryByText } = render(
      <SignUp navigation={mockNav} />
    );

    // Fill all valid
    await act(async () => {
      fireEvent.changeText(
        getByPlaceholderText(strings.firstNamePlaceholder),
        'John'
      );
      fireEvent.changeText(
        getByPlaceholderText(strings.lastNamePlaceholder),
        'Doe'
      );
      fireEvent.changeText(
        getByPlaceholderText(strings.emailPlaceholder),
        'john@example.com'
      );
      fireEvent.changeText(
        getByPlaceholderText(strings.passwordPlaceholder),
        'Password1'
      );
      fireEvent.changeText(
        getByPlaceholderText('Confirm Password'),
        'Password1'
      );
    });

    // Press submit
    await act(async () => {
      fireEvent.press(getByTestId('SignUpSubmitButton'));
    });

    // Wait for form to accept & navigate
    await waitFor(() => {
      // None of the required errors
      expect(queryByText('First name is required')).toBeNull();
      expect(queryByText('Last name is required')).toBeNull();
      expect(queryByText('Email is required')).toBeNull();
      expect(queryByText('Password is required')).toBeNull();
      expect(queryByText('Confirm password is required')).toBeNull();

      // No invalid email error
      expect(queryByText(strings.invalidEmail)).toBeNull();

      // Called with 'Login'
      expect(mockNav.navigate).toHaveBeenCalledWith('Login');
    });
  });
});
