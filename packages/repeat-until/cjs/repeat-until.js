
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

/**
 * Repeatedly call a function until a promise resolves
 *
 * It's like setInterval that halts on promise resolution.
 *
 * @param {Function} fn - Function to call repeatedly
 * @param {number} interval - Interval between function calls
 * @param {Promise<any>} promise - Promise to watch for
 * @returns {Promise<any>} The promise passed
 */
function repeatUntil(fn, interval, promise) {
  let i = 0;
  const intervalId = setInterval(() => {
    fn(i);
    i += 1;
  }, interval);
  promise.then(() => clearInterval(intervalId));
  return promise;
}

const _default = repeatUntil;
exports.default = _default;
module.exports = exports.default;
