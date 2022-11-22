export const configPaginasPercorrer = {
  namespaced: true,
  state() {
    return {
      valorAtual: "",
    };
  },
  getters: {
    getAllUsuariosFabrica(state: any) {
      return state.allUsuariosFabrica;
    },
  },
  mutations: {
    updateValorAtual(state: any, response: any) {
      if (response[0]["redmine_status_response"] === 200) {
        state.valorAtual = response[1][0]["percorre_quantas_paginas"];
      }
      if (
        response[0]["Problema de autenticação, faça o login novamente"] === 401
      ) {
        sessionStorage.clear();
        state.logged = false;
        window.location.reload();
      }
    },
    responseUpdatePaginasAPercorrer(state: any, response: any) {
      if (
        response[0]["redmine_status_response"] === 200 ||
        response[0]["redmine_status_response"] === 201
      ) {
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
    async getPaginasAPercorrer(ctx: any) {
      const token_saved = sessionStorage.getItem("token");
      const requestOptions = {
        headers: {
          token: String(token_saved),
          "Content-type": "application/json",
        },
      };
      const res = await fetch(
        "https://lih9ob.deta.dev/configuracoes/paginasDeDados/perfil/",
        requestOptions
      );
      const response = await res.json();
      ctx.commit("updateValorAtual", response);
    },
    async updatePaginasAPercorrer(ctx: any, paginas: any) {
      const token_saved = sessionStorage.getItem("token");
      const requestOptions = {
        method: "PUT",
        headers: {
          token: String(token_saved),
          "Content-type": "application/json",
        },
        body: JSON.stringify({ quantas_paginas: paginas }),
      };

      const res = await fetch(
        "https://lih9ob.deta.dev//configuracoes/paginasDeDados/perfil/",
        requestOptions
      );
      const response = await res.json();

      ctx.commit("responseUpdatePaginasAPercorrer", response);
    },
  },
};
