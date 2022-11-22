import { login } from "./login";

export const configUsuariosFabrica = {
  namespaced: true,
  state() {
    return {
      allUsuariosFabrica: [],
      allUsuarios: [],
    };
  },
  getters: {
    getAllUsuariosFabrica(state: any) {
      return state.allUsuariosFabrica;
    },
    getAllUsuarios(state: any) {
      return state.allUsuarios;
    },
  },
  mutations: {
    updateUsuariosFabricaAll(state: any, response: any) {
      if (response[0]["redmine_status_response"] === 200) {
        state.allUsuariosFabrica = response[1];
      }
      if (
        response[0]["Problema de autenticação, faça o login novamente"] === 401
      ) {
        sessionStorage.clear();
        state.logged = false;
        window.location.reload();
      }
    },
    updateUsuariosAll(state: any, response: any) {
      if (response[0]["redmine_status_response"] === 200) {
        state.allUsuarios = response[1];
      }
      if (
        response[0]["Problema de autenticação, faça o login novamente"] === 401
      ) {
        sessionStorage.clear();
        state.logged = false;
        window.location.reload();
      }
    },
    responseAddUsuario(state: any, response: any) {
      if (response[0]["redmine_status_response"] === 201) {
        //pass
      }
      if (
        response[0]["Problema de autenticação, faça o login novamente"] === 401
      ) {
        sessionStorage.clear();
        state.logged = false;
        window.location.reload();
      }
    },
    responseDelUsuario(state: any, response: any) {
      if (response[0]["redmine_status_response"] === 200) {
        //pass
      }
      if (
        response[0]["Problema de autenticação, faça o login novamente"] === 401
      ) {
        sessionStorage.clear();
        state.logged = false;
        window.location.reload();
      }
    },
  },
  actions: {
    async getAllUsuariosFabrica(ctx: any) {
      const token_saved = sessionStorage.getItem("token");
      const requestOptions = {
        headers: {
          token: String(token_saved),
          "Content-type": "application/json",
        },
      };
      const res = await fetch(
        "https://lih9ob.deta.dev/configuracoes/usuariosFabrica/",
        requestOptions
      );
      const response = await res.json();
      ctx.commit("updateUsuariosFabricaAll", response);
    },
    async getAllUsuarios(ctx: any) {
      const token_saved = sessionStorage.getItem("token");
      const requestOptions = {
        headers: {
          token: String(token_saved),
          "Content-type": "application/json",
        },
      };
      const res = await fetch(
        "https://lih9ob.deta.dev/configuracoes/allRedmineUsers/",
        requestOptions
      );
      const response = await res.json();

      ctx.commit("updateUsuariosAll", response);
    },
    async addUsuario(ctx: any, [user]) {
      const token_saved = sessionStorage.getItem("token");
      const requestOptions = {
        method: "POST",
        headers: {
          token: String(token_saved),
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id: user[0], login: user[1] }),
      };

      const res = await fetch(
        "https://lih9ob.deta.dev/configuracoes/usuariosFabrica/",
        requestOptions
      );
      const response = await res.json();

      ctx.commit("responseAddUsuario", response);
    },
    async delUsuario(ctx: any, [user]) {
      const token_saved = sessionStorage.getItem("token");
      const requestOptions = {
        method: "DELETE",
        headers: {
          token: String(token_saved),
          "Content-type": "application/json",
        },
      };

      const res = await fetch(
        `https://lih9ob.deta.dev/configuracoes/usuariosFabrica/${user[0]}`,
        requestOptions
      );
      const response = await res.json();

      ctx.commit("responseDelUsuario", response);
    },
  },
};
