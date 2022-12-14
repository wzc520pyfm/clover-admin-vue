import { getToken, getUserInfo } from "@/utils/auth";

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
  },
});
