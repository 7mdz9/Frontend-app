// test/StarterScreen.test.js
import { render, act } from '@testing-library/react-native';
import StarterScreen from '../onboarding/StarterScreen';

jest.useFakeTimers();

test('navigates to Onboarding after SPLASH_TIMEOUT', () => {
  const mockNavigation = { navigate: jest.fn() };
  const { getByLabelText } = render(
    <StarterScreen navigation={mockNavigation} />
  );

  expect(getByLabelText('App logo')).toBeTruthy();

  act(() => {
    jest.advanceTimersByTime(1500);
  });

  expect(mockNavigation.navigate).toHaveBeenCalledWith('Onboarding');
});

