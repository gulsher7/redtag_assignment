import React from "react";
import { Text, View } from "react-native";
import styleFun from "../styles/globalStyle";
import { scale } from "../utils/scaling";
import { useTranslation } from "react-i18next";

/**
 * PriceComp component to display the price, currency, and optionally a compare price.
 *
 * @param {Object} props - Component props.
 * @param {string} [props.price=""] - The price to display.
 * @param {string} [props.currency="SAR"] - The currency of the price.
 * @param {string|null} [props.comparePrice=null] - The compare price to display (optional).
 * @returns {JSX.Element} The price component.
 *
 * @example
 * // Usage in a component
 * import PriceComp from './path/to/PriceComp';
 *
 * const MyComponent = () => (
 *   <View>
 *     <PriceComp price="100.00" currency="USD" comparePrice="150.00" />
 *   </View>
 * );
 */

const PriceComp = ({ price = "", currency = "SAR", comparePrice = null }) => {
  const { i18n } = useTranslation();
  const styles = styleFun(i18n.language == "ar");
  return (
    <View style={styles.priceCompView}>
      <View style={styles.priceView}>
        <Text style={styles.currencyStyle}>{currency}</Text>
        <Text style={{ ...styles.priceStyle, fontSize: scale(12) }}>
          {Number(price).toFixed(2)}
        </Text>
      </View>

      {!!comparePrice ? (
        <Text style={styles.comparePriceStyle}>{comparePrice}</Text>
      ) : null}
    </View>
  );
};

export default React.memo(PriceComp);
