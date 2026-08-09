type DebouncedFunction<T extends (...args: any[]) => any> = {
  (...args: Parameters<T>): void;
  cancel: () => void;
};

/**
 * 防抖函数（进阶版）
 * @param fn - 原始函数
 * @param delay - 等待时间
 * @param immediate - 是否立即执行（true: 立即执行，等待期内后续触发无效；false: 等待结束后执行）
 */
export function debounceAdvanced<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
  immediate: boolean = false,
): DebouncedFunction<T> {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let result: ReturnType<T>; // 用于保存立即执行时的返回值

  const debounced = function (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ) {
    const context = this;

    // 如果已有定时器，清除并重置
    if (timer) {
      clearTimeout(timer);
    }

    // 立即执行逻辑：如果 immediate 为 true 且 timer 不存在（即首次触发或刚执行完）
    const callNow = immediate && !timer;

    // 设置新的定时器
    timer = setTimeout(() => {
      timer = null; // 重置标记，允许下次立即执行
      // 如果不是立即执行模式，在延迟结束后执行
      if (!immediate) {
        result = fn.apply(context, args);
      }
    }, delay);

    // 如果是立即执行模式，且满足首次触发条件，立即执行
    if (callNow) {
      result = fn.apply(context, args);
    }

    return result;
  };

  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return debounced;
}
