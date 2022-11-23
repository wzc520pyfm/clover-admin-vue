/** 菜单项配置 */
type GlobalMenuOption = {
  key: string | symbol;
  label: string;
  routeName: string | symbol;
  routePath: string;
  children?: Array<GlobalMenuOption>;
};
