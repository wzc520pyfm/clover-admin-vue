import { useRouteStore } from "@/stores";
import { getToken, getUserInfo, setUserInfo } from "@/utils/auth";

interface AuthState {
  userInfo: Auth.UserInfo;
  token: string;
}

export const useAuthStore = defineStore("auth-store", {
  state: (): AuthState => ({
    userInfo: getUserInfo(),
    token: getToken(),
  }),
  getters: {
    isLogin(state) {
      return Boolean(state.token);
    },
  },
  actions: {
    /** 登录 */
    async login(userName: string, password: string) {},
    /** 设置用户权限 */
    setUserAuthRole(role: Auth.RoleType) {
      const { resetRouteStore, initAuthRoute } = useRouteStore();

      const userInfo = {
        ...this.userInfo,
        userRole: role,
      };
      setUserInfo(userInfo);
      this.userInfo = getUserInfo();
      resetRouteStore();
      initAuthRoute();
    },
  },
});
