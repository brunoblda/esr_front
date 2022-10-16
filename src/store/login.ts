export const login = {
  namespaced: true,
  state() {
    return {
      logged: false,
      usuario: "",
      senha: "",
    };
  },
  mutations: {
    updateLogged(state: any, response: any) {
      state.logged = true;
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
