/**
 * Wait for a specified duration
 *
 * @param {number} duration - The number of miliseconds to wait
 * @returns {Promise<number>} A promise that resolves after duration
 */
function wait(duration) {
  return new Promise(resolve => {
    setTimeout(() => resolve(duration), duration);
  });
}

export default wait;
