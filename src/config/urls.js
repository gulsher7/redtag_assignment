/**
 * The base URL for the API endpoints.
 *
 * @type {string}
 */
export const API_BASE_URL = "https://shopifyapptst1.bma.ae";

/**
 * Constructs a full API URL by appending the given endpoint to the base URL.
 *
 * @param {string} endpoint - The endpoint to be appended to the base URL.
 * @returns {string} The full API URL.
 *
 */
export const getApiUrl = (endpoint) => API_BASE_URL + endpoint;

export const PRODUCTS = getApiUrl("/react-native-exercise/");
