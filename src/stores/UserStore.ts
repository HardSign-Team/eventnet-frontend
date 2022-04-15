interface PropsUserStore {
  accessToken: string;
  expiredAt: string;
  refreshToken: string;
  userName: string;
  email: string;
  userRoles: string[];
}

const userStore: PropsUserStore = {
  accessToken: "",
  expiredAt: "",
  refreshToken: "",
  userName: "",
  email: "",
  userRoles: [],
};

export { userStore };
