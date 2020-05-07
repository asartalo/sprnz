/**
 * Wait for a specified duration
 *
 * When defaultValue is falsy, wait resolves to the number of miliseconds
 * waited. Otherwise, it will resolve to defaultValue
 *
 * @param {number} duration - The number of miliseconds to wait
 * @param {any} defaultValue - A value that will be resolved to
 * @returns {Promise<number|any>} A promise that resolves after duration
 */
function wait(duration, defaultValue = null) {
  return new Promise(resolve => {
    setTimeout(() => resolve(defaultValue || duration), duration);
  });
}

export default wait;
