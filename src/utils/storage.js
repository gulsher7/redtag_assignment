import AsyncStorage from "@react-native-async-storage/async-storage";


/**
 * Stores a key-value pair in AsyncStorage.
 *
 * @param {string} key - The key under which to store the value.
 * @param {string} value - The value to store.
 * @returns {Promise<string | null>} A promise that resolves with the retrieved value (or null if not found).
 */

export const saveCartItem = (key, value) => {
  let data = JSON.stringify(value);
  return AsyncStorage.setItem(key, data);
};

/**
 * Retrieves a stored value from AsyncStorage based on the provided key.
 *
 * @param {string} key - The key of the value to retrieve.
 * @returns {Promise<string | null>} A promise that resolves with the retrieved value (or null if not found).
 */
export const getCartItems = (key) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key)
      .then((res) => {
        resolve(JSON.parse(res));
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Stores a key-value pair in AsyncStorage.
 *
 * @param {string} key - The key under which to store the value.
 * @param {string} value - The value to store.
 * @returns {Promise<string | null>} A promise that resolves with the retrieved value (or null if not found).
 */

export const saveLanguage = (key, value) => {
  return AsyncStorage.setItem(key, value);
};

/**
 * Retrieves a stored value from AsyncStorage based on the provided key.
 *
 * @param {string} key - The key of the value to retrieve.
 * @returns {Promise<string | null>} A promise that resolves with the retrieved value (or null if not found).
 */
export const getSaveLanguage = (key) => {
  return AsyncStorage.getItem(key);
};
