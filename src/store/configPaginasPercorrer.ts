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
      const res = await fetch(
        "https://p4e7et.deta.dev/configuracoes/paginasDeDados/perfil/",
        //"http://127.0.0.1:8000/configuracoes/paginasDeDados/perfil/",
        {
          method: "GET",
          credentials: "include",
          mode: "cors",
          headers: { "Content-type": "application/json" },
        }
      );
      const response = await res.json();
      ctx.commit("updateValorAtual", response);
    },
    async updatePaginasAPercorrer(ctx: any, paginas: any) {
      const res = await fetch(
        "https://p4e7et.deta.dev/configuracoes/paginasDeDados/perfil/",
        //"http://127.0.0.1:8000/configuracoes/paginasDeDados/perfil/",
        {
          method: "PUT",
          credentials: "include",
          mode: "cors",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ quantas_paginas: paginas }),
        }
      );
      const response = await res.json();

      ctx.commit("responseUpdatePaginasAPercorrer", response);
    },
  },
};
