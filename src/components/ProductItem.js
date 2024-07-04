import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, Text, View } from "react-native";

//image path
import { imagePath } from "../constants/imagePath";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

//helper functions
import { calculatePercentageOff } from "../utils/helperFunctions";

//Custom Components
import styleFun from "../styles/globalStyle";
import AnimatedCarousel from "./AnimatedCarousel";
import OfferComp from "./OfferComp";
import PriceComp from "./PriceComp";


/**
 * ProductItem component to display a product item with animated effects and various details.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.product - The product object containing details and images.
 * @param {Function} props.addToCart - Function to add the product to the cart.
 * @param {Object} props.viewableItems - The viewable items state from FlatList.
 * @param {number} props.index - The index of the product in the list.
 * @returns {JSX.Element} The product item component.
 *
 * @example
 * // Usage in a component
 * import ProductItem from './path/to/ProductItem';
 *
 * const product = {
 *   id: 1,
 *   title: 'Product Title',
 *   images: { image1: 'https://example.com/image1.jpg' },
 *   price_min: 100,
 *   currency: 'SAR',
 *   compare_at_price_min: 150,
 *   offer_message: 'Special offer!',
 *   isInCart: false,
 * };
 *
 * const addToCart = (product, index) => {
 *   // Add to cart logic
 * };
 *
 * const viewableItems = { value: [{ isViewable: true, item: { id: 1 } }] };
 *
 * const MyComponent = () => (
 *   <View>
 *     <ProductItem
 *       product={product}
 *       addToCart={addToCart}
 *       viewableItems={viewableItems}
 *       index={0}
 *     />
 *   </View>
 * );
 */

const ProductItem = ({ product, addToCart, viewableItems, index }) => {
  const { t, i18n } = useTranslation();
  const styles = styleFun(i18n.language == "ar");
  const scale = useSharedValue(1);

  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter((viewableItem) => viewableItem.isViewable)
        .find((viewableItem) => viewableItem.item.id === product.id)
    );
    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0.6),
        },
      ],
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handleAddToCart = () => {
    // Trigger the scale animation
    scale.value = withSpring(0.1, {}, () => {
      scale.value = withSpring(1);
    });
    setTimeout(() => {
      addToCart(product, index);
    }, 300);
  };

  return (
    <Animated.View style={[styles.productItemParentView, rStyle]}>
      <View>
        <AnimatedCarousel imageArray={Object.values(product.images)} />

        <Pressable style={styles.favoriteIconView}>
          <Image
            style={{ resizeMode: "contain" }}
            source={imagePath.icFavorite}

          />
        </Pressable>

        <View style={styles.addCartItemView}>
          <View style={styles.bestSellerView}>
            <Text style={styles.bestSellerStyle}>{t("BEST_SELLER")}</Text>
          </View>

          <Pressable
            // onPress={() => addToCart(product, index)}
            onPress={handleAddToCart}
            disabled={!!product?.isInCart}
          >
            <Animated.View style={[styles.addToCartStyle, animatedStyle]}>
              <Image
                style={styles.checkImageStyle}
                source={
                  !product?.isInCart ? imagePath.icAddCart : imagePath.icCheck
                }
              />
            </Animated.View>
          </Pressable>
        </View>
      </View>

      <View style={styles.cardDescription}>
        <Text style={styles.productTitleStyle}>{product.title}</Text>

        <View>
          <View style={styles.priceOfferStyle}>
            <PriceComp
              price={product?.price_min}
              currency={product?.currency}
              comparePrice={
                !!product?.compare_at_price_min
                  ? product?.compare_at_price_min
                  : null
              }
            />
            {!!product?.compare_at_price_min &&
            product?.compare_at_price_min > 0 ? (
              <OfferComp
                percentage={calculatePercentageOff(
                  product?.price_min,
                  product?.compare_at_price_min
                )}
              />
            ) : null}
          </View>

          {product["offer-message"] ? (
            <View style={styles.offerView}>
              <Image source={imagePath.icOfferTag} />
              <Text style={styles.offerMessageStyle}>
                {product["offer-message"]}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </Animated.View>
  );
};

export default React.memo(ProductItem);
