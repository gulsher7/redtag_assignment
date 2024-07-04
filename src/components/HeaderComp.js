import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, View } from "react-native";
import { imagePath } from "../constants/imagePath";
import styleFun from "../styles/globalStyle";

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { moderateScale, scale } from "../utils/scaling";

/**
 * HeaderComp component to display the header with a cart icon and animated cart counter.
 *
 * @param {Object} props - Component props.
 * @param {Array} props.cart - Array of cart items.
 * @returns {JSX.Element} The header component with animated cart counter.
 *
 * @example
 * // Usage in a component
 * import HeaderComp from './path/to/HeaderComp';
 *
 * const MyComponent = () => {
 *   const cartItems = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
 * 
 *   return (
 *     <View>
 *       <HeaderComp cart={cartItems} />
 *     </View>
 *   );
 * };
 */
const HeaderComp = ({ cart = [] }) => {
  const { t, i18n } = useTranslation();
  const styles = styleFun(i18n.language == "ar");

  const flipAnim = useSharedValue(0);
  const [isArabic, setIsArabic] = useState(i18n.language === "ar");

  useEffect(() => {
    setIsArabic(i18n.language == "ar");
  }, [i18n.language]);

  const cartCounter = useSharedValue(1);

  const cartCounterStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: cartCounter.value }],
    };
  });

  useEffect(() => {
    // Trigger the scale animation whenever cart value changed
    cartCounter.value = withTiming(1.5, { duration: 200 }, () => {
      cartCounter.value = withTiming(1, { duration: 200 });
    });
  }, [cart.length]);

  const flipToArabic = () => {
    flipAnim.value = withTiming(1, {
      duration: 600,
      easing: Easing.inOut(Easing.ease),
    });
    setIsArabic(true);
  };

  const flipToEnglish = () => {
    flipAnim.value = withTiming(0, {
      duration: 600,
      easing: Easing.inOut(Easing.ease),
    });
    setIsArabic(false);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: `${flipAnim.value * 180}deg` }],
    };
  });

  useEffect(() => {
    // Trigger the flip animation based on the language change
    if (isArabic) {
      flipToArabic();
    } else {
      flipToEnglish();
    }
  }, [isArabic]);

  return (
    <Animated.View style={[styles.headerStyle, animatedStyle]}>
      <View style={{ ...styles.flexHorizontalRow, alignItems: "baseline" }}>
        {isArabic ? (
          <View
            style={{ ...styles.redDotStyle, marginLeft: moderateScale(6) }}
          />
        ) : null}
        <Text
          style={{
            ...styles.headerTextStyle,
            textAlign: "left",
            transform: [{ rotateY: isArabic ? `180deg` : "0deg" }],
          }}
        >
          {t("REDTAG")}
        </Text>
        {!isArabic ? <View style={styles.redDotStyle} /> : null}
      </View>

      <View>
        <Image style={{
          height: moderateScale(24),
          width: moderateScale(24)
        }} source={imagePath.icEmptyBucket} />
        {cart.length ? (
          <Animated.View
            style={[
              {
                ...styles.countStyle,
              },
              cartCounterStyle,
            ]}
          >
            <Text
              style={{
                ...styles.countText,
                transform: [{ rotateY: isArabic ? `180deg` : "0deg" }],
              }}
            >
              {cart.length}
            </Text>
          </Animated.View>
        ) : (
          <View style={styles.countStyle} />
        )}
      </View>
    </Animated.View>
  );
};

export default React.memo(HeaderComp);
