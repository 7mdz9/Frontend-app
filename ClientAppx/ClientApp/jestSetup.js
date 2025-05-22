// __tests__/jestSetup.js
import 'react-native-gesture-handler/jestSetup';

// If you have an explicit mock for RNGH, keep or extend it

// 1) Mock expo-font so it doesn’t actually load fonts
jest.mock('expo-font', () => ({
  // Pass through everything else if you want
  ...jest.requireActual('expo-font'),
  // Overwrite the problematic parts
  isLoaded: jest.fn().mockReturnValue(true),
  loadAsync: jest.fn().mockResolvedValue(true),
}));

// 2) Mock @expo/vector-icons or whichever icon set is causing the loadedNativeFonts error
//    We'll make a stub Icon component that returns a <Text> with the icon name for test
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');

  // Return an object for each icon set you use
  // For Ionicons, MaterialIcons, etc., do the same pattern
  return {
    Ionicons: (props) => {
      return React.createElement(Text, props, `IonIcon: ${props.name}`);
    },
    // If you use MaterialIcons, Entypo, etc., mock them too:
    MaterialIcons: (props) => {
      return React.createElement(Text, props, `MaterialIcon: ${props.name}`);
    },
    // ...
  };
});
