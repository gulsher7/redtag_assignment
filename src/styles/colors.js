/**
 * An object containing color definitions for the application.
 *
 * @type {object}
 * @property {string} red - The primary red color.
 * @property {string} redFade - The faded red color.
 * @property {string} black - The black color.
 * @property {string} redOpacity3 - The red color with 30% opacity.
 * @property {string} white - The white color.
 *
 * @example
 * // Usage in a StyleSheet
 * import { colors } from './path/to/colors';
 *
 * const styles = StyleSheet.create({
 *   container: {
 *     backgroundColor: colors.white,
 *   },
 *   text: {
 *     color: colors.red,
 *   },
 * });
 */

export const colors = {
    red:"#E60028",
    redFade :"#FFE6E5",
    black:"#000000",
    redOpacity3:"rgba(230, 0, 40, 0.3)",
    white:"#ffffff",   
}