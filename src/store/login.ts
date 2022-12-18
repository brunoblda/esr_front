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

        sessionStorage.setItem("Logged", "True");
      } else {
        state.logged = false;
        state.count_false_tries++;

        sessionStorage.removeItem("Logged");
      }
    },
    logout(state: any) {
      state.logged = false;

      sessionStorage.clear();
    },
  },
  actions: {
    async authLogin(ctx: any, { user, password }) {
      const res = await fetch("https://8ahe0l.deta.dev/login/", {
        //const res = await fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ usuario: user, senha: password }),
      });
      const response = await res.json();
      ctx.commit("updateLogged", response);
    },
  },
};
