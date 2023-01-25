import SvgIcon from "@/components/custom/SvgIcon.vue";

interface MenuIconProps {
  iconName: string | undefined;
}

export function LayoutIcon(props: MenuIconProps) {
  let vnode: JSX.Element;
  let { iconName } = props;
  iconName = iconName ?? "ep-eleme";
  if (isLocalIcon(iconName)) {
    vnode = <SvgIcon local-icon={handleLocalIconName(iconName)}></SvgIcon>;
  } else {
    vnode = <SvgIcon icon={iconName}></SvgIcon>;
  }
  return vnode;
}
LayoutIcon.props = ["iconName"];

// 处理本地icon名
function handleLocalIconName(iconName: string) {
  return iconName.split(/^local-/)[1];
}

// 判断是否是本地icon名
function isLocalIcon(iconName: string) {
  return iconName.startsWith("local-");
}
