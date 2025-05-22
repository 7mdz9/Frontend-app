// ClientApp/shared/CommonStyles.jsx
import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from './theme.js'; 
// ^ "theme.js" is in the same "shared" folder as CommonStyles.jsx.

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SIZES.padding,    // Using SIZES.padding here
  },
  headerTitle: {
    fontSize: SIZES.fontSizeHeading,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: SIZES.fontSizeSubtitle,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 30,
  },
  errorText: {
    color: COLORS.error,
    marginBottom: 10,
    textAlign: 'center',
  },
});
