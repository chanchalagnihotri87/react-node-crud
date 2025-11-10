import { postAsJsonAsync } from "../utils/fetch";
const AuthService = {
  login: (data) => {
    return postAsJsonAsync("/auth/login", data);
  },
};

export default AuthService;
