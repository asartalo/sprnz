/**
 * Wait for a specified duration
 *
 * @param {number} duration - The number of miliseconds to wait
 * @returns {Promise<number>} A promise that resolves after duration
 */
function wait(duration, defaultValue = null) {
  return new Promise(resolve => {
    setTimeout(() => resolve(defaultValue || duration), duration);
  });
}

export default wait;
