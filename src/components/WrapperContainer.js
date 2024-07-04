import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styleFun from "../styles/globalStyle";
import { useTranslation } from "react-i18next";

/**
 * WrapperContainer component to provide a styled container with safe area support.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The children components to be rendered inside the container.
 * @param {Object} [props.containerStyle={}] - Additional styles for the container.
 * @returns {JSX.Element} The wrapper container component.
 *
 * @example
 * // Usage in a component
 * import WrapperContainer from './path/to/WrapperContainer';
 *
 * const MyComponent = () => (
 *   <WrapperContainer containerStyle={{ backgroundColor: 'lightblue' }}>
 *     <Text>Content goes here</Text>
 *   </WrapperContainer>
 * );
 */

const WrapperContainer = ({ children, containerStyle = {} }) => {
  const { i18n } = useTranslation();
  const styles = styleFun(i18n.language);
  return (
    <SafeAreaView
      edges={["top"]}
      style={{ ...styles.container, ...containerStyle }}
    >
      {children}
    </SafeAreaView>
  );
};
export default React.memo(WrapperContainer);
