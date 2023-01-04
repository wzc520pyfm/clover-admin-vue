/**
 * 策略模式
 * @param actions 符合条件时执行的操作
 */
export function exeStrategyActions(actions: Common.StrategyAction[]) {
  actions.some((item) => {
    const [flag, action] = item;
    if (flag) {
      action();
    }
    return flag;
  });
}
