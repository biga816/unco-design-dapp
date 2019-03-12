// libs
import { format } from 'date-fns'

/**
 *
 *
 * @export
 * @param {number} unixtime
 * @param {string} [dateFormat]
 * @returns {string}
 */
export function unixtimeToDate(unixtime: number, dateFormat?: string): string {
  return format(unixtime * 1000, dateFormat)
}
