import React, { useEffect, useRef, useState } from "react";
import { Dimensions, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import styleFun from "../styles/globalStyle";

import { Image } from "expo-image";

const { width } = Dimensions.get("window");

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

/**
 * AnimatedCarousel component to display a carousel of images with animated indicators.
 *
 * @param {Object} props - Component props.
 * @param {Array<string>} props.imageArray - An array of image URLs to display in the carousel.
 * @returns {JSX.Element} The animated carousel component.
 *
 * @example
 * // Usage in a component
 * import AnimatedCarousel from './path/to/AnimatedCarousel';
 *
 * const imageArray = [
 *   'https://example.com/image1.jpg',
 *   'https://example.com/image2.jpg',
 *   'https://example.com/image3.jpg'
 * ];
 *
 * const MyComponent = () => (
 *   <View>
 *     <AnimatedCarousel imageArray={imageArray} />
 *   </View>
 * );
 */
const AnimatedCarousel = ({ imageArray = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });

  const styles = styleFun(true);

  /**
   * Renders a single image item in the carousel.
   *
   * @param {Object} param0 - The item props.
   * @param {string} param0.item - The image URL.
   * @returns {JSX.Element} The image component.
   */
  const renderItem = ({ item }) => {
    return (
      <View style={{ width: width / 2.3 }}>
        <Image
          source={{ uri: item }}
          style={styles.productImageStyle}
          placeholder={{ blurhash }}
          transition={500}
        />
      </View>
    );
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 80,
  };

  useEffect(() => {
    scale.value = withSpring(1.5, {}, () => {
      scale.value = withSpring(1);
    });
  }, [currentIndex]);

  return (
    <View>
      <Animated.FlatList
        data={imageArray}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig}
      />

      <View style={styles.indicatorContainer}>
        {imageArray.map((_, index) => {
          const animatedStyle = useAnimatedStyle(() => {
            return {
              transform: [{ scale: index === currentIndex ? scale.value : 1 }],
            };
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.indicator,
                index === currentIndex ? styles.activeIndicator : null,
                animatedStyle,
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

export default React.memo(AnimatedCarousel);
