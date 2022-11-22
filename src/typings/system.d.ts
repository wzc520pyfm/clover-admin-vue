
/** 菜单项配置 */
type GlobalMenuOption = {
  key: string | Symbol;
  label: string;
  routeName: string | Symbol;
  routePath: string;
  children: Array<GlobalMenuOption>;
};
