import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from './authTheme.js'; // Auth theme

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SIZES.padding,
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
