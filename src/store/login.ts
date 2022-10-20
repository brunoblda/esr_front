export const login = {
  namespaced: true,
  state() {
    return {
      logged: false,
      usuario: "",
      senha: "",
    };
  },
  getters: {
    getLogged(state: any) {
      return state.logged;
    },
    getUsuario(state: any) {
      return state.usuario;
    },
    getSenha(state: any) {
      return state.senha;
    },
  },
  mutations: {
    updateLogged(state: any, { response, user, password, getUsuario }) {
      if (response["redmine_status_response"] === 200) {
        state.logged = true;
        state.usuario = user;
        state.senha = password;

        sessionStorage.setItem("usuario", `${state.usuario}`);
        sessionStorage.setItem("senha", `${state.senha}`);
      } else {
        state.logged = false;
        state.usuario = "";
        state.senha = "";

        sessionStorage.removeItem("usuario");
        sessionStorage.removeItem("senha");
      }
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
      ctx.commit("updateLogged", { response, user, password });
    },
  },
};
