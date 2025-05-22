import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// Match Login’s color scheme
const PRIMARY_COLOR = '#A67552';
const BACKGROUND_COLOR = '#F4F1E1';
const TEXT_COLOR = '#333333';
const INACTIVE_DOT_COLOR = '#D9C9B2';

// Font sizes
const TITLE_FONT_SIZE = 22;
const DESCRIPTION_FONT_SIZE = 14;
const BUTTON_FONT_SIZE = 16;

// Image dimensions
const IMAGE_WIDTH = 250;
const IMAGE_HEIGHT = 250;

// Strings for Onboarding (example)
const strings = {
  chooseServiceTitle: "Choose a service",
  chooseServiceDesc: "Find what you need easily from a variety of reliable providers.",
  getQuoteTitle: "Get a quote",
  getQuoteDesc: "Request estimates and compare prices for informed decisions.",
  workDoneTitle: "Work done",
  workDoneDesc: "Skilled experts handle your tasks efficiently and reliably.",
  skip: "Skip",
  next: "Next",
  done: "Done"
};

const pages = [
  {
    title: strings.chooseServiceTitle,
    description: strings.chooseServiceDesc,
    image: require('../assets/Starters/Welcome1.png'),
  },
  {
    title: strings.getQuoteTitle,
    description: strings.getQuoteDesc,
    image: require('../assets/Starters/welcome2.png'),
  },
  {
    title: strings.workDoneTitle,
    description: strings.workDoneDesc,
    image: require('../assets/Starters/welcome3.png'),
  },
];

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(offsetX / width);
    setCurrentPage(pageIndex);
  };

  const goNext = () => {
    if (currentPage < pages.length - 1) {
      scrollViewRef.current.scrollTo({ x: (currentPage + 1) * width, animated: true });
    }
  };

  const goSkip = () => {
    navigation.navigate('SignUp');
  };

  const finishOnboarding = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        accessibilityLabel="Onboarding tutorial"
      >
        {pages.map((page, index) => (
          <View key={index} style={styles.page} accessibilityLabel={`Onboarding step ${index+1}`}>
            <Image
              source={page.image}
              style={styles.image}
              accessibilityLabel={`Illustration for ${page.title}`}
            />
            <Text style={styles.title}>{page.title}</Text>
            <Text style={styles.description}>{page.description}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View style={styles.dotsContainer} accessibilityLabel={`Step ${currentPage+1} of ${pages.length}`}>
        {pages.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === currentPage && styles.activeDot
            ]}
          />
        ))}
      </View>

      {/* Bottom Buttons */}
      <View style={styles.buttonsContainer}>
        {currentPage < pages.length - 1 ? (
          <>
            <TouchableOpacity onPress={goSkip} style={styles.skipButton} accessibilityLabel="Skip Onboarding">
              <Text style={styles.skipButtonText}>{strings.skip}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goNext} style={styles.nextButton} accessibilityLabel="Next step">
              <Text style={styles.nextButtonText}>{strings.next}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={finishOnboarding} style={styles.doneButton} accessibilityLabel="Finish Onboarding">
            <Text style={styles.doneButtonText}>{strings.done}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  page: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: TITLE_FONT_SIZE,
    fontWeight: '600',
    color: TEXT_COLOR,
    marginBottom: 10,
  },
  description: {
    fontSize: DESCRIPTION_FONT_SIZE,
    textAlign: 'center',
    color: '#666666',
    lineHeight: 20,
    marginHorizontal: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 90,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: INACTIVE_DOT_COLOR,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: PRIMARY_COLOR,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  skipButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  skipButtonText: {
    fontSize: BUTTON_FONT_SIZE,
    color: TEXT_COLOR,
    fontWeight: '600',
  },
  nextButton: {
    width: 120,
    height: 50,
    borderRadius: 25,
    backgroundColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneButton: {
    width: 120,
    height: 50,
    borderRadius: 25,
    backgroundColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: BUTTON_FONT_SIZE,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  doneButtonText: {
    fontSize: BUTTON_FONT_SIZE,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
