import React, { createContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, View } from "react-native";
import { colors } from "../styles/colors";
import styleFun from "../styles/globalStyle";
import { getCartItems, getSaveLanguage, saveCartItem } from "../utils/storage";

/**
 * Context to provide application-wide state and actions.
 * @typedef {Object} AppContext
 * @property {Array} cart - Array of items in the cart.
 * @property {Function} addToCart - Function to add an item to the cart.
 * @property {string} language - Current language setting.
 * @property {Function} setLanguage - Function to change the language setting.
 */

/**
 * The React context object for the app state.
 */
export const AppContext = createContext();

/**
 * AppProvider component to manage and provide global state to its children.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The child components that will have access to the context.
 * @returns {JSX.Element} The provider component with global state.
 *
 */

export const AppProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [cart, setCart] = useState([]);
  const [language, setLanguage] = useState(i18n.language);
  const [loading, setLoading] = useState(true); // Add loading state

  const styles = styleFun(i18n.language);

  useEffect(() => {
    const loadSettings = async () => {
      const storedCart = await getCartItems("cart");
      const storedLanguage = await getSaveLanguage("language");

      if (!!storedLanguage) {
        setLanguage(storedLanguage);
        i18n.changeLanguage(storedLanguage);
      }
      if (!!storedCart) {
        setCart(storedCart);
      }
      setLoading(false);
    };
    loadSettings();
  }, []);

  const addToCart = (item) => {
    let newCart = [...JSON.parse(JSON.stringify(cart)), item]; //deep copy of current cart and adding new item into it.
    saveCartItem("cart", newCart)
      .then(() => {
        setCart(newCart);
      })
      .catch((error) => {
        console.log("cart item not saved", error);
      });
  };

  if (loading) {
    // Show a loading indicator while app settings are being loaded
    return (
      <View style={styles.laoderView}>
        <ActivityIndicator size={"large"} color={colors.red} />
      </View>
    );
  }

  return (
    <AppContext.Provider value={{ cart, addToCart, language, setLanguage }}>
      {children}
    </AppContext.Provider>
  );
};
