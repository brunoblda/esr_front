export const configUsuariosFabrica = {
  namespaced: true,
  state() {
    return {
      allUsuariosFabrica: [],
      allUsuariosFabricaErro: false,
      allUsuarios: [],
    };
  },
  getters: {
    getAllUsuariosFabrica(state: any) {
      return state.allUsuariosFabrica;
    },
    getAllUsuariosFabricaErro(state: any) {
      return state.allUsuariosFabricaErro;
    },
    getAllUsuarios(state: any) {
      return state.allUsuarios;
    },
  },
  mutations: {
    updateUsuariosFabricaAll(state: any, response: any) {
      if (response[0]["redmine_status_response"] === 200) {
        console.log(response[1]);
        state.allUsuariosFabrica = response[1];
      } else {
        state.allUsuariosFabricaErro = true;
      }
    },
    updateUsuariosAll(state: any, response: any) {
      if (response[0]["redmine_status_response"] === 200) {
        console.log(response[1]);
        state.allUsuarios = response[1];
      }
    },
    responseAddUsuario(state: any, response: any) {
      if (response[0]["redmine_status_response"] === 201) {
        console.log("sucess");
      } else {
        console.log("failed");
      }
    },
    responseDelUsuario(state: any, response: any) {
      if (response[0]["redmine_status_response"] === 200) {
        console.log("sucess");
      } else {
        console.log("failed");
      }
    },
  },
  actions: {
    async getAllUsuariosFabrica(ctx: any) {
      const token_saved = sessionStorage.getItem("token");
      const requestOptions = {
        headers: { token: String(token_saved) },
      };
      const res = await fetch(
        "http://127.0.0.1:8000/configuracoes/usuariosFabrica/",
        requestOptions
      );
      const response = await res.json();
      ctx.commit("updateUsuariosFabricaAll", response);
    },
    async getAllUsuarios(ctx: any) {
      const token_saved = sessionStorage.getItem("token");
      const requestOptions = {
        headers: { token: String(token_saved) },
      };
      const res = await fetch(
        "http://127.0.0.1:8000/configuracoes/allRedmineUsers/",
        requestOptions
      );
      const response = await res.json();

      ctx.commit("updateUsuariosAll", response);
    },
    async addUsuario(ctx: any, [user]) {
      console.log(user[0]);
      console.log(user[1]);
      const token_saved = sessionStorage.getItem("token");
      const requestOptions = {
        method: "POST",
        headers: {
          token: String(token_saved),
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id: user[0], login: user[1] }),
      };

      console.log(JSON.stringify({ id: user[0], login: user[1] }));
      const res = await fetch(
        "http://127.0.0.1:8000/configuracoes/usuariosFabrica/",
        requestOptions
      );
      const response = await res.json();

      ctx.commit("responseAddUsuario", response);
    },
    async delUsuario(ctx: any, [user]) {
      const token_saved = sessionStorage.getItem("token");
      const requestOptions = {
        method: "DELETE",
        headers: { token: String(token_saved) },
      };

      const res = await fetch(
        `http://127.0.0.1:8000/configuracoes/usuariosFabrica/${user[0]}`,
        requestOptions
      );
      const response = await res.json();

      ctx.commit("responseDelUsuario", response);
    },
  },
};
