// CustomTabBar.js
import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SparklesIcon = ({ size = 28, color = '#fff' }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 33 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Sparkle paths */}
    <Path d="M9.58664 6.11179C9.9462 4.62897 12.0551 4.62897 12.4147 6.11178L13.404 10.1918C13.5324 10.7213 13.9457 11.1346 14.4751 11.263L18.5552 12.2523C20.038 12.6119 20.038 14.7208 18.5552 15.0804L14.4751 16.0697C13.9457 16.1981 13.5324 16.6114 13.404 17.1408L12.4147 21.2209C12.0551 22.7037 9.9462 22.7037 9.58664 21.2209L8.59729 17.1408C8.46891 16.6114 8.05556 16.1981 7.52615 16.0697L3.4461 15.0804C1.96328 14.7208 1.96328 12.6119 3.44609 12.2523L7.52615 11.263C8.05556 11.1346 8.46891 10.7213 8.59729 10.1918L9.58664 6.11179Z" fill={color} />
    <Path d="M21.4638 20.3507C21.6851 19.4382 22.9829 19.4382 23.2041 20.3507L23.813 22.8615C23.892 23.1873 24.1463 23.4417 24.4721 23.5207L26.9829 24.1295C27.8954 24.3508 27.8954 25.6486 26.9829 25.8698L24.4721 26.4787C24.1463 26.5577 23.892 26.812 23.813 27.1378L23.2041 29.6486C22.9829 30.5611 21.6851 30.5611 21.4638 29.6486L20.855 27.1378C20.776 26.812 20.5216 26.5577 20.1958 26.4787L17.685 25.8698C16.7725 25.6486 16.7725 24.3508 17.685 24.1295L20.1958 23.5207C20.5216 23.4417 20.776 23.1873 20.855 22.8615L21.4638 20.3507Z" fill={color} />
    <Path d="M25.7629 5.9488C25.9081 5.34997 26.7598 5.34997 26.905 5.9488L27.3046 7.59651C27.3564 7.81031 27.5233 7.97724 27.7371 8.02909L29.3849 8.42863C29.9837 8.57384 29.9837 9.42551 29.3849 9.57072L27.7371 9.97026C27.5233 10.0221 27.3564 10.189 27.3046 10.4028L26.905 12.0506C26.7598 12.6494 25.9081 12.6494 25.7629 12.0506L25.3634 10.4028C25.3116 10.189 25.1446 10.0221 24.9308 9.97026L23.2831 9.57072C22.6843 9.42551 22.6843 8.57384 23.2831 8.42863L24.9308 8.02909C25.1446 7.97724 25.3116 7.81031 25.3634 7.59651L25.7629 5.9488Z" fill={color} />
    {/* …other sparkle paths… */}
  </Svg>
);

/**
 * CustomTabBar Component
 */
export default function CustomTabBar({ state, descriptors, navigation }) {
  const { width } = Dimensions.get('window');
  const height = 96; // Background height

  const currentRoute = state.routes[state.index];
  const currentOptions = descriptors[currentRoute.key].options || {};
  const currentStyle = currentOptions.tabBarStyle || {};

  if (currentStyle.display === 'none') {
    return null;
  }

  return (
    <View style={{ width, height, position: 'absolute', bottom: 0 }}>
      {/* Background SVG */}
      <Svg
        width="100%"
        height={height}
        viewBox="0 0 430 96"
        style={styles.svgAbsolute}
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M244.272 24.0316C252.779 15.3746 262.938 5.03467 289.056 0H405C418.807 0 430 11.1929 430 25V70.5556C430 84.3627 418.807 95.5556 405 95.5556H25C11.1929 95.5556 0 84.3627 0 70.5556V25C0 11.1929 11.1929 0 25 0H140.944C165.782 4.4581 176.963 15.0284 186.374 23.9256C194.613 31.7151 201.496 38.2223 215 38.2223C230.329 38.2223 236.634 31.8054 244.272 24.0316Z"
          fill="#F7F7F7"
        />
      </Svg>

      {/* Icons Row */}
      <View style={styles.iconRow}>
        {state.routes.map((route, index) => {
          if (route.name === 'ChatBot') return null;

          const isFocused = state.index === index;
          let iconName = 'home-outline';
          let positionStyle = {};

          switch (route.name) {
            case 'HomeTab':
              iconName = isFocused ? 'home' : 'home-outline';
              positionStyle = { left: 20 };
              break;
            case 'RequestTab':
              iconName = isFocused ? 'create' : 'create-outline';
              positionStyle = { left: 110 };
              break;
            case 'OrdersTab':
              iconName = isFocused ? 'list' : 'list-outline';
              positionStyle = { left: 270 };
              break;
            case 'AccountTab':
              iconName = isFocused ? 'person' : 'person-outline';
              positionStyle = { left: 350 };
              break;
            default:
              return null;
          }

          const onPress = () => {
            if (!isFocused) navigation.navigate(route.name);
          };

          const label =
            (descriptors[route.key].options.tabBarLabel ?? descriptors[route.key].options.title ?? route.name
            ).replace('Tab', '');

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={[styles.iconContainer, positionStyle]}
              activeOpacity={0.7}
            >
              <Ionicons
                name={iconName}
                size={24}
                color={isFocused ? '#A35B3D' : '#999999'}
              />
              <Text
                style={{
                  fontSize: 12,
                  marginTop: 2,
                  color: isFocused ? '#A35B3D' : '#999999',
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Middle ChatBot button */}
      {state.routes.map((route, index) => {
        if (route.name !== 'ChatBot') return null;
        const isFocused = state.index === index;
        const onPress = () => {
          if (!isFocused) navigation.navigate('ChatBot');
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.chatBotContainer}
            activeOpacity={0.7}
          >
            <SparklesIcon size={28} color="#fff" />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  svgAbsolute: {
    position: 'absolute',
    bottom: 0,
  },
  iconRow: {
    position: 'absolute',
    width: '100%',
    height: 96,
    bottom: 0,
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    alignItems: 'center',
  },
  chatBotContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#A35B3D',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});
