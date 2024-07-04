import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { width } from "../utils/scaling";

import { useTranslation } from "react-i18next";
import { colors } from "../styles/colors";
import styleFun from "../styles/globalStyle";

/**
 * AnimatedTabs component to display a language selection tab bar with animated sliding indicator.
 *
 * @param {Object} props - Component props.
 * @param {Array<{name: string, sortName: string}>} props.data - An array of language data objects.
 * @param {Function} props.onChangeLanguage - Callback function to change the language.
 * @returns {JSX.Element} The animated tabs component.
 *
 * @example
 * // Usage in a component
 * import AnimatedTabs from './path/to/AnimatedTabs';
 *
 * const languageData = [
 *   { name: 'English', sortName: 'en' },
 *   { name: 'عربي', sortName: 'ar' }
 * ];
 *
 * const handleLanguageChange = (language) => {
 *   // Handle language change logic
 * };
 *
 * const MyComponent = () => (
 *   <View>
 *     <AnimatedTabs data={languageData} onChangeLanguage={handleLanguageChange} />
 *   </View>
 * );
 */

const AnimatedTabs = ({ data, onChangeLanguage }) => {
  const { i18n } = useTranslation();
  const [index, setIndex] = useState(0);
  const TAB_BAR_WIDTH = width - data.length;
  const TAB_WIDTH = TAB_BAR_WIDTH / data.length;

  const styles = styleFun(i18n.language === "ar");

  const translateAnimation = useAnimatedStyle(() => ({
    transform: [
      { translateX: withTiming((width / 1.15 / data.length) * index) },
    ],
  }));

  useEffect(() => {
    // change the index whenver user changeed the language
    setIndex(i18n.language === "ar" ? 1 : 0);
  }, [i18n.language]);

  return (
    <View style={[styles.tabBarContainer]}>
      <Animated.View
        style={[
          styles.slidingTabContainer,
          { width: TAB_WIDTH },
          translateAnimation,
        ]}
      >
        <View
          style={{
            ...styles.slidingTab,
            width: width / 3,
          }}
        />
      </Animated.View>
      {data.map((val, i) => (
        <Pressable
          hitSlop={styles.hitSlop}
          onPress={() => onChangeLanguage(val.sortName)}
          key={val?.sortName}
        >
          <Text
            style={{
              ...styles.langaugeStyle,
              color: val.sortName === i18n.language ? "white" : colors.black,
            }}
          >
            {val?.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default React.memo(AnimatedTabs);
