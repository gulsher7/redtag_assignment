import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, View } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";
import HeaderComp from "../components/HeaderComp";
import LanguageSelector from "../components/LanguageSelector";
import ProductItem from "../components/ProductItem";
import WrapperContainer from "../components/WrapperContainer";
import { PRODUCTS } from "../config/urls";
import { AppContext } from "../context/AppContext";
import { colors } from "../styles/colors";
import styleFun from "../styles/globalStyle";
import { verticalScale } from "../utils/scaling";

/**
 * Home component to display the list of products.
 * It fetches the product data from the server and displays it in a FlatList.
 * The component also handles language change and displays the cart status.
 *
 * @returns {JSX.Element} The Home component.
 *
 */
const Home = () => {
  const [totalProducts, setTotalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cart, addToCart, language } = useContext(AppContext);

  const viewableItems = useSharedValue([]);

  const { i18n } = useTranslation(); // Translation hook for determine which language currenlty used

  // Generate styles based on the selected language direction
  const styles = styleFun(i18n.language === "ar");

  // Fetch products from the server based on the selected language
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setProducts([]);
        setTotalProducts([]);
        const res = await axios.get(PRODUCTS + `?lang=${language}`);
        // console.log("ress+++++", res);
        if (!!res && !!res?.data && !!res?.data?.data) {
          //unique id not exist in the api response so i have added manually
          let addUniqueId = res?.data?.data.products.map((val, i) => {
            const isInCart = cart.some(
              (cartItem) => cartItem.uniquieId == `${val.id}${i}` // check item is already exist in our local storage
            );
            return {
              ...val,
              uniquieId: `${val.id}${i}`, //append index into product id
              isInCart: isInCart, //add boolean value to check item exist in cart or not.
            };
          });
          setProducts(addUniqueId.slice(0, 8)); //show only 8 products in initial loading
          setTotalProducts(addUniqueId);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [language]);

  const addItemInCart = (item, index) => {
    const cloneExistingArray = JSON.parse(JSON.stringify(products));
    cloneExistingArray[index].isInCart = true;
    setProducts(cloneExistingArray);
    addToCart(item);
  };

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <ProductItem
          product={item}
          addToCart={addItemInCart}
          viewableItems={viewableItems}
          index={index}
        />
      );
    },
    [products, cart]
  );

  // Render footer component with a loader
  const listFooterComp = useCallback(() => {
    return (
      <ActivityIndicator
        style={styles.loaderStyle}
        size="large"
        color={colors.red}
      />
    );
  }, [products, loading]);

  // Fetch more products when the user scrolls to the end
  const fetchMoreProducts = useCallback(() => {
    if (products.length >= totalProducts.length) {
      return;
    }
    setLoading(true);
    const nextProducts = totalProducts.slice(
      products.length,
      products.length + 4
    );
    
    // I have intentionally added a delay 1.5 second, so that I can show bottom loader.
    setTimeout(() => { 
      setLoading(false);
      setProducts([...products, ...nextProducts]);
    }, 1500);
  }, [products, totalProducts]);

  return (
    <WrapperContainer>
      <HeaderComp cart={cart} />
      <LanguageSelector isRTL={i18n.language === "ar"} />
      <Animated.FlatList
        numColumns={2}
        data={products}
        extraData={products}
        renderItem={renderItem}
        keyExtractor={(item, index) => String(item.id + index)}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View style={{ marginBottom: verticalScale(8) }} />
        )}
        columnWrapperStyle={styles.homeFlatlistStyle}
        ListFooterComponent={loading && listFooterComp}
        onEndReached={fetchMoreProducts}
        onEndReachedThreshold={0.2}
        alwaysBounceVertical={false}
        onViewableItemsChanged={({ viewableItems: vItems }) => {
          viewableItems.value = vItems;
        }}
      />
    </WrapperContainer>
  );
};

export default Home;
