/**
 * Generates a set of styles for a React Native application, adapting to RTL (Right-To-Left) or LTR (Left-To-Right) layouts.
 *
 * @param {boolean} isRTL - A boolean indicating if the layout direction is RTL (true) or LTR (false).
 * @returns {object} A StyleSheet object containing the generated styles.
 *
 * @example
 * // Usage for LTR layout
 * const styles = styleFun(false);
 *
 * @example
 * // Usage for RTL layout
 * const styles = styleFun(true);
 */

import { StyleSheet } from "react-native";
import {
  height,
  moderateScale,
  scale,
  verticalScale,
  width,
} from "../utils/scaling";
import { colors } from "./colors";
import { fontFamily } from "./fontFamily";

const styleFun = (isRTL) => {
  const styles = StyleSheet.create({
    // WrapperContainer style start here
    container: {
      flex: 1,
      padding: moderateScale(16),
      backgroundColor: colors.white,
    },
    // WrapperContainer style end here

    // HeaderComp style start here
    headerTextStyle: {
      letterSpacing: moderateScale(8),
      fontSize: scale(32),
      fontFamily: fontFamily.bold,
    },
    headerStyle: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    redDotStyle: {
      height: moderateScale(5),
      width: moderateScale(5),
      borderRadius: moderateScale(2.5),
      backgroundColor: colors.red,
    },
    countStyle: {
      backgroundColor: colors.red,
      height: moderateScale(18),
      width: moderateScale(18),
      borderRadius: moderateScale(9),
      position: "absolute",
      top: moderateScale(12),
      left: moderateScale(12),
      alignItems: "center",
      justifyContent: "center",
    },
    countText: {
      fontSize: scale(10),
      color: colors.white,
      textAlign: isRTL ? "right" : "left",
      fontWeight: "bold",
    },
    // HeaderComp style end here

    // OfferComp style start here
    offView: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 0.5,
      borderColor: colors.red,
      backgroundColor: colors.redFade,
      borderRadius: moderateScale(4),
      padding: moderateScale(2),
    },
    priceStyle: {
      fontSize: scale(8),
      color: colors.red,
      fontFamily: fontFamily.bold,
      marginLeft: moderateScale(2),
      textAlign: isRTL ? "right" : "left",
    },
    // OfferComp style end here

    // PriceComp style start here
    priceCompView: {
      flexDirection: isRTL ? "row-reverse" : "row",
      alignItems: "baseline",
    },
    priceView: {
      flexDirection: "row",
      alignItems: "baseline",
    },
    currencyStyle: {
      fontSize: scale(8),
      color: colors.red,
      fontFamily: fontFamily.bold,
      textAlign: isRTL ? "right" : "left",
    },
    comparePriceStyle: {
      fontSize: scale(10),
      color: colors.black,
      textDecorationLine: "line-through",
      marginHorizontal: moderateScale(2),
      fontFamily: fontFamily.medium,
      textAlign: isRTL ? "right" : "left",
    },
    flexHorizontalRow: {
      flexDirection: isRTL ? "row-reverse" : "row",
      alignItems: "center",
    },
    // PriceComp style end here

    // ProductItem style start here
    productItemParentView: {
      backgroundColor: "white",
      borderRadius: 8,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 4,
      width: '48%',
      margin: 2,
    },
    productImageStyle: {
      height: height / 2.6,
      width: "100%",
      borderRadius: moderateScale(8),
      justifyContent: "flex-end",
      alignItems: "flex-end",
    },
    favoriteIconView: {
      position: "absolute",
      alignSelf: isRTL ? "flex-start" : "flex-end",
      padding: moderateScale(16),
    },
    addCartItemView: {
      position: "absolute",
      bottom: -10,
      alignSelf: isRTL ? "flex-start" : "flex-end",
    },
    cardDescription: {
      paddingHorizontal: moderateScale(6),
      paddingVertical: moderateScale(12),
      justifyContent: "space-between",
      flex: 1,
    },
    offerView: {
      borderWidth: 1,
      borderStyle: "dotted",
      borderColor: colors.red,
      backgroundColor: colors.redFade,
      padding: moderateScale(4),
      borderRadius: moderateScale(2),
      flexDirection: isRTL ? "row-reverse" : "row",
      alignItems: "center",
    },
    offerMessageStyle: {
      fontSize: scale(9),
      fontFamily: fontFamily.bold,
      textAlign: isRTL ? "right" : "left",
      marginHorizontal: moderateScale(2),
    },
    productTitleStyle: {
      fontSize: scale(12),
      textAlign: isRTL ? "right" : "left",
      fontFamily: fontFamily.medium,
    },
    priceOfferStyle: {
      flexDirection: isRTL ? "row-reverse" : "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: verticalScale(8),
      marginBottom: verticalScale(4),
    },
    bestSellerView: {
      backgroundColor: colors.white,
      padding: moderateScale(4),
      borderRadius: moderateScale(2),
      alignSelf: isRTL ? "flex-start" : "flex-end",
      marginBottom: verticalScale(6),
    },
    bestSellerStyle: {
      color: colors.red,
      fontSize: scale(12),
      fontFamily: fontFamily.bold,
      textAlign: isRTL ? "right" : "left",
    },
    addToCartStyle: {
      backgroundColor: "white",
      borderRadius: moderateScale(8),
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 2.84,
      elevation: 4,
      width: width / 2.3,
      width: moderateScale(40),
      height: moderateScale(40),
      borderRadius: moderateScale(20),
      right: 4,
      left: isRTL ? 4 : null,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: isRTL ? "flex-start" : "flex-end",
    },
    // ProductItem style end here

    // Home style start here
    loaderStyle: {
      paddingVertical: verticalScale(16),
    },
    homeFlatlistStyle: {
      justifyContent: "space-between",
      flexDirection: isRTL ? "row-reverse" : "row",
    },

    // LanguageSelector style start here
    slidingTabContainer: {
      ...StyleSheet.absoluteFillObject,
      alignItems: "center",
      justifyContent: "center",
    },
    tabBarContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      paddingVertical: verticalScale(18),
    },
    slidingTab: {
      height: moderateScale(42),
      borderRadius: 100,
      backgroundColor: colors.black,
    },
    langaugeStyle: {
      fontFamily: fontFamily.bold,
      fontSize: scale(16),
    },
    // LanguageSelector style end here

    indicatorContainer: {
      position: "absolute",
      bottom: 10,
      flexDirection: "row",
      alignSelf: "center",
    },
    indicator: {
      width: moderateScale(8),
      height: moderateScale(8),
      borderRadius: moderateScale(4),
      backgroundColor: colors.redOpacity3,
      margin: moderateScale(4),
    },
    activeIndicator: {
      backgroundColor: colors.red,
    },
    laoderView: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    checkImageStyle: {
      width: moderateScale(20),
      height: moderateScale(20),
      // borderRadius: moderateScale(10),
      resizeMode: "contain",
    },
    hitSlop: {
      top: 10,
      left: 20,
      bottom: 10,
      right: 20,
    },
  });
  return styles;
};

export default styleFun;
