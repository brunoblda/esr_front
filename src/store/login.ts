export const login = {
  namespaced: true,
  state() {
    return {
      logged: false,
      count_false_tries: 0,
    };
  },
  getters: {
    getLogged(state: any) {
      return state.logged;
    },
  },
  mutations: {
    updateLogged(state: any, response: any) {
      if (response[0]["redmine_status_response"] === 200) {
        state.logged = true;
        state.count_false_tries = 0;

        sessionStorage.setItem("token", response[1]);
      } else {
        state.logged = false;
        state.count_false_tries++;

        sessionStorage.removeItem("token");
      }
    },
    logout(state: any) {
      state.logged = false;

      sessionStorage.clear();
    },
  },
  actions: {
    async authLogin(ctx: any, { user, password }) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ usuario: user, senha: password }),
      };
      const res = await fetch("http://127.0.0.1:8000/login/", requestOptions);
      const response = await res.json();
      ctx.commit("updateLogged", response);
    },
  },
};
