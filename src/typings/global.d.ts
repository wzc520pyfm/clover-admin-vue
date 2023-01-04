interface Window {
  $loadingBar?: any; // progress bar
  $message?: import("element-plus").ElMessage; // element-plus的ElMessage
}

type ConstantOptions<T> = {
  value: T;
  label: string;
};

/** 通用类型 */
declare namespace Common {
  /**
   * 策略模式
   * [状态, 为true时执行回调函数]
   */
  type StrategyAction = [boolean, () => void];
}
