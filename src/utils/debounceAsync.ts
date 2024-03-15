import { debounce } from 'lodash';

/**
 * Refer link: https://github.com/lodash/lodash/issues/4700
 * Throttles an async function in a way that can be awaited.
 * By default throttle doesn't return a promise for async functions unless it's invoking them immediately. See CUR-4769 for details.
 * @param func async function to throttle calls for.
 * @param wait same function as lodash.throttle's wait parameter.
 *             Call this function at most this often.
 * @returns a promise which will be resolved/ rejected only if the function is executed, with the result of the underlying call.
 */
export function debounceAsync<F extends (...args: any[]) => Promise<any>>(
  func: F,
  wait?: number,
) {
  const debounced = debounce((resolve, reject, args: Parameters<F>) => {
    func(...args)
      .then(resolve)
      .catch(reject);
  }, wait);
  return (...args: Parameters<F>): ReturnType<F> =>
    new Promise((resolve, reject) => {
      debounced(resolve, reject, args);
    }) as ReturnType<F>;
}
