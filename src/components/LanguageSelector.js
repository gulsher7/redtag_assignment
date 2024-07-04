import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { AppContext } from "../context/AppContext";
import { saveLanguage } from "../utils/storage";
import AnimatedTabs from "./AnimatedTabs";

/**
 * An array containing data for available languages.
 *
 * @type {Array<{name: string, sortName: string}>}
 */
const LanguageData = [
  {
    name: "English",
    sortName: "en",
  },
  {
    name: "عربي",
    sortName: "ar",
  },
];

/**
 * LanguageSelector component for switching application languages.
 *
 * @component
 *
 * @example
 * // Usage in a component
 * import LanguageSelector from './path/to/LanguageSelector';
 *
 * const MyComponent = () => (
 *   <View>
 *     <LanguageSelector />
 *   </View>
 * );
 */
const LanguageSelector = () => {
  const { setLanguage } = useContext(AppContext);
  const { i18n } = useTranslation();

  /**
   * Changes the application language.
   *
   * @param {string} lng - The language code to switch to.
   */
  const changeLanguage = (lng) => {
    if (i18n.language === lng) {
      return;
    }
    i18n.changeLanguage(lng);
    saveLanguage("language", lng).then(() => {
      setLanguage(lng);
    });
  };
  return (
    <AnimatedTabs
      data={LanguageData}
      onChangeLanguage={(val) => changeLanguage(val)}
    />
  );
};

export default React.memo(LanguageSelector);
