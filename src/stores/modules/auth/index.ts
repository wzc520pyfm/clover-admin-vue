import { useRouteStore, useTabStore } from "@/stores";
import { getToken, getUserInfo, setUserInfo } from "@/utils/auth";
import { router as globalRouter } from "@/router";

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
      const { initTabStore } = useTabStore();

      const userInfo = {
        ...this.userInfo,
        userRole: role,
      };
      setUserInfo(userInfo);
      this.userInfo = getUserInfo();
      resetRouteStore();
      initAuthRoute();
      initTabStore(unref(globalRouter.currentRoute));
    },
  },
});
