import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import styleFun from "../styles/globalStyle";

/**
 * OfferComp component to display a percentage off message.
 *
 * @param {Object} props - Component props.
 * @param {number} props.percentage - The percentage off to display.
 * @returns {JSX.Element} The offer component.
 *
 * @example
 * // Usage in a component
 * import OfferComp from './path/to/OfferComp';
 *
 * const MyComponent = () => (
 *   <View>
 *     <OfferComp percentage={20} />
 *   </View>
 * );
 */

const OfferComp = ({ percentage }) => {
  const { t, i18n } = useTranslation();
  const styles = styleFun(i18n.language == "ar");
  return (
    <View style={styles.offView}>
      <Text style={styles.priceStyle}>{percentage}%</Text>
      <Text style={styles.priceStyle}>{t("OFF")}</Text>
    </View>
  );
};

export default React.memo(OfferComp);
