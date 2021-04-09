const toString = Object.prototype.toString


/**
 * @description: 判断值是否未某个类型
 */
 export function is(val: unknown, type: string) {
    return toString.call(val) === `[object ${type}]`;
}

/**
 * @description:  是否为字符串
 */
 export function isString(val: unknown): val is string {
    return is(val, 'String');
  }